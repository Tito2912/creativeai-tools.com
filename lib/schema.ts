import type { Post } from '@/lib/types';
import { blogIndexPath, homePath, normalizeLang, SITE, toolsIndexPath, UI_TRANSLATIONS } from '@/lib/site';

const BASE_URL = SITE.baseUrl;
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.brandName,
    url: BASE_URL,
    email: SITE.contactEmail,
    logo: {
      '@type': 'ImageObject',
      url: new URL('/images/creativeai-tools-logo.png', BASE_URL).toString(),
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.brandName,
    url: BASE_URL,
    publisher: { '@id': ORG_ID },
  };
}

function normalizePathname(pathname: string): string {
  let path = pathname || '/';
  if (path !== '/') path = path.replace(/\/+$/, '');
  return path.replace(/\.html$/, '');
}

function ensureTrailingSlash(pathname: string): string {
  const path = pathname || '/';
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

function canonicalPathFromPost(post: Post): string {
  const raw = post.canonical ?? `/${post.slug}`;
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return ensureTrailingSlash(withLeading);
}

function stripBrandSuffix(title: string): string {
  const t = String(title ?? '').trim();
  if (!t) return '';
  const suffix = ` | ${SITE.brandName}`;
  return t.endsWith(suffix) ? t.slice(0, -suffix.length).trim() : t;
}

function getPublishedAndModified(post: Post): { published?: string; modified?: string } {
  const published = post.date ?? post.updatedAt ?? undefined;
  const modified = post.updatedAt ?? post.date ?? undefined;
  return { published, modified };
}

export function buildPrimaryEntityJsonLd(post: Post) {
  const url = new URL(canonicalPathFromPost(post), BASE_URL).toString();
  const lang = normalizeLang(post.lang);
  const title = stripBrandSuffix(post.title) || post.title;
  const { published, modified } = getPublishedAndModified(post);

  if (post.type === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: post.description,
      mainEntityOfPage: url,
      datePublished: published,
      dateModified: modified ?? published,
      inLanguage: lang,
      author: [{ '@id': ORG_ID }],
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
    };
  }

  const pageType = post.type === 'blogIndex' ? 'CollectionPage' : 'WebPage';

  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description: post.description,
    url,
    datePublished: published,
    dateModified: modified ?? published,
    inLanguage: lang,
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

type Crumb = { name: string; path: string };

export function buildBreadcrumbJsonLd(post: Post) {
  const lang = normalizeLang(post.lang);
  const ui = UI_TRANSLATIONS[lang];
  const url = new URL(canonicalPathFromPost(post), BASE_URL).toString();

  const home: Crumb = { name: ui.home, path: homePath(lang) };

  // Blog articles should always live under the Blog hub.
  if (post.type === 'article') {
    const crumbs: Crumb[] = [
      home,
      { name: ui.blog, path: blogIndexPath(lang) },
      { name: stripBrandSuffix(post.title) || ui.blog, path: canonicalPathFromPost(post) },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: c.name,
        item: idx === crumbs.length - 1 ? url : new URL(c.path, BASE_URL).toString(),
      })),
    };
  }

  // Home: single crumb.
  const canonical = normalizePathname(canonicalPathFromPost(post));
  const homeCanonical = normalizePathname(home.path);
  if (canonical === homeCanonical) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: home.name,
          item: new URL(home.path, BASE_URL).toString(),
        },
      ],
    };
  }

  const canonicalPath = canonicalPathFromPost(post);
  const title = stripBrandSuffix(post.title) || post.title;
  const crumbs: Crumb[] = [home, { name: title, path: canonicalPath }];

  // Tool pages benefit from a Tools hub crumb: Home > Tools > Tool
  const isToolPage = /^\/tools\/[^/]+\/$/.test(canonicalPath) || /^\/(fr|es|de)\/tools\/[^/]+\/$/.test(canonicalPath);
  if (isToolPage) {
    const toolCrumbs: Crumb[] = [home, { name: ui.tools, path: toolsIndexPath(lang) }, { name: title, path: canonicalPath }];
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: toolCrumbs.map((c, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: c.name,
        item: idx === toolCrumbs.length - 1 ? url : new URL(c.path, BASE_URL).toString(),
      })),
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.name,
      item: idx === crumbs.length - 1 ? url : new URL(c.path, BASE_URL).toString(),
    })),
  };
}
