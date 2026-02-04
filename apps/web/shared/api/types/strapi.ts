export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiTag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiNewsArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  body: string | null;
  anonsImage: StrapiImage | null;
  tags: StrapiTag[];
  publishedDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiServiceCategory {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  services?: StrapiService[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiTextItem {
  id: number;
  text: string;
}

export interface StrapiServiceFacts {
  id: number;
  experienceYears: number | null;
  developedBy: string | null;
  participantsCount: string | null;
  deliveryFormat: string | null;
  dataOutputs: StrapiTextItem[];
}

export interface StrapiMethodologyItem {
  id: number;
  itemId: string | null;
  title: string;
  description: string | null;
}

export interface StrapiServiceExample {
  id: number;
  exampleId: string | null;
  title: string;
  type: 'link' | 'fact' | 'presentation' | 'custom' | null;
  link: string | null;
  description: string | null;
  notes: string | null;
  durationMinutes: string | null;
}

export interface StrapiProductItem {
  id: number;
  productId: string | null;
  title: string;
  type: 'online_school' | 'subscription_club' | 'custom_project' | 'other' | null;
  notes: string | null;
  pricingOptions: StrapiTextItem[];
}

export interface StrapiCallToAction {
  id: number;
  label: string;
  type: 'form' | 'link' | 'email' | 'phone';
  url: string | null;
}

export interface StrapiService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  serviceId: string | null;
  status: 'published' | 'draft';
  order: number;
  shortDescription: string | null;
  fullDescription: string | null;
  benefits: StrapiTextItem[];
  facts: StrapiServiceFacts | null;
  methodology: StrapiMethodologyItem[];
  howWeWork: StrapiTextItem[];
  deliveryFormats: string[] | null;
  topicsExample: StrapiTextItem[];
  recommendedFrequency: string | null;
  configurationNotes: string | null;
  mechanics: StrapiTextItem[];
  rewards: StrapiTextItem[];
  otherFormats: StrapiTextItem[];
  formats: string[] | null;
  options: StrapiTextItem[];
  includes: StrapiTextItem[];
  products: StrapiProductItem[];
  examples: StrapiServiceExample[];
  cta: StrapiCallToAction | null;
  category: StrapiServiceCategory | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiTeamInfo {
  id: number;
  unit: string | null;
  title: string | null;
  department: string | null;
}

export interface StrapiExpertMetrics {
  id: number;
  courseParticipants: string | null;
  moneySavedRub: string | null;
  returnedTaxesRub: string | null;
  eventsCount: string | null;
  audienceSize: string | null;
}

export interface StrapiExpertProfile {
  id: number;
  headline: string | null;
  roles: string[] | null;
  specialization: string | null;
  position: string | null;
  organization: string | null;
  registry: string | null;
  experienceYears: number | null;
  experienceText: string | null;
  metrics: StrapiExpertMetrics | null;
  activities: string[] | null;
  education: string[] | null;
  background: string[] | null;
  statuses: string[] | null;
  products: string[] | null;
  books: string[] | null;
  mediaMentions: string[] | null;
  sourcePages: number[] | null;
  sourceUrl: string | null;
}

export interface StrapiPerson {
  id: number;
  documentId: string;
  fullName: string;
  personId: string | null;
  isTeam: boolean;
  isExpert: boolean;
  notes: string | null;
  photo: StrapiImage | null;
  team: StrapiTeamInfo | null;
  expertProfile: StrapiExpertProfile | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}
