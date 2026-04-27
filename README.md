# Jet Restaurants

**Jet Restaurants** is a React and TypeScript web application built for the Just Eat Takeaway Early Careers Software Engineering coding assignment.

The project was generated with [Vite](https://vite.dev/) using the React TypeScript template.

## Overview

The application provides a clean and user-friendly interface for browsing restaurant data from the Just Eat API.

The app displays the first 10 restaurants for a selected postcode. Users can choose from all 16 UK postcodes provided in the assignment brief, rather than viewing results for a single fixed postcode.

## Summary of Key Features

- Displays the first 10 restaurants returned by the API
- Allows users to select between all 16 postcodes provided in the assignment
- Shows the required restaurant information:
  - Restaurant name
  - Cuisines
  - Address
  - Rating
- The app uses:
  - Reusable restaurant card components
  - Skeleton card components while API data is loading
  - React Query for API request handling, loading state, error state, and query caching by postcode
  - Axios for HTTP requests
  - Mantine UI components for layout, cards, select fields, ratings, and styling
  - TypeScript interfaces to describe API response data
  - React Error Boundaries to display a fallback UI if the app crashes
  - Prettier, ESLint, Husky, and lint-staged to keep code formatting consistent

## Tech Stack

Core technologies used in this project:

- React
- TypeScript
- Vite
- Mantine UI
- React Query
- Axios
- React Error Boundaries
- Prettier
- ESLint
- Husky
- lint-staged

## Setup

### 1. Clone the repository

```bash
git clone git@github.com:VictoriaL-y/jet-restaurants.git
```

### 2. Navigate into the project directory

```bash
cd jet-restaurants
```

### 3. Install Node.js and npm

This project uses **Node.js 24** and **npm**.

Detailed installation instructions are available on the [official Node.js website](https://nodejs.org/en/download).

You can install Node.js using nvm:

```bash
nvm install 24
```

Alternatively, you can use Homebrew:

```bash
brew install node@24
```

### 4. Verify the installed versions

```bash
node -v # Should print "v24.15.0"
npm -v  # Should print "11.12.1"
```

### 5. Install dependencies

```bash
npm install
```

### 6. Set up environment variables

Create a local `.env` file from the example file:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
VITE_API_BASE_URL=https://uk.api.just-eat.io
```

This value is used by the Vite proxy to forward local API requests to the Just Eat API.

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will usually be available at:

```txt
http://localhost:5173/
```

## Building and Previewing

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The preview will usually be available at:

```txt
http://localhost:4173/
```

## Architecture and Implementation

The application is structured as a small one-page frontend app.

The code is split into separate files so that each part has a clear responsibility:

- `App` manages the selected postcode and page layout
- `AppProviders` wraps the application with shared providers, including Mantine, React Query, and Error Boundaries
- `PostcodeSelect` displays the postcode dropdown
- `RestaurantsList` displays the restaurant results and handles loading, error, empty, and success states
- `RestaurantCard` displays individual restaurant information
- `RestaurantCardSkeleton` displays loading placeholders while data is being fetched
- `getRestaurants` makes the API request to the Just Eat API
- `useRestaurants` uses React Query to fetch, cache, and prepare restaurant data for the UI

## Error Handling

The application handles loading, error, empty, and crash states.

Skeleton restaurant cards are displayed while API data is loading. If the API request fails, an error message is shown. If no restaurants are returned for a postcode, the app displays a "No restaurants found for this postcode." message.

The app also uses an Error Boundary to display a fallback message if the application crashes unexpectedly.

## Code Quality

This project uses Prettier, ESLint, TypeScript, Husky, and lint-staged to keep the codebase consistent and maintainable.

Prettier is used for code formatting:

```bash
npm run format
```

To check formatting without making changes, run:

```bash
npm run format:check
```

ESLint is used to check code quality:

```bash
npm run lint
```

To check for TypeScript errors, run:

```bash
npm run typecheck
```

## Commit Conventions

This project follows the Conventional Commits style for commit messages.

Example:

```bash
git commit -m "feat: add postcode select and restaurant card skeleton"
```

## Challenges

### 1. API Proxy

The Just Eat API could not be called directly from the browser because the response was blocked by CORS.

To solve this for the local assignment app, I added a Vite proxy.

```ts
// vite.config.ts

      proxy: {
        "/discovery": {
          target: loadEnv(mode, process.cwd(), "").VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
```

The app sends requests to the local `/discovery/...` path, and Vite forwards those requests to the Just Eat API base URL defined in the `.env` file:

```env
VITE_API_BASE_URL=https://uk.api.just-eat.io
```

In a real production deployment, this would usually be handled by a backend proxy or serverless function, because CORS only affects browser requests.

### 2. Component Refactoring

`RestaurantsList.tsx` was originally responsible for too much logic. It included the API request, React Query setup, and loading and error states.

Before refactoring:

```tsx
// RestaurantsList.tsx

const { data, isSuccess, isLoading, isError, error } =
  useQuery<IRestaurantsResponse>({
    queryKey: ["GET/restaurants", postcode],
    queryFn: async () => {
      const { data } = await axios.get(
        `/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      );
      return data;
    },
  });
```

I refactored this by separating the API call, data-fetching hook, and list rendering into separate files:

- `getRestaurants` handles the API request
- `useRestaurants` handles React Query and prepares the restaurant data for the UI
- `RestaurantsList` handles the list states and renders restaurant cards

After refactoring:

```tsx
// RestaurantsList.tsx

const { data, isSuccess, isLoading, isError, error } = useRestaurants(postcode);
```

This made the component easier to read, maintain, and test.

### 3. App Providers and Error Boundary Testing

Another challenge was testing the Error Boundary behaviour. The app uses several global providers, including Mantine, React Query, and an Error Boundary.

To keep this setup separate from the main application logic, I created an `AppProviders` component.

```tsx
const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallback={
            <Text ta="center" p="xl">
              Something went wrong. Please refresh.
            </Text>
          }
        >
          {children}
        </ErrorBoundary>
      </QueryClientProvider>
    </MantineProvider>
  );
};
```

This component wraps the app with all shared providers in one place.

This also made the Error Boundary easier to test. In the test, a small test component intentionally throws an error, and the test checks that the fallback message is displayed:

```txt
Something went wrong. Please refresh.
```

This confirms that the app shows a user-friendly fallback UI if a child component crashes unexpectedly.

## Improvements

Given more time, I would improve the project by adding:

- Sorting by rating or review count
- Filtering by cuisine
- Search by restaurant name, cuisine
- Results limit selector so users can choose whether to display 10, 20, or 30 restaurants
- Pagination
- A fallback image or placeholder if a restaurant logo URL is missing or fails to load
- Restaurant details page
- Accessibility improvements

## Testing

This project uses **Vitest** and **React Testing Library** for unit and component testing.

The test suite covers:

- The `restaurants.ts` API request logic, including checking that the correct Just Eat API endpoint is called
- The `useRestaurants.ts` hook, including returning only the first 10 restaurants
- Component rendering for `RestaurantCard` and `PostcodeSelect`
- User interaction, such as selecting a different postcode
- Loading, error, empty, and success states in `RestaurantsList`
- Error Boundary behaviour when a child component crashes

Run tests in watch mode:

```bash
npm run test
```

Run tests once:

```bash
npm run test:run
```
