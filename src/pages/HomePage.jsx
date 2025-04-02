import { useFoodContext } from "../context/FoodContext"
import ProductCard from "../components/ProductCard"
import SearchBar from "../components/SearchBar"
import BarcodeSearch from "../components/BarcodeSearch"
import CategoryFilter from "../components/CategoryFilter"
import SortDropdown from "../components/SortDropdown"
import { RefreshCw, AlertCircle, Info } from "lucide-react"

const HomePage = () => {
  const { filteredProducts, loading, error, hasMore, loadMoreProducts, resetFilters, page, useFallbackData } =
    useFoodContext()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <SearchBar />
        </div>
        <div className="w-full md:w-1/3">
          <BarcodeSearch />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <CategoryFilter />
          <button
            onClick={resetFilters}
            className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
              loading ? "bg-gray-300 text-gray-500" : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5DB996]`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 mr-2 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
                Resetting...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Filters
              </>
            )}
          </button>
        </div>
        <SortDropdown />
      </div>

      {useFallbackData && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative flex items-start">
          <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>Using offline data due to API connection issues. Limited product selection available.</div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {loading && page === 1 ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5DB996]"></div>
        </div>
      ) : filteredProducts.length === 0 && !loading && !error ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">No products found.</p>
          <p className="text-gray-500">Try a different search term or category, or reset the filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreProducts}
                disabled={loading}
                className="px-6 py-2 bg-[#5DB996] text-white rounded-md hover:bg-[#118B50] disabled:[#5DB996] cursor-pointer"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default HomePage

