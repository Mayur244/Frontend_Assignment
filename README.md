# OpenFoodFacts Explorer

A React application for searching, filtering, and viewing food products using the OpenFoodFacts API.

## Project Overview

OpenFoodFacts Explorer is a web application that allows users to:
- Search for food products by name
- Search for specific products by barcode
- Filter products by category
- Sort products by name or nutrition grade
- View detailed product information including ingredients and nutritional values

## Technical Approach & Solutions

### 1. API Integration

The application integrates with the OpenFoodFacts API using the following endpoints:
- Search products: `https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&json=true`
- Get product by barcode: `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`
- Filter by category: `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0={category}&json=true`

### 2. State Management

I implemented a comprehensive state management solution using React Context API with useReducer:
- Created a centralized `FoodContext` to manage application state
- Used reducer pattern for predictable state updates
- Implemented actions for search, filter, sort, and pagination

### 3. Error Handling & Fallback Strategy

To ensure a robust user experience even when the API is unavailable:
- Implemented comprehensive error handling for all API requests
- Created a fallback data system with mock products
- Added automatic switching to offline mode when API calls fail
- Provided clear user feedback about connection status

### 4. Responsive UI

The application features a fully responsive UI built with:
- React components for modular design
- TailwindCSS for styling
- Mobile-first approach ensuring usability on all device sizes

## Challenges & Solutions

### 1. API Reliability Issues

**Challenge**: The OpenFoodFacts API occasionally returned HTML instead of JSON or failed to respond.

**Solution**: 
- Implemented request timeouts to prevent hanging requests
- Added content-type validation with fallback parsing
- Created a robust offline mode with mock data
- Added clear user notifications about API status

### 2. Category Filtering

**Challenge**: The category endpoint format was inconsistent and often returned errors.

**Solution**:
- Discovered the correct endpoint format using the search.pl endpoint with category parameters
- Implemented proper URL encoding for all parameters
- Added fallback category filtering for offline mode

### 3. Reset Functionality

**Challenge**: The reset filters button wasn't properly triggering data refresh.

**Solution**:
- Enhanced the reset function to explicitly trigger a new data fetch
- Added loading state to provide visual feedback
- Implemented proper error handling for reset operations

## Features Implemented

1. **Product Search**
   - Text-based search by product name
   - Barcode search for specific products

2. **Filtering & Sorting**
   - Category-based filtering
   - Sorting by name (A-Z, Z-A)
   - Sorting by nutrition grade (best/worst first)

3. **Product Details**
   - Comprehensive product information display
   - Nutritional values visualization
   - Ingredients listing

4. **Offline Support**
   - Fallback to mock data when API is unavailable
   - All features work in offline mode
   - Clear user notifications about connection status

5. **Responsive Design**
   - Mobile-first approach
   - Adapts to all screen sizes
   - Optimized for touch and mouse interaction

## Time Taken to Complete

The assignment was completed in approximately 8 hours, broken down as follows:

- Initial setup and planning: 1 hour
- Core functionality implementation: 3 hours
- API integration and error handling: 2 hours
- UI refinement and responsive design: 1 hour
- Testing and bug fixes: 1 hour

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/openfoodfacts-explorer.git
cd openfoodfacts-explorer