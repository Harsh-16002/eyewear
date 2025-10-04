import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../pages/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/enhanced-button";
import api from "@/api/axios";

// Types
interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  rating?: number;
  reviewsCount?: number;
  image?: string;
}

const ShowProducts: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
      if (res.data.length > 0) setSelectedCategory(res.data[0].name);
    };
    loadCategories();
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      const url = selectedCategory ? `/products?category=${selectedCategory}` : "/products";
      const res = await api.get(url);
      setProducts(res.data);
    };
    if (selectedCategory) loadProducts();
  }, [selectedCategory]);

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully!");
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  // Edit product
  const handleEdit = (product: Product) => {
    navigate("/admin/add-product", { state: { product } });
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 space-y-4">
        {/* Category Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Filter by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Select Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Products List</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(prod => (
                  <Card key={prod._id} className="p-2">
                    {prod.image && (
                      <img
                        src={`http://localhost:5000/uploads/${prod.image}`}
                        alt={prod.name}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <div className="mt-2">
                      <h2 className="font-bold">{prod.name}</h2>
                      <p>Category: {prod.category}</p>
                      <p>Price: ${prod.price}</p>
                      {prod.rating && <p>Rating: {prod.rating}</p>}
                      {prod.reviewsCount && <p>Reviews: {prod.reviewsCount}</p>}
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Button size="sm" onClick={() => handleEdit(prod)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(prod._id)}>Delete</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShowProducts;
