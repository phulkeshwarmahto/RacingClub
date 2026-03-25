# Deployment Guide (NIAMT Racing)

This guide is tailored to this repository:

- Frontend: `client/` (React + Vite)
- Backend: `server/` (Express + MongoDB)
- Suggested hosting: Render (API) + Vercel (Frontend)

## 1. Pre-Deployment Checklist

1. Confirm code is pushed to GitHub (`main` branch).
2. Confirm these files exist (already added in this repo):
   - `client/public/robots.txt`
   - `client/public/sitemap.xml`
   - SEO metadata in `client/index.html`
   - Route-level SEO via `react-helmet-async`
3. Confirm local checks pass:
   ```bash
   npm run build --prefix client
   node --check server/src/server.js
   ```

## 2. MongoDB Atlas Setup

1. Create Atlas project and cluster (Mumbai region if serving India users).
2. Create database user with a strong password.
3. Add network access for your backend host (or temporary `0.0.0.0/0`).
4. Get the connection string and use it as:
   - `MONGO_URI`

Example:
```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/niamtracing?retryWrites=true&w=majority
```

## 3. Deploy Backend (Render)

1. Render -> New -> **Web Service**.
2. Connect GitHub repo, then set:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. In Advanced settings, set Health Check Path:
   - `/api/health`
4. Add environment variables in Render:

```env
MONGO_URI=<atlas-connection-string>
JWT_SECRET=<long-random-secret>
NODE_ENV=production
PORT=5000
CLIENT_ORIGINS=https://niamtracing.in,https://www.niamtracing.in,https://<your-vercel-project>.vercel.app
```

Notes:
- `CLIENT_ORIGINS` is comma-separated and must exactly match frontend origins.
- If using Vercel preview URLs, add the specific preview domain too.
- Render expects your app to bind `0.0.0.0` and uses port `10000` by default. This app supports `process.env.PORT`, so it is compatible.

5. Deploy and copy your Render URL (example: `https://niamtracing-api.onrender.com`).
6. Test backend health:
   - `https://<render-domain>/api/health`

## 4. Deploy Frontend (Vercel)

1. Vercel -> Add New Project -> Import GitHub repo.
2. Set **Root Directory** to `client`.
3. Framework is Vite (auto-detected).
4. Add environment variable:

```env
VITE_API_URL=https://niamtracing-api.onrender.com
```

Important:
- Do **not** add `/api` here. The app appends it automatically.

5. Deploy and test:
   - Homepage loads
   - API content loads
   - Contact form submits

## 5. Connect Custom Domain

1. Add `niamtracing.in` and `www.niamtracing.in` in Vercel project Domains.
2. In your DNS provider (e.g., Namecheap), create records exactly as Vercel shows.
3. Wait for DNS propagation.
4. Re-test:
   - `https://niamtracing.in`
   - `https://www.niamtracing.in` (redirect behavior)

Optional API domain:
1. Add CNAME `api` -> Render domain in DNS.
2. Add custom domain in Render (`api.niamtracing.in`) and verify.
3. Update Vercel env:
   - `VITE_API_URL=https://api.niamtracing.in`
4. Redeploy frontend.

## 6. Google Indexing (Search Console)

1. Add property for `niamtracing.in` in Google Search Console.
2. Verify domain via DNS TXT record.
3. Submit sitemap:
   - `https://niamtracing.in/sitemap.xml`
4. Request indexing for key pages:
   - `/`
   - `/achievements`
   - `/departments`
   - `/sponsorship`
   - `/alumni`
   - `/contact`

## 7. Post-Deployment Verification

1. `https://niamtracing.in/robots.txt` returns expected rules.
2. `https://niamtracing.in/sitemap.xml` is accessible.
3. `https://<api-domain>/api/health` returns `{ "ok": true }`.
4. Contact form writes data in MongoDB.
5. SSL lock icon appears on frontend and API domains.

## 8. Environment Reference

### Backend (`server/.env`)

```env
MONGO_URI=
JWT_SECRET=
PORT=5000
NODE_ENV=production
CLIENT_ORIGINS=http://localhost:5173,https://niamtracing.in,https://www.niamtracing.in
```

### Frontend (`client/.env.production`)

```env
VITE_API_URL=https://niamtracing-api.onrender.com
```

### Frontend (`client/.env.development`)

```env
VITE_API_URL=http://localhost:5000
```

## 9. Official Docs Used

- Render Web Services: https://render.com/docs/web-services
- Render Environment Variables: https://render.com/docs/environment-variables
- Render Custom Domains: https://render.com/docs/custom-domains
- Vite on Vercel (SPA rewrites): https://vercel.com/docs/frameworks/frontend/vite
- Vercel Environment Variables: https://vercel.com/docs/environment-variables
- Vercel Custom Domains: https://vercel.com/docs/domains/working-with-domains/add-a-domain
- MongoDB Atlas Connection: https://www.mongodb.com/docs/atlas/connect-to-database-deployment/
- Google sitemap + indexing:
  - https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  - https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
