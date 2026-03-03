import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(state => state.products);
  const searchTerm = useSelector(state => state.search.term || "");
  const category = useSelector(state => state.search.category || ""); 

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const cat = category.toLowerCase();

    const filtered = products.filter(product => {
      const matchName = product.name.toLowerCase().includes(term);
      const matchCategory = cat ? product.category.toLowerCase() === cat : true;
      return matchName && matchCategory;
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, category]);

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">Products</h3>
      {loading && <p className="text-center">Loading products...</p>}

      <div className="row">
        {filteredProducts.length === 0 && !loading ? (
          <p className="text-center">No products found</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product._id} className="col-md-6 col-lg-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}