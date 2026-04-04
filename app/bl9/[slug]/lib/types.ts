export interface EventMeta {
  eventSlug: string;
  title: string;
  subtitle?: string;
  dateLabel: string;
  hostClub: string;
  course?: string;
  theme?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface EventTheme {
  accent: string;
  accent2: string;
  background: string;
  text: string;
  card: string;
}

export interface EventHero {
  image?: string;
  eyebrow: string;
  tagline?: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface PageLink {
  label: string;
  url: string;
}

export interface PageDocument {
  label: string;
  file: string;
}

export interface PageContact {
  name: string;
  email: string;
  phone: string;
}

export type PageLayout = 'text' | 'bullets' | 'documents' | 'contact';

export interface EventPage {
  id: string;
  title: string;
  layout: PageLayout;
  body?: string[];
  links?: PageLink[];
  documents?: PageDocument[];
  contact?: PageContact;
}

export interface EventContent {
  meta: EventMeta;
  theme: EventTheme;
  hero: EventHero;
  quickFacts: QuickFact[];
  pages: EventPage[];
  decorations?: string;
}
