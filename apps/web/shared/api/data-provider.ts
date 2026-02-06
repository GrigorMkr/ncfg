import { getNews, getNewsArticle, getLatestNews, transformToLegacyNews } from './news';
import { getPeople, transformToLegacyPerson, type LegacyPerson } from './people';
import type { ServicesData } from './types/service';

const STRAPI_URL = process.env.STRAPI_URL;
const USE_STRAPI = Boolean(STRAPI_URL && process.env.STRAPI_API_TOKEN);

export interface NewsArticleData {
  id: string;
  title: string;
  tags: string[];
  slug: string;
  body: string;
  anonsImage: string | null;
  createdAt: string;
}

export async function fetchNewsArticles(): Promise<NewsArticleData[]> {
  if (USE_STRAPI) {
    try {
      const { articles } = await getNews({ pageSize: 30 });
      return articles.map(transformToLegacyNews);
    } catch (error) {
      console.warn('Failed to fetch news from Strapi, falling back to static JSON:', error);
    }
  }

  const newsData = await import('@/public/news/ncfg_news.json');
  const articles = newsData.default as NewsArticleData[];
  return articles.map(article => ({
    ...article,
    anonsImage: article.anonsImage 
      ? (article.anonsImage.startsWith('/') || article.anonsImage.startsWith('http') 
          ? article.anonsImage 
          : `/${article.anonsImage}`)
      : null,
  }));
}

export async function fetchNewsArticle(slug: string): Promise<NewsArticleData | null> {
  if (USE_STRAPI) {
    try {
      const article = await getNewsArticle(slug);
      if (article) {
        return transformToLegacyNews(article);
      }
      return null;
    } catch (error) {
      console.warn('Failed to fetch article from Strapi, falling back to static JSON:', error);
    }
  }

  const newsData = await import('@/public/news/ncfg_news.json');
  const articles = newsData.default as NewsArticleData[];
  const article = articles.find(a => a.slug === slug);
  if (!article) return null;
  return {
    ...article,
    anonsImage: article.anonsImage 
      ? (article.anonsImage.startsWith('/') || article.anonsImage.startsWith('http') 
          ? article.anonsImage 
          : `/${article.anonsImage}`)
      : null,
  };
}

export async function fetchLatestNewsArticles(limit: number = 5): Promise<NewsArticleData[]> {
  if (USE_STRAPI) {
    try {
      const articles = await getLatestNews(limit);
      return articles.map(transformToLegacyNews);
    } catch (error) {
      console.warn('Failed to fetch latest news from Strapi, falling back to static JSON:', error);
    }
  }

  const newsData = await import('@/public/news/ncfg_news.json');
  const articles = (newsData.default as NewsArticleData[])
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
  return articles.map(article => ({
    ...article,
    anonsImage: article.anonsImage 
      ? (article.anonsImage.startsWith('/') || article.anonsImage.startsWith('http') 
          ? article.anonsImage 
          : `/${article.anonsImage}`)
      : null,
  }));
}

export async function fetchServicesData(): Promise<ServicesData> {
  const servicesData = await import('@/public/content/ncfg_services.json');
  return servicesData.default as ServicesData;
}

export interface PeopleData {
  people: LegacyPerson[];
  teamPeopleIds: string[];
  expertPeopleIds: string[];
}

export async function fetchPeopleData(): Promise<PeopleData> {
  if (USE_STRAPI) {
    try {
      const people = await getPeople();
      const legacyPeople = people.map(transformToLegacyPerson);
      
      return {
        people: legacyPeople,
        teamPeopleIds: legacyPeople.filter(p => p.isTeam).map(p => p.id),
        expertPeopleIds: legacyPeople.filter(p => p.isExpert).map(p => p.id),
      };
    } catch (error) {
      console.warn('Failed to fetch people from Strapi, falling back to static JSON:', error);
    }
  }

  const peopleData = await import('@/public/content/ncfg_finzdorov_people.json');
  const data = peopleData.default as unknown as {
    people: Array<{
      id: number;
      fullName: string;
      position: string;
      team: { title: string };
      isTeamMember: boolean;
      isExpert: boolean;
    }>;
    indexes: {
      teamPeopleIds: number[];
      expertPeopleIds: number[];
    };
  };

  const people: LegacyPerson[] = data.people.map(p => ({
    id: String(p.id),
    fullName: p.fullName,
    isTeam: p.isTeamMember,
    isExpert: p.isExpert,
    notes: null,
    team: {
      unit: '',
      title: p.position || p.team?.title || '',
      department: null,
    },
    expertProfile: null,
    photoUrl: null,
  }));

  return {
    people,
    teamPeopleIds: data.indexes.teamPeopleIds.map(String),
    expertPeopleIds: data.indexes.expertPeopleIds.map(String),
  };
}

export async function fetchTeamMembers(): Promise<LegacyPerson[]> {
  const data = await fetchPeopleData();
  return data.people.filter(p => p.isTeam);
}

export async function fetchExperts(): Promise<LegacyPerson[]> {
  const data = await fetchPeopleData();
  return data.people.filter(p => p.isExpert);
}

export function isUsingStrapi(): boolean {
  return USE_STRAPI;
}
