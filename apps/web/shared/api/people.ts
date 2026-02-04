import { fetchAPI, buildQueryString, StrapiResponse, getStrapiMediaUrl } from '../lib/strapi';
import type { StrapiPerson } from './types/strapi';

export async function getPeople(): Promise<StrapiPerson[]> {
  const query = buildQueryString({
    populate: ['photo', 'team', 'expertProfile', 'expertProfile.metrics'],
    sort: 'order:asc',
    pagination: { limit: 100 },
  });

  const response = await fetchAPI<StrapiResponse<StrapiPerson[]>>(
    `/people${query}`,
    { tags: ['people'] }
  );

  return response.data;
}

export async function getPerson(documentId: string): Promise<StrapiPerson | null> {
  const query = buildQueryString({
    populate: ['photo', 'team', 'expertProfile', 'expertProfile.metrics'],
    filters: {
      documentId: { $eq: documentId },
    },
  });

  const response = await fetchAPI<StrapiResponse<StrapiPerson[]>>(
    `/people${query}`,
    { tags: ['people', `person-${documentId}`] }
  );

  return response.data[0] || null;
}

export async function getPersonByPersonId(personId: string): Promise<StrapiPerson | null> {
  const query = buildQueryString({
    populate: ['photo', 'team', 'expertProfile', 'expertProfile.metrics'],
    filters: {
      personId: { $eq: personId },
    },
  });

  const response = await fetchAPI<StrapiResponse<StrapiPerson[]>>(
    `/people${query}`,
    { tags: ['people'] }
  );

  return response.data[0] || null;
}

export async function getTeamMembers(): Promise<StrapiPerson[]> {
  const query = buildQueryString({
    populate: ['photo', 'team', 'expertProfile', 'expertProfile.metrics'],
    filters: {
      isTeam: { $eq: true },
    },
    sort: 'order:asc',
    pagination: { limit: 100 },
  });

  const response = await fetchAPI<StrapiResponse<StrapiPerson[]>>(
    `/people${query}`,
    { tags: ['people', 'team'] }
  );

  return response.data;
}

export async function getExperts(): Promise<StrapiPerson[]> {
  const query = buildQueryString({
    populate: ['photo', 'team', 'expertProfile', 'expertProfile.metrics'],
    filters: {
      isExpert: { $eq: true },
    },
    sort: 'order:asc',
    pagination: { limit: 100 },
  });

  const response = await fetchAPI<StrapiResponse<StrapiPerson[]>>(
    `/people${query}`,
    { tags: ['people', 'experts'] }
  );

  return response.data;
}

export interface LegacyPerson {
  id: string;
  fullName: string;
  isTeam: boolean;
  isExpert: boolean;
  notes: string | null;
  team: {
    unit: string;
    title: string;
    department: string | null;
  } | null;
  expertProfile: {
    headline: string | null;
    roles: string[];
    specialization: string | null;
    organization: string | null;
    registry: string | null;
    experienceYears: number | null;
    experienceText: string | null;
    metrics: {
      courseParticipants: string | null;
      moneySavedRub: string | null;
      returnedTaxesRub: string | null;
      eventsCount: string | null;
      audienceSize: string | null;
    };
    activities: string[];
    education: string[];
    background: string[];
    statuses: string[];
    products: string[];
    books: string[];
    mediaMentions: string[];
  } | null;
  photoUrl: string | null;
}

export function transformToLegacyPerson(person: StrapiPerson): LegacyPerson {
  return {
    id: person.personId || String(person.id),
    fullName: person.fullName,
    isTeam: person.isTeam,
    isExpert: person.isExpert,
    notes: person.notes,
    team: person.team ? {
      unit: person.team.unit || '',
      title: person.team.title || '',
      department: person.team.department,
    } : null,
    expertProfile: person.expertProfile ? {
      headline: person.expertProfile.headline,
      roles: person.expertProfile.roles || [],
      specialization: person.expertProfile.specialization,
      organization: person.expertProfile.organization,
      registry: person.expertProfile.registry,
      experienceYears: person.expertProfile.experienceYears,
      experienceText: person.expertProfile.experienceText,
      metrics: {
        courseParticipants: person.expertProfile.metrics?.courseParticipants || null,
        moneySavedRub: person.expertProfile.metrics?.moneySavedRub || null,
        returnedTaxesRub: person.expertProfile.metrics?.returnedTaxesRub || null,
        eventsCount: person.expertProfile.metrics?.eventsCount || null,
        audienceSize: person.expertProfile.metrics?.audienceSize || null,
      },
      activities: person.expertProfile.activities || [],
      education: person.expertProfile.education || [],
      background: person.expertProfile.background || [],
      statuses: person.expertProfile.statuses || [],
      products: person.expertProfile.products || [],
      books: person.expertProfile.books || [],
      mediaMentions: person.expertProfile.mediaMentions || [],
    } : null,
    photoUrl: getStrapiMediaUrl(person.photo?.url),
  };
}

export async function getPeopleDataLegacy(): Promise<{
  people: LegacyPerson[];
  teamPeopleIds: string[];
  expertPeopleIds: string[];
}> {
  const people = await getPeople();
  const legacyPeople = people.map(transformToLegacyPerson);
  
  return {
    people: legacyPeople,
    teamPeopleIds: legacyPeople.filter(p => p.isTeam).map(p => p.id),
    expertPeopleIds: legacyPeople.filter(p => p.isExpert).map(p => p.id),
  };
}
