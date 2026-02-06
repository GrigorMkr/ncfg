import { fetchAPI, buildQueryString, StrapiResponse } from '../lib/strapi';
import type { StrapiService, StrapiServiceCategory, StrapiTextItem } from './types/strapi';

export async function getServiceCategories(): Promise<StrapiServiceCategory[]> {
  const query = buildQueryString({
    populate: {
      services: {
        populate: ['benefits', 'facts', 'facts.dataOutputs', 'howWeWork', 'examples', 'cta'],
        sort: ['order:asc'],
      },
    },
    sort: 'order:asc',
  });

  const response = await fetchAPI<StrapiResponse<StrapiServiceCategory[]>>(
    `/service-categories${query}`,
    { tags: ['services'] }
  );

  return response.data;
}

export async function getServiceCategory(slug: string): Promise<StrapiServiceCategory | null> {
  const query = buildQueryString({
    populate: {
      services: {
        populate: '*',
        sort: ['order:asc'],
      },
    },
    filters: {
      slug: { $eq: slug },
    },
  });

  const response = await fetchAPI<StrapiResponse<StrapiServiceCategory[]>>(
    `/service-categories${query}`,
    { tags: ['services', `service-category-${slug}`] }
  );

  return response.data[0] || null;
}

export async function getServices(): Promise<StrapiService[]> {
  const query = buildQueryString({
    populate: '*',
    sort: 'order:asc',
    pagination: { limit: 100 },
  });

  const response = await fetchAPI<StrapiResponse<StrapiService[]>>(
    `/services${query}`,
    { tags: ['services'] }
  );

  return response.data;
}

export async function getService(slug: string): Promise<StrapiService | null> {
  const query = buildQueryString({
    populate: '*',
    filters: {
      slug: { $eq: slug },
    },
  });

  const response = await fetchAPI<StrapiResponse<StrapiService[]>>(
    `/services${query}`,
    { tags: ['services', `service-${slug}`] }
  );

  return response.data[0] || null;
}

export async function getPublishedServices(): Promise<StrapiService[]> {
  const query = buildQueryString({
    populate: '*',
    filters: {
      status: { $eq: 'published' },
    },
    sort: 'order:asc',
    pagination: { limit: 100 },
  });

  const response = await fetchAPI<StrapiResponse<StrapiService[]>>(
    `/services${query}`,
    { tags: ['services'] }
  );

  return response.data;
}

import type { LegacyService, LegacyServiceCategory, ServiceFacts, ServiceExample, ServiceCTA, LegacyServicesData } from './types/service';

function extractTextItems(items: StrapiTextItem[] | null | undefined): string[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => item.text);
}

export function transformToLegacyService(service: StrapiService): LegacyService {
  const facts: ServiceFacts | undefined = service.facts ? {
    experienceYears: service.facts.experienceYears || 0,
    developedBy: service.facts.developedBy || '',
    participantsCount: parseInt(service.facts.participantsCount || '0') || 0,
    deliveryFormat: service.facts.deliveryFormat || '',
    dataOutputs: extractTextItems(service.facts.dataOutputs),
  } : undefined;

  const examples: ServiceExample[] | undefined = service.examples?.length ? 
    service.examples.map(ex => ({
      id: String(ex.exampleId || ex.id),
      title: ex.title,
      type: ex.type === 'custom' ? undefined : ex.type || undefined,
      link: ex.link || undefined,
      description: ex.description || undefined,
      notes: ex.notes || undefined,
    })) : undefined;

  const cta: ServiceCTA = {
    label: service.cta?.label || '',
    type: service.cta?.type === 'form' || service.cta?.type === 'link' 
      ? service.cta.type 
      : 'form',
    url: service.cta?.url || null,
  };

  return {
    id: service.serviceId || service.slug,
    order: service.order,
    status: service.status,
    title: service.title,
    shortDescription: service.shortDescription || '',
    fullDescription: service.fullDescription || '',
    benefits: extractTextItems(service.benefits),
    facts,
    examples,
    howWeWork: extractTextItems(service.howWeWork),
    cta,
  };
}

export function transformToLegacyCategory(category: StrapiServiceCategory): LegacyServiceCategory {
  return {
    id: category.slug,
    order: category.order,
    title: category.title,
    description: category.description || '',
    services: category.services?.map(transformToLegacyService) || [],
  };
}

export async function getServicesDataLegacy(): Promise<LegacyServicesData> {
  const categories = await getServiceCategories();
  
  return {
    meta: {
      contentType: 'services-catalog',
      organization: 'НЦФГ',
      experienceYears: 25,
      locale: 'ru',
      updatedAt: new Date().toISOString().split('T')[0],
    },
    serviceCategories: categories.map(transformToLegacyCategory),
  };
}
