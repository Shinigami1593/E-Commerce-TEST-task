# Everyday Store

A responsive e-commerce storefront built with Next.js App Router, React, and TypeScript. Product data is fetched from Fake Store API on the server. Product search and filters run in the browser, while the shopping cart is managed locally with Zustand and persisted in `localStorage`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/products`.

Useful scripts:

```bash
npm run lint
npm run build
npm start
```

## Data Sources and Rendering

- The product listing and individual product pages are Next.js Server Components. They fetch products before rendering the page.
- The API client uses the native `fetch` API and Fake Store API at `https://fakestoreapi.com`.
- Products and categories are fetched from `/products` and `/products/categories`; product details are fetched from `/products/{id}`.
- If a Fake Store API request fails, product and category reads fall back to the bundled JSON fixtures in `src/lib/api/fixtures/`.
- Cart operations do not call an API. Zustand stores cart items in the browser and persists them to `localStorage`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects to the product catalog |
| `/products` | Server-rendered catalog with sorting, client-side filters, and pagination |
| `/products/[id]` | Server-rendered product details |
| `/cart` | Client-managed shopping cart and order total |

## Requirement Checklist

Status is based on the implementation in this repository. **Complete** means the requirement is implemented; **Partial** means related behavior exists but does not match the requirement exactly.

| # | Mandatory requirement | Status | Notes |
| ---: | --- | --- | --- |
| 1 | Fetch the product listing on the server | Complete | `/products` fetches data in a Server Component. |
| 2 | Show product image, title, price, category, and rating | Complete | Displayed in the product grid. |
| 3 | Send `sort=asc` or `sort=desc` to the API | Partial | The sort query is read, but `getProducts` fetches `/products` without the sort parameter and sorts the response locally. |
| 4 | Paginate the product listing | Complete | Products are paginated client-side after the server fetch. |
| 5 | Use a responsive product grid or list | Complete | The grid adjusts across viewport sizes. |
| 6 | Provide dynamic `/products/[id]` pages | Complete | Implemented with the App Router dynamic segment. |
| 7 | Fetch individual product details on the server | Complete | Product detail data is fetched in the Server Component. |
| 8 | Display complete product information | Complete | Includes image, title, category, price, rating, and description. |
| 9 | Filter products by category on the client | Complete | Applied in the product grid after initial data fetch. |
| 10 | Filter products by minimum and maximum price | Complete | Applied in the product grid after initial data fetch. |
| 11 | Search products by name | Complete | Applied in the product grid after initial data fetch. |
| 12 | Fetch categories for filter options | Complete | Categories come from Fake Store API, with a local fixture fallback. |
| 13 | Keep search and filters client-side after server fetch | Complete | Filtering operates on the server-provided product list. |
| 14 | Add products with a selected quantity | Complete | Product detail page provides quantity controls. |
| 15 | View cart products | Complete | `/cart` lists cart items. |
| 16 | Update cart quantities | Complete | Cart quantity controls update Zustand state. |
| 17 | Remove cart products | Complete | Each cart item has a remove action. |
| 18 | Calculate and display the cart total | Complete | Total is calculated from item prices and quantities. |
| 19 | Persist cart data in `localStorage` | Complete | Configured with Zustand persistence. |
| 20 | Use Context, Zustand, or Redux for cart state | Complete | Zustand is used. |
| 21 | Use TypeScript for application code | Complete | App routes, components, API functions, and state are TypeScript. |
| 22 | Use native `fetch`, not Axios | Complete | The shared API client uses native `fetch`. |
| 23 | Provide a reusable fetch wrapper with error handling | Complete | `apiFetch` checks HTTP status and parses JSON responses. |
| 24 | Use Server Components for initial data fetching | Complete | Listing and detail data are fetched in Server Components. |
| 25 | Show user-friendly errors when data cannot load | Partial | Error boundaries and messages exist, but API failures normally fall back to fixtures and are only logged. |
| 26 | Provide loading states and responsive layouts | Complete | Loading UI is provided for product routes; layouts are responsive. |

**Mandatory checklist result: 24 complete, 2 partial, 0 missing (26 total).** The partial items are API-side sorting and visible handling of API failures when fixture fallback succeeds.

## Bonus Features

| Bonus | Status | Notes |
| --- | --- | --- |
| Fake Store API login and cart access restrictions | Not implemented | Authentication is optional in the brief. |
| Query parameters for category, price, and search filters | Partial | Sort and page use query parameters; client-side filters are not reflected in the URL. |
| SEO metadata | Partial | Page metadata is present; JSON-LD structured data and a sitemap are not implemented. |

## Does This Need an Admin Page?

No. The assignment asks for a customer-facing product catalog and client-side cart. It does not ask for product management, order management, user administration, or an admin role. An admin page would add scope without fulfilling a listed requirement. Add one only if the task owner separately requests administrative workflows and access control.

## Main Code Areas

- `src/lib/api/client.ts`: reusable native-fetch API wrapper.
- `src/lib/api/products.ts`: product/category API functions, sorting, and fixture fallback.
- `src/app/products/`: catalog route, server-rendered detail route, loading and error states.
- `src/components/products/`: product cards, filters, grid, actions, and pagination.
- `src/store/cartStore.ts`: Zustand cart state and persistence.
- `src/app/cart/` and `src/components/cart/`: cart page, items, and summary.
