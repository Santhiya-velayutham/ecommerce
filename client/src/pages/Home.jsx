import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CarouselBanner from "../components/CarouselBanner";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Auto Carousel Banner */}
      <CarouselBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Featured Products</h2>
          <p className="text-muted">
            Discover our latest collection
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Special Offer Section */}
      <div className="container mb-5">
        <div className="rounded-4 p-5 text-center text-white shadow"
          style={{
            background:
              "linear-gradient(135deg, #000000, #434343)"
          }}
        >
          <h3 className="fw-bold mb-3">
            Mega Sale 30% OFF
          </h3>
          <p className="mb-4">
            Limited time offer on selected products
          </p>
          <button
            className="btn btn-warning px-4 hero-btn"
            onClick={() => navigate("/products")} 
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}