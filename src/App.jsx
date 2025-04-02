import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { FoodProvider } from "./context/FoodContext"
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage"
import Navbar from "./components/Navbar"

function App() {
  return (
    <Router>
      <FoodProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:barcode" element={<ProductDetailPage />} />
            </Routes>
          </main>
        </div>
      </FoodProvider>
    </Router>
  )
}

export default App

