import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import API from "../services/api";
import Swal from "sweetalert2";

export default function ManageProduct() {
  const dispatch = useDispatch();
  const productsState = useSelector(
    (state) => state.products || { items: [], loading: false }
  );
  const { items: products, loading } = productsState;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    _id: null, // for editing
  });

  const [preview, setPreview] = useState("");

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      if (formData._id) {
        // Update
        await API.put(`/products/${formData._id}`, data);
        Swal.fire("Updated!", "Product updated successfully", "success");
      } else {
        // Add
        await API.post("/products", data);
        Swal.fire("Added!", "Product added successfully", "success");
      }

      // Reset form
      setFormData({ name: "", price: "", category: "", image: "", _id: null });
      setPreview("");
      dispatch(fetchProducts());
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.error(error);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: "",
      _id: product._id,
    });
    setPreview(product.image.startsWith("http") ? product.image : `http://localhost:8080${product.image}`);
  };

  // Delete product
  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/products/${_id}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        dispatch(fetchProducts());
      } catch (error) {
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">Manage Products</h3>

      {/* Add / Update Form */}
      <div className="card p-4 mb-5 shadow-sm">
        <h5>{formData._id ? "Update Product" : "Add Product"}</h5>
        <form onSubmit={handleSubmit} className="row g-3 mt-2">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-warning w-100">
              {formData._id ? "Update" : "Add"}
            </button>
          </div>
        </form>

        {/* Preview */}
        {preview && (
          <div className="mt-3 text-center">
            <img
              src={preview.startsWith("http") ? preview : `http://localhost:8080${preview}`}
              alt="preview"
              className="img-fluid rounded"
              style={{ maxHeight: "150px", objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      {/* Products List */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card p-3 shadow-sm h-100">
                <img
                  src={product.image.startsWith("http") ? product.image : `http://localhost:8080${product.image}`}
                  className="img-fluid rounded mb-2"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <h5>{product.name}</h5>
                <p>₹{product.price}</p>
                <p className="text-muted">{product.category}</p>
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}