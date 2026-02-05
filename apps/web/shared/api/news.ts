import { fetchAPI, buildQueryString, StrapiResponse, getStrapiMediaUrl } from '../lib/strapi';
import type { StrapiNewsArticle, StrapiTag } from './types/strapi';

export async function getTags(): Promise<StrapiTag[]> {
  const query = buildQueryString({
    sort: 'name:asc',
    pagination: { limit: 100 },
  });

  const response = await fetchAPI<StrapiResponse<StrapiTag[]>>(
    `/tags${query}`,
    { tags: ['tags'] }
  );

  return response.data;
}

interface GetNewsOptions {
  page?: number;
  pageSize?: number;
  tag?: string;
}

export async function getNews(options: GetNewsOptions = {}): Promise<{
  articles: StrapiNewsArticle[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}> {
  const { page = 1, pageSize = 10, tag } = options;

  const filters: Record<string, unknown> = {};
  if (tag) {
    filters['tags'] = {
      slug: { $eq: tag },
    };
  }

  const query = buildQueryString({
    populate: ['anonsImage', 'tags'],
    filters,
    sort: 'publishedDate:desc',
    pagination: { page, pageSize },
  });

  const response = await fetchAPI<StrapiResponse<StrapiNewsArticle[]>>(
    `/news-articles${query}`,
    { tags: ['news'] }
  );

  return {
    articles: response.data,
    pagination: response.meta.pagination || {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: response.data.length,
    },
  };
}

export async function getNewsArticle(slug: string): Promise<StrapiNewsArticle | null> {
  const query = buildQueryString({
    populate: ['anonsImage', 'tags'],
    filters: {
      slug: { $eq: slug },
    },
  });

  const response = await fetchAPI<StrapiResponse<StrapiNewsArticle[]>>(
    `/news-articles${query}`,
    { tags: ['news', `news-${slug}`] }
  );

  return response.data[0] || null;
}

export async function getLatestNews(limit: number = 5): Promise<StrapiNewsArticle[]> {
  const query = buildQueryString({
    populate: ['anonsImage', 'tags'],
    sort: 'publishedDate:desc',
    pagination: { limit },
  });

  const response = await fetchAPI<StrapiResponse<StrapiNewsArticle[]>>(
    `/news-articles${query}`,
    { tags: ['news'] }
  );

  return response.data;
}

export interface LegacyNewsArticle {
  id: string;
  title: string;
  tags: string[];
  slug: string;
  body: string;
  anonsImage: string | null;
  createdAt: string;
}

export function transformToLegacyNews(article: StrapiNewsArticle): LegacyNewsArticle {
  const transformedUrl = getStrapiMediaUrl(article.anonsImage?.url);
  return {
    id: String(article.id),
    title: article.title,
    tags: article.tags?.map(tag => tag.name) || [],
    slug: article.slug,
    body: article.body || '',
    anonsImage: transformedUrl,
    createdAt: article.publishedDate || article.createdAt,
  };
}
