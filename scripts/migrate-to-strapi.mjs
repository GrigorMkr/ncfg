/**
 * Migration Script: JSON to Strapi
 * 
 * Migrates content from static JSON files to Strapi CMS:
 * - Tags (extracted from news)
 * - News Articles
 * - Service Categories
 * - Services
 * - People (Team members and Experts)
 * 
 * Usage:
 *   npm run migrate           # Run all migrations
 *   npm run migrate:tags      # Only migrate tags
 *   npm run migrate:news      # Only migrate news
 *   npm run migrate:categories # Only migrate service categories
 *   npm run migrate:services  # Only migrate services
 *   npm run migrate:people    # Only migrate people
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

// Configuration
const CONFIG = {
  strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
  strapiToken: process.env.STRAPI_API_TOKEN,
  paths: {
    news: path.join(__dirname, '..', process.env.NEWS_JSON_PATH || 'web/public/content/news/ncfg_news.json'),
    services: path.join(__dirname, '..', process.env.SERVICES_JSON_PATH || 'web/public/content/ncfg_services.json'),
    people: path.join(__dirname, '..', process.env.PEOPLE_JSON_PATH || 'web/public/content/ncfg_finzdorov_people.json'),
    newsImages: path.join(__dirname, '..', process.env.NEWS_IMAGES_PATH || 'web/public/content/news/anonsImages'),
  },
};

// Helper: Make API request to Strapi
async function strapiRequest(endpoint, method = 'GET', data = null) {
  const url = `${CONFIG.strapiUrl}/api${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (CONFIG.strapiToken) {
    options.headers['Authorization'] = `Bearer ${CONFIG.strapiToken}`;
  }

  if (data) {
    options.body = JSON.stringify({ data });
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Strapi API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

// Helper: Upload file to Strapi
async function uploadFile(filePath) {
  const formData = new FormData();
  const fileBuffer = await fs.readFile(filePath);
  const fileName = path.basename(filePath);
  
  formData.append('files', fileBuffer, { filename: fileName });

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      ...formData.getHeaders(),
    },
  };

  if (CONFIG.strapiToken) {
    options.headers['Authorization'] = `Bearer ${CONFIG.strapiToken}`;
  }

  const response = await fetch(`${CONFIG.strapiUrl}/api/upload`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  return result[0]; // Return the uploaded file info
}

// Helper: Read JSON file
async function readJSON(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

// Helper: Create slug from text (supports Cyrillic)
function slugify(text) {
  // Cyrillic to Latin transliteration map
  const cyrillicMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya'
  };
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .split('')
    .map(char => cyrillicMap[char] || char)
    .join('')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// ====================
// MIGRATION: Tags
// ====================
async function migrateTags() {
  console.log('\n📌 Migrating Tags...');
  
  const newsData = await readJSON(CONFIG.paths.news);
  
  // Extract unique tags from news articles
  const uniqueTags = new Set();
  newsData.forEach(article => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach(tag => uniqueTags.add(tag));
    }
  });

  const tags = Array.from(uniqueTags);
  console.log(`   Found ${tags.length} unique tags`);

  const tagMap = new Map(); // name -> Strapi ID

  for (const tagName of tags) {
    try {
      // Check if tag already exists
      const existing = await strapiRequest(`/tags?filters[name][$eq]=${encodeURIComponent(tagName)}`);
      
      if (existing.data && existing.data.length > 0) {
        console.log(`   ⏭️  Tag "${tagName}" already exists`);
        tagMap.set(tagName, existing.data[0].id);
        continue;
      }

      // Create new tag
      const result = await strapiRequest('/tags', 'POST', {
        name: tagName,
        slug: slugify(tagName),
      });
      
      console.log(`   ✅ Created tag: ${tagName}`);
      tagMap.set(tagName, result.data.id);
    } catch (error) {
      console.error(`   ❌ Error creating tag "${tagName}":`, error.message);
    }
  }

  return tagMap;
}

// ====================
// MIGRATION: News Articles
// ====================
async function migrateNews(tagMap = null) {
  console.log('\n📰 Migrating News Articles...');
  
  const newsData = await readJSON(CONFIG.paths.news);
  console.log(`   Found ${newsData.length} news articles`);

  // Get tag map if not provided
  if (!tagMap) {
    tagMap = new Map();
    const existingTags = await strapiRequest('/tags?pagination[limit]=100');
    existingTags.data?.forEach(tag => {
      tagMap.set(tag.attributes?.name || tag.name, tag.id);
    });
  }

  for (const article of newsData) {
    try {
      // Check if article already exists
      const existing = await strapiRequest(`/news-articles?filters[slug][$eq]=${encodeURIComponent(article.slug)}&populate=anonsImage`);
      
      if (existing.data && existing.data.length > 0) {
        const existingArticle = existing.data[0];
        const hasImage = existingArticle.anonsImage || existingArticle.attributes?.anonsImage;
        
        // If article exists but has no image, try to upload it
        if (!hasImage && article.anonsImage) {
          const imageName = article.anonsImage.replace(/^(news\/anonsImages\/|\/news\/anonsImages\/)/, '');
          const imagePath = path.join(CONFIG.paths.newsImages, imageName);
          try {
            await fs.access(imagePath);
            console.log(`   📷 Uploading missing image for existing article: ${imageName}`);
            const uploadedFile = await uploadFile(imagePath);
            const documentId = existingArticle.documentId || existingArticle.id;
            await strapiRequest(`/news-articles/${documentId}`, 'PUT', {
              anonsImage: uploadedFile.id,
            });
            console.log(`   ✅ Image uploaded and linked to existing article`);
          } catch (imgError) {
            console.log(`   ⚠️  Image upload failed: ${imgError.message}`);
          }
        } else {
          console.log(`   ⏭️  Article "${article.title.substring(0, 40)}..." already exists`);
        }
        continue;
      }

      // Resolve tag IDs
      const tagIds = [];
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tagName => {
          const tagId = tagMap.get(tagName);
          if (tagId) {
            tagIds.push(tagId);
          }
        });
      }

      // Create article
      const articleData = {
        title: article.title,
        slug: article.slug,
        body: article.body,
        publishedDate: article.createdAt,
        tags: tagIds,
        publishedAt: new Date().toISOString(), // Publish immediately
      };

      const result = await strapiRequest('/news-articles', 'POST', articleData);
      console.log(`   ✅ Created article: ${article.title.substring(0, 50)}...`);

      // Handle image upload if exists
      if (article.anonsImage) {
        // Support both old path (news/anonsImages/...) and new path (apps/web/public/content/news/anonsImages/...)
        const imageName = article.anonsImage.replace(/^(news\/anonsImages\/|\/news\/anonsImages\/)/, '');
        const imagePath = path.join(CONFIG.paths.newsImages, imageName);
        try {
          await fs.access(imagePath);
          console.log(`   📷 Uploading image: ${imageName}`);
          const uploadedFile = await uploadFile(imagePath);
          // Strapi 5 uses documentId for updates
          const documentId = result.data.documentId || result.data.id;
          await strapiRequest(`/news-articles/${documentId}`, 'PUT', {
            anonsImage: uploadedFile.id,
          });
          console.log(`   ✅ Image uploaded and linked`);
        } catch (imgError) {
          console.log(`   ⚠️  Image not found or upload failed: ${imagePath} - ${imgError.message}`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Error creating article "${article.title}":`, error.message);
    }
  }
}

// ====================
// MIGRATION: Service Categories
// ====================
async function migrateServiceCategories() {
  console.log('\n📁 Migrating Service Categories...');
  
  const servicesData = await readJSON(CONFIG.paths.services);
  const categories = servicesData.serviceCategories || [];
  console.log(`   Found ${categories.length} service categories`);

  const categoryMap = new Map(); // id -> Strapi ID

  for (const category of categories) {
    try {
      const slug = slugify(category.title);
      
      // Check if category already exists (by title, since slugs may differ)
      const existing = await strapiRequest(`/service-categories?filters[title][$eq]=${encodeURIComponent(category.title)}`);
      
      if (existing.data && existing.data.length > 0) {
        console.log(`   ⏭️  Category "${category.title}" already exists`);
        categoryMap.set(category.id, existing.data[0].id);
        continue;
      }

      const categoryData = {
        title: category.title,
        slug: slug,
        description: category.description,
        order: category.order || 0,
        publishedAt: new Date().toISOString(),
      };

      const result = await strapiRequest('/service-categories', 'POST', categoryData);
      console.log(`   ✅ Created category: ${category.title}`);
      categoryMap.set(category.id, result.data.id);
    } catch (error) {
      console.error(`   ❌ Error creating category "${category.title}":`, error.message);
    }
  }

  return categoryMap;
}

// ====================
// MIGRATION: Services
// ====================
async function migrateServices(categoryMap = null) {
  console.log('\n🛠️  Migrating Services...');
  
  const servicesData = await readJSON(CONFIG.paths.services);
  const categories = servicesData.serviceCategories || [];

  // Get category map if not provided
  if (!categoryMap) {
    categoryMap = new Map();
    const existingCategories = await strapiRequest('/service-categories?pagination[limit]=100');
    existingCategories.data?.forEach(cat => {
      const attrs = cat.attributes || cat;
      if (attrs.slug) {
        // Try to match by slug
        categories.forEach(origCat => {
          if (slugify(origCat.title) === attrs.slug) {
            categoryMap.set(origCat.id, cat.id);
          }
        });
      }
    });
  }

  for (const category of categories) {
    const services = category.services || [];
    console.log(`   Processing ${services.length} services in "${category.title}"`);

    for (const service of services) {
      try {
        const slug = slugify(service.title);
        
        // Check if service already exists (by title, since slugs may differ)
        const existing = await strapiRequest(`/services?filters[title][$eq]=${encodeURIComponent(service.title)}`);
        
        if (existing.data && existing.data.length > 0) {
          console.log(`     ⏭️  Service "${service.title.substring(0, 30)}..." already exists`);
          continue;
        }

        // Transform data to match Strapi schema
        const serviceData = {
          title: service.title,
          slug: slug,
          serviceId: service.id,
          status: service.status || 'draft',
          order: service.order || 0,
          shortDescription: service.shortDescription,
          fullDescription: service.fullDescription,
          recommendedFrequency: service.recommendedFrequency,
          configurationNotes: service.configurationNotes,
          deliveryFormats: service.deliveryFormats || [],
          formats: service.formats || [],
          publishedAt: new Date().toISOString(),
        };

        // Add category relation
        const strapiCategoryId = categoryMap.get(category.id);
        if (strapiCategoryId) {
          serviceData.category = strapiCategoryId;
        }

        // Transform component arrays
        if (service.benefits) {
          serviceData.benefits = service.benefits.map(text => ({ text }));
        }
        if (service.howWeWork) {
          serviceData.howWeWork = service.howWeWork.map(text => ({ text }));
        }
        if (service.topicsExample) {
          serviceData.topicsExample = service.topicsExample.map(text => ({ text }));
        }
        if (service.mechanics) {
          serviceData.mechanics = service.mechanics.map(text => ({ text }));
        }
        if (service.rewards) {
          serviceData.rewards = service.rewards.map(text => ({ text }));
        }
        if (service.otherFormats) {
          serviceData.otherFormats = service.otherFormats.map(text => ({ text }));
        }
        if (service.options) {
          serviceData.options = service.options.map(text => ({ text }));
        }
        if (service.includes) {
          serviceData.includes = service.includes.map(text => ({ text }));
        }

        // Transform facts
        if (service.facts) {
          serviceData.facts = {
            experienceYears: service.facts.experienceYears,
            developedBy: service.facts.developedBy,
            participantsCount: String(service.facts.participantsCount || ''),
            deliveryFormat: service.facts.deliveryFormat,
            dataOutputs: (service.facts.dataOutputs || []).map(text => ({ text })),
          };
        }

        // Transform methodology
        if (service.methodology) {
          serviceData.methodology = service.methodology.map(item => ({
            itemId: item.id,
            title: item.title,
            description: item.description,
          }));
        }

        // Transform examples
        if (service.examples) {
          serviceData.examples = service.examples.map(example => ({
            exampleId: String(example.id || ''),
            title: example.title,
            type: example.type || 'custom',
            link: example.link,
            description: example.description,
            notes: example.notes,
            durationMinutes: example.durationMinutes,
          }));
        }

        // Transform products
        if (service.products) {
          serviceData.products = service.products.map(product => ({
            productId: product.id,
            title: product.title,
            type: product.type || 'other',
            notes: product.notes,
            pricingOptions: (product.pricingOptions || []).map(text => ({ text })),
          }));
        }

        // Transform CTA
        if (service.cta) {
          serviceData.cta = {
            label: service.cta.label,
            type: service.cta.type || 'form',
            url: service.cta.url,
          };
        }

        const result = await strapiRequest('/services', 'POST', serviceData);
        console.log(`     ✅ Created service: ${service.title.substring(0, 40)}...`);
      } catch (error) {
        console.error(`     ❌ Error creating service "${service.title}":`, error.message);
      }
    }
  }
}

// ====================
// MIGRATION: People
// ====================
async function migratePeople() {
  console.log('\n👥 Migrating People...');
  
  const peopleData = await readJSON(CONFIG.paths.people);
  const people = peopleData.people || [];
  console.log(`   Found ${people.length} people`);

  for (const person of people) {
    try {
      // Check if person already exists
      const existing = await strapiRequest(`/people?filters[personId][$eq]=${encodeURIComponent(person.id)}`);
      
      if (existing.data && existing.data.length > 0) {
        console.log(`   ⏭️  Person "${person.fullName}" already exists`);
        continue;
      }

      const personData = {
        fullName: person.fullName,
        personId: person.id,
        isTeam: person.isTeam || false,
        isExpert: person.isExpert || false,
        notes: person.notes,
        order: parseInt(person.id?.replace('person_', '') || '0'),
        publishedAt: new Date().toISOString(),
      };

      // Transform team info
      if (person.team) {
        personData.team = {
          unit: person.team.unit,
          title: person.team.title,
          department: person.team.department,
        };
      }

      // Transform expert profile
      if (person.expertProfile) {
        const ep = person.expertProfile;
        personData.expertProfile = {
          headline: ep.headline,
          roles: ep.roles || [],
          specialization: ep.specialization,
          position: ep.position,
          organization: ep.organization,
          registry: ep.registry,
          experienceYears: ep.experienceYears,
          experienceText: ep.experienceText,
          activities: ep.activities || [],
          education: ep.education || [],
          background: ep.background || [],
          statuses: ep.statuses || [],
          products: ep.products || [],
          books: ep.books || [],
          mediaMentions: ep.mediaMentions || [],
          sourcePages: ep.source?.pages || [],
          sourceUrl: ep.source?.url,
        };

        // Transform metrics
        if (ep.metrics) {
          personData.expertProfile.metrics = {
            courseParticipants: ep.metrics.courseParticipants,
            moneySavedRub: ep.metrics.moneySavedRub,
            returnedTaxesRub: ep.metrics.returnedTaxesRub,
            eventsCount: ep.metrics.eventsCount,
            audienceSize: ep.metrics.audienceSize,
          };
        }
      }

      const result = await strapiRequest('/people', 'POST', personData);
      console.log(`   ✅ Created person: ${person.fullName}`);
    } catch (error) {
      console.error(`   ❌ Error creating person "${person.fullName}":`, error.message);
    }
  }
}

// ====================
// MAIN
// ====================
async function main() {
  console.log('🚀 NCFG Data Migration to Strapi');
  console.log('================================');
  console.log(`   Strapi URL: ${CONFIG.strapiUrl}`);
  console.log(`   Token configured: ${CONFIG.strapiToken ? 'Yes' : 'No'}`);

  // Parse command line arguments
  const args = process.argv.slice(2);
  const onlyArg = args.find(arg => arg.startsWith('--only='));
  const only = onlyArg ? onlyArg.split('=')[1] : null;

  try {
    // Test connection
    console.log('\n🔌 Testing Strapi connection...');
    await fetch(`${CONFIG.strapiUrl}/api`);
    console.log('   ✅ Connected to Strapi');

    let tagMap = null;
    let categoryMap = null;

    if (!only || only === 'tags') {
      tagMap = await migrateTags();
    }

    if (!only || only === 'news') {
      await migrateNews(tagMap);
    }

    if (!only || only === 'categories') {
      categoryMap = await migrateServiceCategories();
    }

    if (!only || only === 'services') {
      await migrateServices(categoryMap);
    }

    if (!only || only === 'people') {
      await migratePeople();
    }

    console.log('\n✨ Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Start Strapi: cd apps/cms && npm run develop');
    console.log('2. Create an admin user at http://localhost:1337/admin');
    console.log('3. Generate an API token: Settings > API Tokens');
    console.log('4. Update scripts/.env with the token');
    console.log('5. Re-run this script to migrate data');

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('\n❌ Cannot connect to Strapi. Please ensure Strapi is running:');
      console.error('   cd apps/cms && npm run develop');
    } else {
      console.error('\n❌ Migration failed:', error.message);
    }
    process.exit(1);
  }
}

main();
