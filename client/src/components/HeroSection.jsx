// components/HeroSection.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory, clearSearchTerm } from "../features/searchSlice";


export default function HeroSection() {
const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleShopNow = () => {
    dispatch(clearSearchTerm());      
    dispatch(setCategory("Fashion")); 
    navigate("/products");            
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center bg-light rounded-4 p-4 p-md-5 shadow-sm hero-section">

        {/* Left Text Section */}
        <div className="col-md-6">
          <h6 className="text-warning fw-bold mb-2">
            Trending Item
          </h6>

          <h1 className="display-5 fw-bold mb-3">
            WOMEN'S LATEST
            <br />
            FASHION SALE
          </h1>

          <p className="fs-5 mb-4">
            Starting at <span className="fw-bold">₹999</span>
          </p>

          
         <button className="btn btn-warning px-4 hero-btn" onClick={handleShopNow}>
      Shop Now
    </button>
        </div>

        {/* Right Image Section */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?crop=entropy&cs=tinysrgb&fit=max&h=400&w=400"
            className="img-fluid rounded-4 hero-img shadow"
            alt="Fashion Banner"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x400?text=Fashion+Banner";
            }}
          />
        </div>

      </div>

    
    </div>
  );
}