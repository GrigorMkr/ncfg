export interface ServiceFact {
  label: string;
  value: string;
}

export interface ServiceFacts {
  experienceYears: number;
  developedBy: string;
  participantsCount: number;
  deliveryFormat: string;
  dataOutputs: string[];
}

export interface ServiceExample {
  id?: string;
  title: string;
  description?: string;
  type?: string;
  link?: string;
  notes?: string;
}

export interface ServiceCta {
  label: string;
  href: string;
}

export interface ServiceCTA {
  label: string;
  type: 'form' | 'link';
  url: string | null;
}

export interface Service {
  id: string;
  order?: number;
  status: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  benefits?: string[];
  facts?: ServiceFact[];
  howWeWork?: string[];
  examples?: ServiceExample[];
  cta?: ServiceCta;
}

export interface LegacyService {
  id: string;
  order?: number;
  status: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  benefits?: string[];
  facts?: ServiceFacts;
  howWeWork?: string[];
  examples?: ServiceExample[];
  cta?: ServiceCTA;
}

export interface ServiceCategory {
  id: string;
  order?: number;
  name?: string;
  title?: string;
  description?: string;
  services: Service[];
}

export interface LegacyServiceCategory {
  id: string;
  order?: number;
  name?: string;
  title?: string;
  description?: string;
  services: LegacyService[];
}

export interface ServicesData {
  serviceCategories: ServiceCategory[];
}

export interface LegacyServicesData {
  meta?: {
    contentType: string;
    organization: string;
    experienceYears: number;
    locale: string;
    updatedAt: string;
  };
  serviceCategories: LegacyServiceCategory[];
}
