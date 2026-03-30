# Racing Club MERN Project

This project has been converted from static HTML/CSS pages into a MERN stack application:

- `client/` -> React + Vite responsive frontend
- `server/` -> Express + MongoDB REST API
- `server/src/data/seed.js` -> seed script with existing club content

Full deployment steps are documented in:

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [CLOUDINARY_GUIDE.md](./CLOUDINARY_GUIDE.md)

## 1) Install dependency

```bash
npm install
npm install --prefix server

npm install --prefix client
```

## 2) Configure environment variables

Copy and fill the env files:

- `server/.env` from `server/.env.example`
- `client/.env` from `client/.env.example`

Required backend value:

- `MONGO_URI` (or `MONGODB_URI`) (for example `mongodb://127.0.0.1:27017/racing_club`)

## 3) Seed database

```bash
npm run seed
```

## 4) Run in development

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## API routes



## Notes book

- Legacy static files are kept in the root for reference.
- Media is served from `client/public/assets`.
