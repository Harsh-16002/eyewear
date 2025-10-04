// AddProduct.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import api from "@/api/axios"; // Axios instance
import Layout from "../pages/layout";

interface ProductForm {
  name: string;
  image: File | null;
  price: string;
  category: string;
  rating: string;
  reviewsCount: string;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product;

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    image: null,
    price: "",
    category: "",
    rating: "",
    reviewsCount: "",
  });
  const [preview, setPreview] = useState<string | null>(null);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
        if (res.data.length > 0 && !editingProduct)
          setFormData(prev => ({ ...prev, category: res.data[0].name }));
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, [editingProduct]);

  // Pre-fill form if editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        image: null, // must be null to avoid sending object
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        rating: editingProduct.rating?.toString() || "",
        reviewsCount: editingProduct.reviewsCount?.toString() || "",
      });
      setPreview(
        editingProduct.image ? `http://localhost:5000/uploads/${editingProduct.image}` : null
      );
    }
  }, [editingProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      return alert("Name, price, and category are required.");
    }

    if (!formData.image && !editingProduct) {
      return alert("Product image is required.");
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.image) data.append("image", formData.image);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("rating", formData.rating || "0");
      data.append("reviewsCount", formData.reviewsCount || "0");

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated successfully!");
      } else {
        await api.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added successfully!");
      }

      navigate("/admin/show-products");
    } catch (err: any) {
      console.error("Failed to save product:", err);
      alert(err.response?.data?.message || "Failed to save product");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover border"
                  />
                )}
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>

              {/* Reviews Count */}
              <div>
                <Label htmlFor="reviewsCount">Reviews Count</Label>
                <Input
                  id="reviewsCount"
                  name="reviewsCount"
                  type="number"
                  value={formData.reviewsCount}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" variant="gold" className="w-full mt-2">
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddProduct;
