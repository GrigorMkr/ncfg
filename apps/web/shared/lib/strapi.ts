const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiDataItem<T> {
  id: number;
  documentId: string;
  attributes?: T;
  [key: string]: unknown;
}

interface FetchOptions extends RequestInit {
  revalidate?: number;
  tags?: string[];
}

const isDev = process.env.NODE_ENV === 'development';
const DEFAULT_REVALIDATE = isDev ? 0 : 60;

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = DEFAULT_REVALIDATE, tags, ...fetchOptions } = options;
  
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (STRAPI_TOKEN) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    ...fetchOptions,
    headers,
    ...(isDev 
      ? { cache: 'no-store' as const }
      : { next: { revalidate, tags } }
    ),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Strapi API error (${res.status}): ${errorText}`);
  }

  return res.json();
}

export function getStrapiMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

type PopulateValue = boolean | string | string[] | Record<string, unknown>;

interface QueryParams {
  populate?: PopulateValue;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  locale?: string;
  publicationState?: 'live' | 'preview';
}

export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();
  if (params.populate) {
    if (params.populate === true || params.populate === '*') {
      searchParams.append('populate', '*');
    } else if (Array.isArray(params.populate)) {
      params.populate.forEach((field, index) => {
        searchParams.append(`populate[${index}]`, field);
      });
    } else if (typeof params.populate === 'object') {
      const flattenPopulate = (obj: Record<string, unknown>, prefix = 'populate'): void => {
        Object.entries(obj).forEach(([key, value]) => {
          const newKey = `${prefix}[${key}]`;
          if (typeof value === 'object' && value !== null) {
            flattenPopulate(value as Record<string, unknown>, newKey);
          } else {
            searchParams.append(newKey, String(value));
          }
        });
      };
      flattenPopulate(params.populate as Record<string, unknown>);
    } else {
      searchParams.append('populate', String(params.populate));
    }
  }

  if (params.filters) {
    const flattenFilters = (obj: Record<string, unknown>, prefix = 'filters'): void => {
      Object.entries(obj).forEach(([key, value]) => {
        const newKey = `${prefix}[${key}]`;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          flattenFilters(value as Record<string, unknown>, newKey);
        } else {
          searchParams.append(newKey, String(value));
        }
      });
    };
    flattenFilters(params.filters);
  }
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach((field, index) => {
        searchParams.append(`sort[${index}]`, field);
      });
    } else {
      searchParams.append('sort', params.sort);
    }
  }

  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(`pagination[${key}]`, String(value));
      }
    });
  }
  if (params.fields) {
    params.fields.forEach((field, index) => {
      searchParams.append(`fields[${index}]`, field);
    });
  }

  if (params.locale) {
    searchParams.append('locale', params.locale);
  }
  if (params.publicationState) {
    searchParams.append('publicationState', params.publicationState);
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
