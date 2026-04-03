import type { Metadata } from 'next';
import type { DocMeta } from '@/lib/content';

export function parseRobots(robots: string | undefined): Metadata['robots'] | undefined {
  if (!robots) return undefined;
  const r = robots.toLowerCase();
  return {
    index: !r.includes('noindex'),
    follow: !r.includes('nofollow'),
  };
}

export function buildAlternates(meta: DocMeta, all: DocMeta[]): Metadata['alternates'] {
  const canonical = meta.canonical ?? meta.routePath;

  if (!meta.translationKey) {
    return { canonical };
  }

  const languages: Record<string, string> = {};
  for (const m of all) {
    if (m.translationKey !== meta.translationKey) continue;
    if (!m.lang) continue;
    languages[m.lang] = m.canonical ?? m.routePath;
  }

  // Helpful for Google when the "default" audience is EN / global.
  if (languages.en) {
    languages['x-default'] = languages.en;
  }

  return {
    canonical,
    languages: Object.keys(languages).length ? languages : undefined,
  };
}

export function getOpenGraphType(meta: DocMeta): 'website' | 'article' {
  return meta.type === 'article' ? 'article' : 'website';
}

export function getOpenGraphImage(meta: DocMeta): string {
  // Safe fallback.
  if (!meta.translationKey) return '/images/creativeai-tools-logo.png';

  if (meta.translationKey === 'home') return '/images/visual-2.png';
  if (meta.translationKey === 'blog_index') return '/images/visual-3.png';

  if (meta.translationKey === 'invideo_review') return '/images/visual-3.png';
  if (meta.translationKey === 'invideo_update_2025') return '/images/visual-3.png';
  if (meta.translationKey === 'akool_review') return '/images/blog/akool/og-akool.jpg';

  return '/images/visual-3.png';
}
