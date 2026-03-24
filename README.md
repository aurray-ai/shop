# Aurray Shop Frontend

Standalone ecommerce demo frontend extracted from the main app for separate hosting.

## Routes
- `/shop` Product List
- `/shop/product/[slug]` Product Item
- `/shop/cart` Cart
- `/shop/checkout` Checkout
- `/auth/login` Demo login (local storage only)
- `/auth/register` Demo registration (local storage only)

## Demo auth behavior
- Auth is frontend-only and persisted in browser local storage.
- Shop routes require login and redirect to `/auth/login` when not authenticated.
- Logout clears only local browser session data.

## Run locally
```bash
cd shop-frontend
npm install
npm run dev
```

Default local URL: `http://localhost:3000`
