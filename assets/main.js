// main.js - Version conformée RGPD/CWV (Consent Mode v2 unifié, idempotence, a11y)
document.addEventListener('DOMContentLoaded', function () {

  // ---------- Utils : stockage sûr ----------
  const STORAGE_KEYS = {
    accepted: 'cookiesAccepted',
    analytics: 'analyticsConsent',
    version: 'consentVersion'
  };
  const CONSENT_VERSION = '2'; // incrémente si la logique de consentement évolue

  const storage = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch { return null; }
    },
    set(key, val) {
      try { window.localStorage.setItem(key, val); } catch {}
    },
    remove(key) {
      try { window.localStorage.removeItem(key); } catch {}
    }
  };

  function resetStoredConsentIfOutdated() {
    const v = storage.get(STORAGE_KEYS.version);
    if (v !== CONSENT_VERSION) {
      storage.remove(STORAGE_KEYS.accepted);
      storage.remove(STORAGE_KEYS.analytics);
      storage.set(STORAGE_KEYS.version, CONSENT_VERSION);
    }
  }
  resetStoredConsentIfOutdated();

  // ---------- Sélecteurs communs ----------
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('#site-nav');

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAcceptAll = document.getElementById('cookie-accept-all');
  const cookieDecline = document.getElementById('cookie-decline');
  const cookieCustomize = document.getElementById('cookie-customize');
  const cookieSave = document.getElementById('cookie-save');
  const cookiePrefs = document.getElementById('cookie-preferences');
  const consentAnalytics = document.getElementById('consent-analytics');

  const newsletterForm = document.getElementById('newsletter-form');

  // ---------- Menu burger ----------
  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('is-open');

      // Focus premier lien quand le menu s'ouvre
      if (!isExpanded) {
        const firstLink = nav.querySelector('a,button');
        if (firstLink) firstLink.focus();
      }
    });
  }

  // ---------- Accordéons ----------
  document.querySelectorAll('[data-accordion] details').forEach(d => {
    d.addEventListener('toggle', function () {
      this.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    });
  });

  // ---------- Consent Mode v2 : helpers ----------
  function applyConsent(granted) {
    // Met à jour TOUS les signaux Consent Mode v2
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'analytics_storage': granted ? 'granted' : 'denied',
        'ad_storage': granted ? 'granted' : 'denied',
        'ad_user_data': granted ? 'granted' : 'denied',
        'ad_personalization': granted ? 'granted' : 'denied'
      });
    }
  }

  function saveCookiePreferences(analyticsConsent) {
    storage.set(STORAGE_KEYS.accepted, 'true');
    storage.set(STORAGE_KEYS.analytics, analyticsConsent ? 'true' : 'false');
    // Pour simplicité : si Analytics OK, on aligne ads=granted ; sinon denied (même logique que les scripts inline)
    applyConsent(!!analyticsConsent);

    if (cookieBanner) cookieBanner.style.display = 'none';
  }

  // ---------- Lecture des préférences existantes ----------
  if (storage.get(STORAGE_KEYS.accepted) === 'true') {
    if (cookieBanner) cookieBanner.style.display = 'none';
    const analyticsConsent = storage.get(STORAGE_KEYS.analytics) === 'true';
    applyConsent(analyticsConsent);
  }

  // ---------- Bannière cookies : wiring idempotent ----------
  if (!window.__consentWired) {
    window.__consentWired = true;

    if (cookieAcceptAll) {
      cookieAcceptAll.addEventListener('click', () => saveCookiePreferences(true));
    }
    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => saveCookiePreferences(false));
    }
    if (cookieCustomize && cookiePrefs) {
      cookieCustomize.addEventListener('click', () => {
        cookiePrefs.setAttribute('aria-hidden', 'false');
        cookiePrefs.style.display = 'block';
        // Focus premier contrôle pour a11y
        const firstInput = cookiePrefs.querySelector('input,button,select,textarea');
        if (firstInput) firstInput.focus();
        if (cookieBanner) cookieBanner.style.display = 'block';
      });
    }
    if (cookieSave) {
      cookieSave.addEventListener('click', () => {
        const granted = consentAnalytics ? !!consentAnalytics.checked : false;
        saveCookiePreferences(granted);
        if (cookiePrefs) {
          cookiePrefs.setAttribute('aria-hidden', 'true');
          cookiePrefs.style.display = 'none';
        }
      });
    }
  }

  // ---------- Exposition d'une API globale pour ouvrir les préférences ----------
  window.openCookiePrefs = function () {
    if (cookiePrefs && cookieBanner) {
      cookiePrefs.setAttribute('aria-hidden', 'false');
      cookiePrefs.style.display = 'block';
      cookieBanner.style.display = 'block';
      const firstInput = cookiePrefs.querySelector('input,button,select,textarea');
      if (firstInput) firstInput.focus();
    }
  };

  // ---------- Newsletter (simulation côté client) ----------
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const honeypot = this.querySelector('.hp');
      const feedback = document.getElementById('newsletter-feedback');

      if (honeypot && honeypot.value !== '') {
        return; // bot détecté
      }
      if (emailInput && emailInput.value) {
        if (feedback) {
          feedback.textContent = 'Merci pour votre inscription !';
          feedback.classList.add('is-success');
        }
        this.reset();
      }
    });
  }

  // ---------- Smooth scrolling (respecte prefers-reduced-motion) ----------
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // liens vides
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // ---------- Filtrage des articles blog ----------
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        const category = btn.dataset.category;
        document.querySelectorAll('.post-card').forEach(article => {
          article.style.display = (category === 'all' || article.dataset.category === category) ? 'block' : 'none';
        });
      });
    });
  }

});
