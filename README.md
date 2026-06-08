# AuthKit — React Frontend

A production-ready authentication UI built with React + Vite, connecting to your NestJS backend.

## Project Structure

```
src/
├── context/
│   └── AuthContext.jsx      # Global auth state (tokens, login/logout)
├── components/
│   ├── AuthPanel.jsx         # Left-side decorative panel
│   ├── ProtectedRoute.jsx    # Route guard
│   └── UI.jsx                # Shared: inputs, buttons, alerts, icons
├── pages/
│   ├── Login.jsx             # /login
│   ├── Register.jsx          # /register
│   └── Dashboard.jsx         # /dashboard (protected)
├── utils/
│   ├── api.js                # fetch wrapper → NestJS /auth endpoints
│   └── helpers.js            # JWT decode, password strength, expiry
├── index.css                 # All styles (CSS variables + component styles)
├── App.jsx                   # BrowserRouter + routes
└── main.jsx                  # Entry point
```

## Quick Start

```bash
npm install
npm run dev
```

App runs at http://localhost:5173  
Requests to `/auth/*` are proxied to `http://localhost:3000` (your NestJS server).

## NestJS CORS Setup

Add this to your `main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

## API Endpoints Used

| Method | Path              | Description              |
|--------|-------------------|--------------------------|
| POST   | /auth/register    | Create account           |
| POST   | /auth/login       | Sign in → returns tokens |
| POST   | /auth/refresh-token | Rotate tokens          |

## Features

- Split-panel auth layout (decorative left + form right)
- Register form with real-time password strength meter
- Login form with Enter-key submit
- Protected `/dashboard` route (redirects to /login if not authenticated)
- JWT payload decoded + displayed in dashboard
- Token expiry progress bar with color coding
- One-click copy for access/refresh tokens
- Token refresh via NestJS endpoint
- Tokens stored in `localStorage`
- Responsive (collapses to single column on mobile)
