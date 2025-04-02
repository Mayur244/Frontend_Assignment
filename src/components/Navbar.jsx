import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-[#118B50] shadow-md">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="text-xl font-bold text-[#E3F0AF]">
        Food Product Explorer
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

