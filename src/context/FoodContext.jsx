import { createContext, useContext, useEffect, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { mockProducts } from "../data/mockProducts"

// Create context
const FoodContext = createContext()

// Initial state
const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchQuery: "",
  barcodeQuery: "",
  selectedCategory: "",
  sortOption: "name-asc",
  page: 1,
  hasMore: true,
  useFallbackData: false,
}

// Reducer function
function foodReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        loading: false,
      }
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: [...state.products, ...action.payload],
        loading: false,
      }
    case "SET_FILTERED_PRODUCTS":
      return { ...state, filteredProducts: action.payload }
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, page: 1 }
    case "SET_BARCODE_QUERY":
      return { ...state, barcodeQuery: action.payload }
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload, page: 1 }
    case "SET_SORT_OPTION":
      return { ...state, sortOption: action.payload }
    case "SET_PAGE":
      return { ...state, page: action.payload }
    case "SET_HAS_MORE":
      return { ...state, hasMore: action.payload }
    case "USE_FALLBACK_DATA":
      return { ...state, useFallbackData: true }
    case "RESET_FILTERS":
      return {
        ...state,
        searchQuery: "",
        selectedCategory: "",
        page: 1,
        error: null,
      }
    default:
      return state
  }
}

// Helper function to filter mock products by category
const filterMockProductsByCategory = (products, category) => {
  if (!category) return products

  return products.filter((product) => {
    if (!product.categories) return false
    return product.categories.toLowerCase().includes(category.toLowerCase())
  })
}

// Helper function to filter mock products by search query
const filterMockProductsBySearch = (products, query) => {
  if (!query) return products

  const lowerCaseQuery = query.toLowerCase()
  return products.filter((product) => {
    const productName = (product.product_name || "").toLowerCase()
    const brands = (product.brands || "").toLowerCase()
    const categories = (product.categories || "").toLowerCase()

    return (
      productName.includes(lowerCaseQuery) || brands.includes(lowerCaseQuery) || categories.includes(lowerCaseQuery)
    )
  })
}

// Provider component
export const FoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foodReducer, initialState)
  const navigate = useNavigate()

  // Clear error after 5 seconds
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_ERROR" })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [state.error])

  // Fetch initial products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true })
        dispatch({ type: "CLEAR_ERROR" })

        // If we're already using fallback data, filter it instead of fetching
        if (state.useFallbackData) {
          let filteredProducts = mockProducts

          if (state.selectedCategory) {
            filteredProducts = filterMockProductsByCategory(filteredProducts, state.selectedCategory)
          }

          if (state.searchQuery) {
            filteredProducts = filterMockProductsBySearch(filteredProducts, state.searchQuery)
          }

          dispatch({ type: "SET_PRODUCTS", payload: filteredProducts })
          dispatch({ type: "SET_HAS_MORE", payload: false }) // No pagination with mock data
          return
        }

        // Construct the API URL
        let url
        if (state.selectedCategory) {
          // For category searches, we need to use the search.pl endpoint with tagtype_0=categories
          const encodedCategory = encodeURIComponent(state.selectedCategory)
          url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodedCategory}&json=true&page_size=20&page=1`
        } else if (state.searchQuery) {
          // Encode the search query for URL safety
          const encodedQuery = encodeURIComponent(state.searchQuery)
          url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedQuery}&json=true&page_size=20&page=1`
        } else {
          url = "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&page_size=20&page=1"
        }

        // Set a timeout to prevent hanging requests
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        try {
          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          })

          clearTimeout(timeoutId)

          // Check if response is OK
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
          }

          // Check if response is JSON
          const contentType = response.headers.get("content-type")
          if (!contentType || !contentType.includes("application/json")) {
            // Try to parse it anyway, as sometimes the content-type header might be incorrect
            try {
              const text = await response.text()
              // Check if it looks like JSON
              if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
                return JSON.parse(text)
              } else {
                console.error("Non-JSON response:", text.substring(0, 200) + "...")
                throw new Error("API response is not JSON. The OpenFoodFacts API might be experiencing issues.")
              }
            } catch (parseError) {
              console.error("Error parsing response:", parseError)
              throw new Error("Failed to parse API response. The OpenFoodFacts API might be experiencing issues.")
            }
          }

          const data = await response.json()

          if (data.products && data.products.length > 0) {
            dispatch({ type: "SET_PRODUCTS", payload: data.products })
            dispatch({ type: "SET_HAS_MORE", payload: data.products.length === 20 })
          } else {
            dispatch({ type: "SET_PRODUCTS", payload: [] })
            dispatch({ type: "SET_HAS_MORE", payload: false })
          }
        } catch (fetchError) {
          clearTimeout(timeoutId)
          throw fetchError
        }
      } catch (err) {
        console.error("Error fetching products:", err)

        // If we haven't already switched to fallback data, do so now
        if (!state.useFallbackData) {
          dispatch({ type: "USE_FALLBACK_DATA" })

          // Filter mock data based on current filters
          let filteredProducts = mockProducts

          if (state.selectedCategory) {
            filteredProducts = filterMockProductsByCategory(filteredProducts, state.selectedCategory)
          }

          if (state.searchQuery) {
            filteredProducts = filterMockProductsBySearch(filteredProducts, state.searchQuery)
          }

          dispatch({ type: "SET_PRODUCTS", payload: filteredProducts })
          dispatch({ type: "SET_HAS_MORE", payload: false }) // No pagination with mock data

          dispatch({
            type: "SET_ERROR",
            payload: `Unable to connect to the OpenFoodFacts API. Using offline data instead.`,
          })
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: `Failed to fetch products: ${err.message}. Using offline data.`,
          })

          // Set empty products to avoid showing stale data
          dispatch({ type: "SET_PRODUCTS", payload: [] })
        }
      }
    }

    // Only fetch if we have a search query or category, or if we're on the initial load
    if (state.searchQuery || state.selectedCategory || (state.products.length === 0 && !state.error)) {
      fetchProducts()
    }
  }, [state.searchQuery, state.selectedCategory, state.useFallbackData])

  // Apply sorting
  useEffect(() => {
    if (state.products.length > 0) {
      const sorted = [...state.products]

      switch (state.sortOption) {
        case "name-asc":
          sorted.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""))
          break
        case "name-desc":
          sorted.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""))
          break
        case "grade-asc":
          sorted.sort((a, b) => (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z"))
          break
        case "grade-desc":
          sorted.sort((a, b) => (b.nutrition_grades || "z").localeCompare(a.nutrition_grades || "z"))
          break
        default:
          break
      }

      dispatch({ type: "SET_FILTERED_PRODUCTS", payload: sorted })
    }
  }, [state.products, state.sortOption])

  // Load more products
  const loadMoreProducts = async () => {
    // If using fallback data, don't try to load more
    if (state.useFallbackData) {
      dispatch({ type: "SET_HAS_MORE", payload: false })
      return
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })

      const nextPage = state.page + 1
      let url

      if (state.selectedCategory) {
        const encodedCategory = encodeURIComponent(state.selectedCategory)
        url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodedCategory}&json=true&page_size=20&page=${nextPage}`
      } else if (state.searchQuery) {
        const encodedQuery = encodeURIComponent(state.searchQuery)
        url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedQuery}&json=true&page_size=20&page=${nextPage}`
      } else {
        url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&page_size=20&page=${nextPage}`
      }

      // Set a timeout to prevent hanging requests
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        })

        clearTimeout(timeoutId)

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        // Check if response is JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          // Try to parse it anyway, as sometimes the content-type header might be incorrect
          try {
            const text = await response.text()
            // Check if it looks like JSON
            if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
              return JSON.parse(text)
            } else {
              console.error("Non-JSON response:", text.substring(0, 200) + "...")
              throw new Error("API response is not JSON. The OpenFoodFacts API might be experiencing issues.")
            }
          } catch (parseError) {
            console.error("Error parsing response:", parseError)
            throw new Error("Failed to parse API response. The OpenFoodFacts API might be experiencing issues.")
          }
        }

        const data = await response.json()

        if (data.products && data.products.length > 0) {
          dispatch({ type: "ADD_PRODUCTS", payload: data.products })
          dispatch({ type: "SET_PAGE", payload: nextPage })
          dispatch({ type: "SET_HAS_MORE", payload: data.products.length === 20 })
        } else {
          dispatch({ type: "SET_HAS_MORE", payload: false })
        }
      } catch (fetchError) {
        clearTimeout(timeoutId)
        throw fetchError
      }
    } catch (err) {
      console.error("Error loading more products:", err)

      // Switch to fallback data if we haven't already
      if (!state.useFallbackData) {
        dispatch({ type: "USE_FALLBACK_DATA" })
        dispatch({
          type: "SET_ERROR",
          payload: `Unable to load more products. Using offline data instead.`,
        })
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: `Failed to load more products: ${err.message}`,
        })
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Search by barcode
  const searchByBarcode = async (barcode) => {
    if (!barcode || barcode.trim() === "") {
      dispatch({
        type: "SET_ERROR",
        payload: "Please enter a valid barcode.",
      })
      return
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })

      // If using fallback data, search in mock products
      if (state.useFallbackData) {
        const product = mockProducts.find((p) => p.code === barcode)

        if (product) {
          navigate(`/product/${barcode}`)
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "Product not found in offline data. Please try another barcode.",
          })
        }

        dispatch({ type: "SET_LOADING", payload: false })
        return
      }

      // Set a timeout to prevent hanging requests
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        })

        clearTimeout(timeoutId)

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        // Check if response is JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API response is not JSON")
        }

        const data = await response.json()

        if (data.status === 1 && data.product) {
          // Navigate to product detail page
          navigate(`/product/${barcode}`)
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "Product not found. Please check the barcode and try again.",
          })
        }
      } catch (fetchError) {
        clearTimeout(timeoutId)
        throw fetchError
      }
    } catch (err) {
      console.error("Error searching by barcode:", err)

      // Switch to fallback data if we haven't already
      if (!state.useFallbackData) {
        dispatch({ type: "USE_FALLBACK_DATA" })

        // Try to find the product in mock data
        const product = mockProducts.find((p) => p.code === barcode)

        if (product) {
          navigate(`/product/${barcode}`)
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "API connection failed. Product not found in offline data.",
          })
        }
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: `Failed to search by barcode: ${err.message}`,
        })
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Handle search by name
  const handleSearch = (query) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query })
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category })
  }

  // Handle sort change
  const handleSortChange = (option) => {
    dispatch({ type: "SET_SORT_OPTION", payload: option })
  }

  // Reset all filters
  const resetFilters = () => {
    // First dispatch the reset action to clear filters
    dispatch({ type: "RESET_FILTERS" })

    // If we're using fallback data, we need to manually filter the products
    if (state.useFallbackData) {
      dispatch({ type: "SET_LOADING", payload: true })
      // Reset to all mock products since filters are cleared
      dispatch({ type: "SET_PRODUCTS", payload: mockProducts })
      dispatch({ type: "SET_LOADING", payload: false })
    } else {
      // For API data, we need to trigger a new fetch
      // Set loading to true to show the user something is happening
      dispatch({ type: "SET_LOADING", payload: true })

      // Fetch products with no filters
      fetch("https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&page_size=20&page=1", {
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          if (data.products && data.products.length > 0) {
            dispatch({ type: "SET_PRODUCTS", payload: data.products })
            dispatch({ type: "SET_HAS_MORE", payload: data.products.length === 20 })
          } else {
            dispatch({ type: "SET_PRODUCTS", payload: [] })
            dispatch({ type: "SET_HAS_MORE", payload: false })
          }
        })
        .catch((err) => {
          console.error("Error fetching products after reset:", err)
          // Fall back to mock data if API fails
          if (!state.useFallbackData) {
            dispatch({ type: "USE_FALLBACK_DATA" })
            dispatch({ type: "SET_PRODUCTS", payload: mockProducts })
            dispatch({
              type: "SET_ERROR",
              payload: `Unable to reset filters with API. Using offline data instead.`,
            })
          } else {
            dispatch({
              type: "SET_ERROR",
              payload: `Failed to reset filters: ${err.message}`,
            })
          }
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false })
        })
    }
  }

  // Context value
  const value = {
    ...state,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
    loadMoreProducts,
    searchByBarcode,
    resetFilters,
  }

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>
}

// Custom hook to use the food context
export const useFoodContext = () => {
  const context = useContext(FoodContext)
  if (context === undefined) {
    throw new Error("useFoodContext must be used within a FoodProvider")
  }
  return context
}

