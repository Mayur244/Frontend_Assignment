import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  const { code, product_name, image_url, categories, nutrition_grades, ingredients_text } = product

  // Truncate text to a certain length
  const truncateText = (text, maxLength) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  // Get first category
  const mainCategory = categories ? categories.split(",")[0].trim() : "Unknown"

  // Placeholder image as base64 data URI (simple gray square with text)
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' fontFamily='Arial' fontSize='24' textAnchor='middle' dominantBaseline='middle' fill='%23999999'%3ENo Image%3C/text%3E%3C/svg%3E"

  return (
    <Link to={`/product/${code}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform hover:scale-105 hover:shadow-lg">
        <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
          <img
            src={image_url || placeholderImage}
            alt={product_name || "Product Image"}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = placeholderImage
            }}
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg leading-tight">
              {truncateText(product_name || "Unknown Product", 40)}
            </h3>

            {nutrition_grades && (
              <span
                className={`inline-block w-6 h-6 rounded-full text-white text-center leading-6 font-bold uppercase ${
                  nutrition_grades === "a"
                    ? "bg-green-500"
                    : nutrition_grades === "b"
                      ? "bg-green-400"
                      : nutrition_grades === "c"
                        ? "bg-yellow-400"
                        : nutrition_grades === "d"
                          ? "bg-orange-400"
                          : "bg-red-500"
                }`}
              >
                {nutrition_grades}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2">Category: {mainCategory}</p>

          {ingredients_text && (
            <p className="text-sm text-gray-500">Ingredients: {truncateText(ingredients_text, 80)}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

