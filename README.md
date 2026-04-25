# Jet Restaurants

**Jet Restaurants** is a React and TypeScript web application built for the Just Eat Takeaway Early Careers Software Engineering coding assignment.

The application fetches restaurant data from the Just Eat UK restaurant discovery API and displays the first 10 restaurants for a selected UK postcode. The interface focuses on the required restaurant data points from the assignment brief: restaurant name, cuisines, rating as a number, and address.

The project was generated with [Vite](https://vite.dev/) using the React TypeScript template.

## Overview

The goal of this project is to provide a simple, clean, and user-friendly interface for viewing restaurant data returned by the Just Eat API.

Instead of displaying restaurants for only one postcode, the application allows users to select from all 16 postcodes provided in the assignment brief. When a postcode is selected, the application fetches and displays the first 10 restaurants returned for that postcode.

## Summary of Key Features

- Displays the first 10 restaurants returned by the API
- Allows users to select between all 16 postcodes provided in the assignment
- Shows the required restaurant information:
  - Restaurant name
  - Cuisines
  - Rating as a number
  - Address
- Uses reusable restaurant card components
- Uses skeleton card components while API data is loading
- Uses React Query for API request handling, loading state, error state, and query caching by postcode
- Uses Axios for HTTP requests
- Uses Mantine UI components for layout, cards, select fields, ratings, and styling
- Uses TypeScript interfaces to describe API response data
- Uses Cloudinary for remotely stored restaurant card images
- Uses images sourced from Unsplash for visual presentation
- Uses Prettier, ESLint, Husky, and lint-staged to keep code formatting consistent

## Tech Stack

Core technologies used in this project:

- React
- TypeScript
- Vite
- Mantine UI
- React Query
- Axios
- Cloudinary
- Prettier
- ESLint
- Husky
- lint-staged

## API

The application uses the Just Eat UK restaurant discovery API:

```txt
https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}
```

Example request:

```txt
https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF
```

The API only supports UK postcodes.

## Supported Postcodes

The application uses the 16 UK postcodes provided in the assignment brief:

```txt
CT1 2EH
BS1 4DJ
L4 0TH
NE9 7TY
SW1A 1AA
CF11 8AZ
M16 0RA
EH1 1RE
BN1 1AE
CB7 4DL
LS2 7HY
G3 8AG
PL4 0DW
B26 3QJ
DH4 5QZ
BT7 1NN
```

## Installation

### Prerequisites

This project was developed using Node.js 24 and npm.

Install `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Load `nvm` without restarting the shell:

```bash
. "$HOME/.nvm/nvm.sh"
```

Install Node.js:

```bash
nvm install 24
```

Verify the Node.js version:

```bash
node -v
```

Expected version used during development:

```txt
v24.15.0
```

Verify the npm version:

```bash
npm -v
```

Expected version used during development:

```txt
11.12.1
```

## Setup

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate into the project directory:

```bash
cd jet-restaurants
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a local `.env` file from the example file:

```bash
cp .env.example .env
```

The file should contain:

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

## Building the Application

Create a production build:

```bash
npm run build
```

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

The production preview will usually be available at:

```txt
http://localhost:4173/
```

## Architecture and Implementation

The application is structured as a small one-page frontend app.

The main responsibilities are split between reusable components:

- `App` manages the selected postcode and page layout
- `PostcodeSelect` displays the postcode dropdown
- `RestaurantsList` handles API fetching and rendering restaurant cards
- `RestaurantCard` displays individual restaurant information
- `RestaurantCardSkeleton` displays loading placeholders while data is being fetched

React Query is used to manage server state. The selected postcode is included in the query key, which means each postcode has its own query result. This helps avoid unnecessary repeated API calls when switching between postcodes that have already been loaded.

Axios is used as the HTTP client for calling the Just Eat API.

Mantine is used for UI elements such as layout containers, cards, select fields, text, rating display, and skeleton loaders.

Cloudinary is used to store remote image URLs for the restaurant cards. These images are used only for visual presentation and are not part of the API response.

## Error Handling

The application handles basic API loading and error states.

If the API request is loading, skeleton restaurant cards are displayed.

If the request fails, or if no restaurants are returned for a postcode, the application displays an error message instead of the restaurant grid.

React Query is used to expose loading, success, and error states in a clear and maintainable way.

## Code Quality

This project uses Prettier to keep formatting consistent across the codebase.

To format the code manually, run:

```bash
npx prettier . --write
```

ESLint is used for linting, and `eslint-config-prettier` is included to avoid conflicts between ESLint rules and Prettier formatting.

Husky and lint-staged are used to run checks before commits. This helps prevent incorrectly formatted code from being committed.

## Commit Conventions

This project follows the Conventional Commits style for commit messages.

Example:

```bash
git commit -m "feat: add postcode select and restaurant card skeleton"
```

## Assumptions

The following assumptions were made during development:

- Only the first 10 restaurants from the response should be displayed.
- The required rating value should be taken from `restaurant.rating.starRating`.
- The address should be displayed using the first address line, city, and postcode.
- Restaurant images are not included in the API response, so external images were used for visual presentation.
- The API only supports UK postcodes.
- The 16 postcodes provided in the assignment are valid options for the postcode selector.
- Some postcodes may return empty or unexpected responses, so loading and error states are required.

## Improvements

Given more time, I would improve the project by adding:

- Unit and component tests
- A dedicated empty state for postcodes with no restaurant results
- Better responsive behaviour for smaller screens
- Sorting by rating or review count
- Filtering by cuisine
- Pagination or a “show more” option
- Image fallback handling if a remote image fails to load
- Accessibility improvements

## Testing

Automated tests have not been added yet.

Testing is planned as a future improvement. I would add tests for:

- Restaurant card rendering
- Postcode select behaviour
- API loading state
- API error state
- Empty restaurant response handling
- Rendering only the first 10 restaurants

## Assignment Criteria Checklist

- Displays restaurant name
- Displays cuisines
- Displays rating as a number
- Displays address
- Limits displayed restaurants to the first 10 results
- Includes setup, build, and run instructions in the README
- Includes assumptions
- Includes possible improvements
- Project uploaded to GitHub with commit history
