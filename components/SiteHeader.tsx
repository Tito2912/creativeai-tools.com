'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageLinks } from '@/components/LanguageLinks';
import { akoolReviewPath, blogIndexPath, getLangFromPathname, homePath, invideoReviewPath, SITE, toolsIndexPath, UI_TRANSLATIONS } from '@/lib/site';
import { useState } from 'react';

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const lang = getLangFromPathname(pathname);
  const t = UI_TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header" role="banner">
      <div className="container">
        <nav aria-label={t.primaryNavLabel} className="nav">
          <Link aria-label={`${SITE.brandName} — ${t.home}`} className="logo-link" href={homePath(lang)}>
            <img alt={SITE.brandName} decoding="async" fetchPriority="high" height={40} src="/images/creativeai-tools-logo.png" width={180} />
          </Link>

          <button
            aria-controls="main-menu"
            aria-expanded={isOpen}
            aria-label={t.primaryNavLabel}
            className="menu-toggle"
            onClick={() => setIsOpen((v) => !v)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>

          <ul aria-expanded={isOpen} className="nav-menu" id="main-menu" role="navigation">
            <li>
              <Link href={invideoReviewPath(lang)} onClick={() => setIsOpen(false)}>
                InVideo
              </Link>
            </li>
            <li>
              <Link href={akoolReviewPath(lang)} onClick={() => setIsOpen(false)}>
                Akool
              </Link>
            </li>
            <li>
              <Link href={blogIndexPath(lang)} onClick={() => setIsOpen(false)}>
                {t.blog}
              </Link>
            </li>
            <li>
              <Link href={toolsIndexPath(lang)} onClick={() => setIsOpen(false)}>
                {t.tools}
              </Link>
            </li>

            <li className="lang-selector">
              <LanguageLinks />
            </li>

            <li>
              <a
                className="btn-primary nav-cta"
                data-affiliate-product="invideo"
                href="https://invideo.sjv.io/3JrYry"
                rel="noopener nofollow sponsored noreferrer"
                target="_blank"
              >
                {t.tryFree}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
