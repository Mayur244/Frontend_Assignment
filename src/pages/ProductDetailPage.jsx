import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { mockProducts } from "../data/mockProducts"

const ProductDetailPage = () => {
  const { barcode } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallbackData, setUsingFallbackData] = useState(false)

  // Placeholder image as base64 data URI (simple gray square with text)
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' fontFamily='Arial' fontSize='24' textAnchor='middle' dominantBaseline='middle' fill='%23999999'%3ENo Image%3C/text%3E%3C/svg%3E"

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)

        // First try to fetch from API
        try {
          // Set a timeout to prevent hanging requests
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

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
            setProduct(data.product)
            setUsingFallbackData(false)
            setError(null)
            return
          } else {
            throw new Error("Product not found in API")
          }
        } catch (apiError) {
          console.error("API fetch failed, trying fallback data:", apiError)

          // If API fetch fails, try fallback data
          const mockProduct = mockProducts.find((p) => p.code === barcode)

          if (mockProduct) {
            setProduct(mockProduct)
            setUsingFallbackData(true)
            setError(null)
          } else {
            throw new Error("Product not found in API or fallback data")
          }
        }
      } catch (err) {
        setError("Product not found or unavailable. Please try another product.")
        console.error("Error fetching product details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [barcode])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5DB996]"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <Link to="/" className="text-[#118B50] hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-[#5DB996] hover:underline flex items-center gap-2 mb-6">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      {usingFallbackData && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative mb-6">
          Note: Using offline data. Some information may not be up to date.
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4 flex justify-center">
            <img
              src={product.image_url || placeholderImage}
              alt={product.product_name || "Product Image"}
              className="w-full max-w-[300px] object-contain"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = placeholderImage
              }}
            />
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold mb-2">{product.product_name || "Unknown Product"}</h1>

            {product.brands && <p className="text-gray-600 mb-4">Brand: {product.brands}</p>}

            {product.nutrition_grades && (
              <div className="mb-4">
                <span className="font-semibold">Nutrition Grade: </span>
                <span
                  className={`inline-block w-8 h-8 rounded-full text-white text-center leading-8 font-bold uppercase ${
                    product.nutrition_grades === "a"
                      ? "bg-green-500"
                      : product.nutrition_grades === "b"
                        ? "bg-green-400"
                        : product.nutrition_grades === "c"
                          ? "bg-yellow-400"
                          : product.nutrition_grades === "d"
                            ? "bg-orange-400"
                            : "bg-red-500"
                  }`}
                >
                  {product.nutrition_grades}
                </span>
              </div>
            )}

            {product.categories && (
              <div className="mb-4">
                <h2 className="font-semibold mb-1">Categories:</h2>
                <p className="text-gray-700">{product.categories}</p>
              </div>
            )}

            {product.labels && (
              <div className="mb-4">
                <h2 className="font-semibold mb-1">Labels:</h2>
                <div className="flex flex-wrap gap-2">
                  {product.labels.split(",").map((label, index) => (
                    <span key={index} className="bg-[#E3F0AF] text-[#118B50] text-xs px-2 py-1 rounded">
                      {label.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            {product.ingredients_text ? (
              <p className="text-gray-700">{product.ingredients_text}</p>
            ) : (
              <p className="text-gray-500 italic">No ingredients information available</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Nutritional Values (per 100g)</h2>
            {product.nutriments ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Energy</p>
                  <p>
                    {product.nutriments.energy_100g || 0} {product.nutriments.energy_unit || "kcal"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Fat</p>
                  <p>{product.nutriments.fat_100g || 0}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Saturated Fat</p>
                  <p>{product.nutriments["saturated-fat_100g"] || 0}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Carbohydrates</p>
                  <p>{product.nutriments.carbohydrates_100g || 0}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Sugars</p>
                  <p>{product.nutriments.sugars_100g || 0}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Proteins</p>
                  <p>{product.nutriments.proteins_100g || 0}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Salt</p>
                  <p>{product.nutriments.salt_100g || 0}g</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Fiber</p>
                  <p>{product.nutriments.fiber_100g || 0}g</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No nutritional information available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

