import { useState, useEffect } from "react"
import { ChevronDown } from 'lucide-react'
import { useFoodContext } from "../context/FoodContext"

const CategoryFilter = () => {
  const { selectedCategory, handleCategoryChange } = useFoodContext()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  // Hardcoded categories for simplicity
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setCategories([
        { id: "breakfast-cereals", name: "Breakfast Cereals" },
        { id: "dairy", name: "Dairy" },
        { id: "snacks", name: "Snacks" },
        { id: "beverages", name: "Beverages" },
        { id: "frozen-foods", name: "Frozen Foods" },
        { id: "fruits", name: "Fruits" },
        { id: "vegetables", name: "Vegetables" },
        { id: "condiments", name: "Condiments" },
        { id: "chocolate", name: "Chocolate" },
        { id: "bread", name: "Bread" },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const handleCategorySelect = (categoryId) => {
    handleCategoryChange(categoryId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5DB996]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedCategory
            ? categories.find((cat) => cat.id === selectedCategory)?.name || "Select Category"
            : "Select Category"}
        </span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div
            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
            onClick={() => handleCategorySelect("")}
          >
            All Categories
          </div>

          {loading ? (
            <div className="text-center py-2 text-gray-500">Loading categories...</div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default CategoryFilter

