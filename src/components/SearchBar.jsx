import { useState } from "react"
import { Search } from "lucide-react"
import { useFoodContext } from "../context/FoodContext"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const { handleSearch, loading } = useFoodContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for food products..."
          className="w-full py-2 pl-10 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5DB996] focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-[#5DB996] text-white rounded-md hover:bg-[#118B50] disabled:bg-[#118B50] cursor-pointer"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  )
}

export default SearchBar

