# Online Store - React Developer Test Task

## Project Description
This is a Next.js application built as a test task for a React Developer position. It implements an online store with product listing, reviews, cart functionality, and order submission. The application is responsive, optimized for mobile and tablet devices, and includes several UX improvements.

## Implemented Features
- **Responsive Design**: Fully responsive layout using CSS Grid and media queries, adapting to mobile and tablet screens.
- **Reviews Section**: Fetches and displays reviews from the provided API, sanitizing HTML content to prevent XSS attacks using DOMPurify.
- **Product Listing**: Displays products with infinite scroll, fetching additional pages via AJAX as the user scrolls down.
- **Cart Functionality**:
  - "Buy" button transforms into quantity controls (+/- buttons and input field) with a default quantity of 1.
  - Users can manually input any quantity in the input field.
  - Cart state persists across page reloads using localStorage.
- **Phone Input**: Includes a phone number input with a mask (+7 (999) 999-99-99) using react-input-mask.
- **Order Submission**:
  - Validates phone number completeness before submission.
  - Highlights phone input in red if invalid.
  - Sends order data to the API and displays a success popup styled to match the site.
- **UX Improvements**:
  - Loading spinner during product fetching.
  - Truncation of long product titles with ellipsis to prevent layout issues.
  - Error handling for API requests.
  - Smooth infinite scroll with intersection observer.
- **Performance**:
  - Uses Next.js SSR for initial page load.
  - Optimizes image loading with Next.js Image component.
- **Code Quality**:
  - Modular CSS using CSS modules for scoped styling.
  - TypeScript for type safety.
  - Clean, maintainable code structure.

## Suggestions for Improvement
- Add debouncing for quantity input to prevent rapid state updates.
- Implement caching for API responses using SWR or React Query.
- Add unit tests with Jest and React Testing Library.
- Enhance accessibility (ARIA labels, keyboard navigation).
- Add error boundary components for better error handling.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser to view the application.

## Dependencies
- Next.js
- react-input-mask
- isomorphic-dompurify
- react-intersection-observer
- uuid

## Notes
- The application assumes the API endpoints are accessible and return data in the specified format.
- Ensure the API server (`http://o-complex.com:1337`) is running or replace with a mock API for testing.
- The Figma design was referenced for styling, but some liberties were taken to ensure responsiveness and usability.