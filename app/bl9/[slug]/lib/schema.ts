import type { EventContent, PageLayout } from './types';

const VALID_LAYOUTS: PageLayout[] = ['text', 'bullets', 'documents', 'contact'];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateContent(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Content must be a JSON object'] };
  }

  const content = data as Record<string, unknown>;

  // Required top-level keys
  for (const key of ['meta', 'theme', 'hero', 'quickFacts', 'pages']) {
    if (!(key in content)) {
      errors.push(`Missing required key: "${key}"`);
    }
  }

  // Optional decorations field
  if ('decorations' in content && typeof content.decorations !== 'string') {
    errors.push('decorations must be a string if provided');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Meta validation
  const meta = content.meta as Record<string, unknown>;
  if (!meta || typeof meta !== 'object') {
    errors.push('meta must be an object');
  } else {
    for (const field of ['eventSlug', 'title', 'dateLabel', 'hostClub']) {
      if (!meta[field] || typeof meta[field] !== 'string') {
        errors.push(`meta.${field} is required and must be a string`);
      }
    }
    // These fields are optional (can be empty strings)
    for (const field of ['contactName', 'contactEmail', 'contactPhone', 'course', 'subtitle']) {
      if (field in meta && typeof meta[field] !== 'string') {
        errors.push(`meta.${field} must be a string if provided`);
      }
    }
    if (
      meta.eventSlug &&
      typeof meta.eventSlug === 'string' &&
      !SLUG_PATTERN.test(meta.eventSlug)
    ) {
      errors.push(
        `meta.eventSlug must be URL-safe lowercase with hyphens (got "${meta.eventSlug}")`,
      );
    }
  }

  // Theme validation
  const theme = content.theme as Record<string, unknown>;
  if (!theme || typeof theme !== 'object') {
    errors.push('theme must be an object');
  } else {
    for (const field of ['accent', 'accent2', 'background', 'text', 'card']) {
      if (!theme[field] || typeof theme[field] !== 'string') {
        errors.push(`theme.${field} is required`);
      }
    }
  }

  // Hero validation
  const hero = content.hero as Record<string, unknown>;
  if (!hero || typeof hero !== 'object') {
    errors.push('hero must be an object');
  } else {
    if (!hero.eyebrow || typeof hero.eyebrow !== 'string') {
      errors.push('hero.eyebrow is required');
    }
  }

  // QuickFacts validation
  const quickFacts = content.quickFacts;
  if (!Array.isArray(quickFacts)) {
    errors.push('quickFacts must be an array');
  } else {
    quickFacts.forEach((fact, i) => {
      if (!fact || typeof fact !== 'object' || !fact.label || !fact.value) {
        errors.push(`quickFacts[${i}] must have label and value`);
      }
    });
  }

  // Pages validation
  const pages = content.pages;
  if (!Array.isArray(pages)) {
    errors.push('pages must be an array');
  } else {
    if (pages.length < 3) {
      errors.push(`Must have at least 3 pages (got ${pages.length})`);
    }

    const ids = new Set<string>();
    pages.forEach((page, i) => {
      if (!page || typeof page !== 'object') {
        errors.push(`pages[${i}] must be an object`);
        return;
      }
      if (!page.id || typeof page.id !== 'string') {
        errors.push(`pages[${i}].id is required`);
      } else if (ids.has(page.id)) {
        errors.push(`Duplicate page id: "${page.id}"`);
      } else {
        ids.add(page.id);
      }
      if (!page.title || typeof page.title !== 'string') {
        errors.push(`pages[${i}].title is required`);
      }
      if (!page.layout || !VALID_LAYOUTS.includes(page.layout)) {
        errors.push(`pages[${i}].layout must be one of: ${VALID_LAYOUTS.join(', ')}`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

export function parseContent(data: unknown): EventContent | { error: string[] } {
  const result = validateContent(data);
  if (!result.valid) {
    return { error: result.errors };
  }
  return data as EventContent;
}
