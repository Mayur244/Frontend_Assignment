import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useFoodContext } from "../context/FoodContext"

const SortDropdown = () => {
  const { sortOption, handleSortChange } = useFoodContext()
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { id: "name-asc", label: "Name (A-Z)" },
    { id: "name-desc", label: "Name (Z-A)" },
    { id: "grade-asc", label: "Nutrition Grade (Best First)" },
    { id: "grade-desc", label: "Nutrition Grade (Worst First)" },
  ]

  const handleSortSelect = (sortId) => {
    handleSortChange(sortId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5DB996]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{sortOptions.find((option) => option.id === sortOption)?.label || "Sort By"}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-56 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {sortOptions.map((option) => (
            <div
              key={option.id}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => handleSortSelect(option.id)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortDropdown

