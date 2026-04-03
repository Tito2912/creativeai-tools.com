# creativeai-tools — Pack Landing Akool (Netlify)

**Domaine**: https://creativeai-tools.com

## 1) Déploiement
- Hébergeur: Netlify
- Déposez le contenu du dossier à la racine du site.
- Vérifiez que `netlify.toml` et `/_redirects` sont pris en compte.

## 2) À configurer
- **GA4**: remplacez `GA4_MEASUREMENT_ID` dans `/assets/main.js` (ex: `G-10QR76T6SC`).
- **Newsletter**: déployez l’Apps Script (voir `/apps-script/Code.gs`) et collez l’URL dans `APPS_SCRIPT_URL`.
- **Favicon**: vous pouvez mettre votre `/images/favicon.png`.

## 3) SEO (août 2025)
- Balises `title`, `meta description`, OpenGraph/Twitter : ok
- JSON-LD: `Organization`, `Product`, `FAQPage`, `BreadcrumbList`
- `sitemap.xml` & `robots.txt`: ok

## 4) RGPD & Cookies
- Bannière opt-in. GA4 bloqué sans consentement.
- Lien pour rouvrir les préférences: appelez `openCookiePrefs()` depuis un lien/footer si souhaité.

## 5) Sécurité (CSP)
- CSP whitelist: YouTube, GA4, Google Translate, Apps Script
- HSTS, Referrer-Policy, Permissions-Policy configurés

## 6) Tests rapides
- **Menu burger**: OK desktop & mobile (fermeture auto au clic)
- **FAQ**: accordéon `<details>` natif
- **Newsletter**: testez en POST:

```bash
curl -X POST "$APPS_SCRIPT_URL" \
 -H 'Content-Type: application/json' \
 -d '{"email":"test@example.com","page":"/","consent":true}'
```

## 7) Notes
- Les pages légales sont marquées `notranslate` (meilleure sûreté juridique).
- Tous les liens d’affiliation ouvrent dans un nouvel onglet avec `rel="noopener nofollow sponsored"`.