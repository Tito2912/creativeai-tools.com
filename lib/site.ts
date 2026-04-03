export const SITE = {
  baseUrl: 'https://creativeai-tools.com',
  domain: 'creativeai-tools.com',
  brandName: 'CreativeAI Tools',
  companyName: 'E-Com Shop',
  hostName: 'Netlify',
  contactEmail: 'contact.ecomshopfrance@gmail.com',
  // Update this if you want to keep analytics continuity after the migration.
  ga4Id: 'G-10QR76T6SC',
  supportedLangs: ['en', 'fr', 'es', 'de'] as const,
} as const;

export type Lang = (typeof SITE.supportedLangs)[number];

export type UiCopy = {
  skipToContent: string;
  home: string;
  blog: string;
  tools: string;
  legal: string;
  privacy: string;
  language: string;
  manageCookies: string;
  tryFree: string;
  trademarkDisclosure: string;
  footerMeta: string;
  primaryNavLabel: string;
};

export const UI_TRANSLATIONS: Record<Lang, UiCopy> = {
  en: {
    skipToContent: 'Skip to content',
    home: 'Home',
    blog: 'Blog',
    tools: 'Tools',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
    language: 'Language',
    manageCookies: 'Manage cookies',
    tryFree: 'Try InVideo free',
    trademarkDisclosure:
      'Trademarks belong to their respective owners. This site provides editorial content and may use sponsored affiliate links.',
    footerMeta: `Built by ${SITE.companyName} • Hosted on ${SITE.hostName}`,
    primaryNavLabel: 'Main navigation',
  },
  fr: {
    skipToContent: 'Aller au contenu',
    home: 'Accueil',
    blog: 'Blog',
    tools: 'Outils',
    legal: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    language: 'Langue',
    manageCookies: 'Gérer les cookies',
    tryFree: 'Essayer InVideo gratuitement',
    trademarkDisclosure:
      'Les marques appartiennent à leurs propriétaires. Ce site propose du contenu éditorial et peut utiliser des liens d’affiliation sponsorisés.',
    footerMeta: `Dév. ${SITE.companyName} • Hébergement ${SITE.hostName}`,
    primaryNavLabel: 'Navigation principale',
  },
  es: {
    skipToContent: 'Saltar al contenido',
    home: 'Inicio',
    blog: 'Blog',
    tools: 'Herramientas',
    legal: 'Aviso legal',
    privacy: 'Política de privacidad',
    language: 'Idioma',
    manageCookies: 'Gestionar cookies',
    tryFree: 'Probar InVideo gratis',
    trademarkDisclosure:
      'Las marcas pertenecen a sus respectivos propietarios. Este sitio ofrece contenido editorial y puede usar enlaces de afiliación patrocinados.',
    footerMeta: `Creado por ${SITE.companyName} • Alojado en ${SITE.hostName}`,
    primaryNavLabel: 'Navegación principal',
  },
  de: {
    skipToContent: 'Zum Inhalt springen',
    home: 'Start',
    blog: 'Blog',
    tools: 'Tools',
    legal: 'Impressum',
    privacy: 'Datenschutzerklärung',
    language: 'Sprache',
    manageCookies: 'Cookies verwalten',
    tryFree: 'InVideo kostenlos testen',
    trademarkDisclosure:
      'Marken sind Eigentum ihrer jeweiligen Inhaber. Diese Seite bietet redaktionelle Inhalte und kann gesponserte Affiliate-Links enthalten.',
    footerMeta: `Built by ${SITE.companyName} • Hosted on ${SITE.hostName}`,
    primaryNavLabel: 'Hauptnavigation',
  },
};

export function normalizeLang(lang: unknown): Lang {
  const normalized = String(lang ?? '').toLowerCase();
  return (SITE.supportedLangs as readonly string[]).includes(normalized) ? (normalized as Lang) : 'en';
}

function normalizePathname(pathname: string): string {
  let path = pathname || '/';
  if (path !== '/') path = path.replace(/\/+$/, '');
  return path.replace(/\.html$/, '');
}

export function getLangFromPathname(pathname: string): Lang {
  const path = normalizePathname(pathname);
  if (path === '/fr' || path.startsWith('/fr/')) return 'fr';
  if (path === '/es' || path.startsWith('/es/')) return 'es';
  if (path === '/de' || path.startsWith('/de/')) return 'de';
  if (path === '/en' || path.startsWith('/en/')) return 'en'; // legacy
  return 'en';
}

export function prefixPath(lang: Lang): string {
  return lang === 'en' ? '' : `/${lang}`;
}

export type TranslationKey =
  | 'home'
  | 'blog_index'
  | 'tools_index'
  | 'invideo_review'
  | 'invideo_update_2025'
  | 'akool_review'
  | 'blog_cat_reviews'
  | 'blog_cat_tutorials'
  | 'blog_cat_strategies'
  | 'blog_cat_case_studies'
  | 'blog_tag_invideo'
  | 'blog_tag_ai_video'
  | 'blog_tag_review'
  | 'blog_tag_content_creation'
  | 'legal_notice'
  | 'privacy_policy';

export const ROUTE_BY_KEY: Record<TranslationKey, Record<Lang, string>> = {
  home: {
    en: '/',
    fr: '/fr/',
    es: '/es/',
    de: '/de/',
  },
  blog_index: {
    en: '/blog/',
    fr: '/fr/blog/',
    es: '/es/blog/',
    de: '/de/blog/',
  },
  tools_index: {
    en: '/tools/',
    fr: '/fr/tools/',
    es: '/es/tools/',
    de: '/de/tools/',
  },
  invideo_review: {
    en: '/blog/invideo-ai-review/',
    fr: '/fr/blog/avis-invideo-ai/',
    es: '/es/blog/invideo-ai-review/',
    de: '/de/blog/invideo-ai-review/',
  },
  invideo_update_2025: {
    en: '/blog/invideo-ai-update-2025/',
    fr: '/fr/blog/mise-a-jour-invideo-2025/',
    es: '/es/blog/invideo-ai-update-2025/',
    de: '/de/blog/invideo-ai-update-2025/',
  },
  akool_review: {
    en: '/blog-akool/',
    fr: '/fr/blog-akool/',
    es: '/es/blog-akool/',
    de: '/de/blog-akool/',
  },
  blog_cat_reviews: {
    en: '/blog/category/reviews/',
    fr: '/fr/blog/category/avis/',
    es: '/es/blog/category/reviews/',
    de: '/de/blog/category/reviews/',
  },
  blog_cat_tutorials: {
    en: '/blog/category/tutorials/',
    fr: '/fr/blog/category/tutoriels/',
    es: '/es/blog/category/tutorials/',
    de: '/de/blog/category/tutorials/',
  },
  blog_cat_strategies: {
    en: '/blog/category/strategies/',
    fr: '/fr/blog/category/strategies/',
    es: '/es/blog/category/strategies/',
    de: '/de/blog/category/strategies/',
  },
  blog_cat_case_studies: {
    en: '/blog/category/case-studies/',
    fr: '/fr/blog/category/etudes-cas/',
    es: '/es/blog/category/case-studies/',
    de: '/de/blog/category/case-studies/',
  },
  blog_tag_invideo: {
    en: '/blog/tag/invideo/',
    fr: '/fr/blog/tag/invideo/',
    es: '/es/blog/tag/invideo/',
    de: '/de/blog/tag/invideo/',
  },
  blog_tag_ai_video: {
    en: '/blog/tag/ai-video/',
    fr: '/fr/blog/tag/video-ia/',
    es: '/es/blog/tag/ai-video/',
    de: '/de/blog/tag/ai-video/',
  },
  blog_tag_review: {
    en: '/blog/tag/review/',
    fr: '/fr/blog/tag/avis/',
    es: '/es/blog/tag/review/',
    de: '/de/blog/tag/review/',
  },
  blog_tag_content_creation: {
    en: '/blog/tag/content-creation/',
    fr: '/fr/blog/tag/creation-contenu/',
    es: '/es/blog/tag/content-creation/',
    de: '/de/blog/tag/content-creation/',
  },
  legal_notice: {
    en: '/legal-notice/',
    fr: '/fr/mentions-legales/',
    es: '/es/legal-notice/',
    de: '/de/legal-notice/',
  },
  privacy_policy: {
    en: '/privacy-policy/',
    fr: '/fr/politique-de-confidentialite/',
    es: '/es/privacy-policy/',
    de: '/de/privacy-policy/',
  },
};

const KEY_BY_ROUTE = new Map<string, TranslationKey>();
for (const key of Object.keys(ROUTE_BY_KEY) as TranslationKey[]) {
  for (const route of Object.values(ROUTE_BY_KEY[key])) {
    KEY_BY_ROUTE.set(normalizePathname(route), key);
  }
}

function translationKeyFromPath(pathname: string): TranslationKey | null {
  return KEY_BY_ROUTE.get(normalizePathname(pathname)) ?? null;
}

export function homePath(lang: Lang): string {
  return ROUTE_BY_KEY.home[lang];
}

export function blogIndexPath(lang: Lang): string {
  return ROUTE_BY_KEY.blog_index[lang];
}

export function toolsIndexPath(lang: Lang): string {
  return ROUTE_BY_KEY.tools_index[lang];
}

export function invideoReviewPath(lang: Lang): string {
  return ROUTE_BY_KEY.invideo_review[lang];
}

export function akoolReviewPath(lang: Lang): string {
  return ROUTE_BY_KEY.akool_review[lang];
}

export function legalNoticePath(lang: Lang): string {
  return ROUTE_BY_KEY.legal_notice[lang];
}

export function privacyPath(lang: Lang): string {
  return ROUTE_BY_KEY.privacy_policy[lang];
}

export function localizedUrl(pathname: string, lang: Lang): string {
  const target = normalizeLang(lang);
  const key = translationKeyFromPath(pathname);
  if (key) return ROUTE_BY_KEY[key][target];

  function withTrailingSlash(path: string): string {
    if (path === '/') return '/';
    return path.endsWith('/') ? path : `${path}/`;
  }

  const path = normalizePathname(pathname);
  const withoutPrefix =
    path === '/fr' || path.startsWith('/fr/')
      ? path.replace(/^\/fr\b/, '') || '/'
      : path === '/es' || path.startsWith('/es/')
        ? path.replace(/^\/es\b/, '') || '/'
        : path === '/de' || path.startsWith('/de/')
          ? path.replace(/^\/de\b/, '') || '/'
          : path === '/en' || path.startsWith('/en/')
            ? path.replace(/^\/en\b/, '') || '/'
            : path;

  if (withoutPrefix === '/' || withoutPrefix === '') return homePath(target);
  const cleaned = withoutPrefix.startsWith('/') ? withoutPrefix : `/${withoutPrefix}`;
  return withTrailingSlash(`${prefixPath(target)}${cleaned}`);
}
