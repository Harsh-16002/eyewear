import { useEffect, useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import api from "@/api/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  image?: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Add to cart
  const handleAddToCart = async (productId: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in first to add items to your cart.");
    return;
  }

  try {
    const res =await api.post(
  "/cart/add", // ✅ add /add here
  { productId, quantity: 1 },
  { headers: { Authorization: `Bearer ${token}` } }
);

    alert(res.data.message || "Added to cart");
  } catch (err: any) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to add to cart");
  }
};


  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products?limit=8"); // adjust limit as needed
        const formatted = res.data.map((p: any) => ({
          _id: p._id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice || null,
          rating: p.rating || 0,
          reviewsCount: p.reviewsCount || 0,
          image: `http://localhost:5000/uploads/${p.image}`,
          category: p.category,
          isNew: Math.random() > 0.5, // optional
          isBestseller: Math.random() > 0.5, // optional
        }));
        setProducts(formatted);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-brand-gray-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-navy mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Handpicked frames that combine style, comfort, and quality. Each piece is carefully selected for its exceptional design and craftsmanship.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-brand-navy">
              No products available.
            </p>
          ) : (
            products.map((product) => (
              <Card key={product._id} variant="product" className="group">
                <div className="relative overflow-hidden">
                  {/* Product Image */}
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-brand-gold text-brand-navy">New</Badge>}
                      {product.isBestseller && <Badge className="bg-brand-navy text-white">Bestseller</Badge>}
                      {product.originalPrice && (
                        <Badge variant="destructive">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                        </Badge>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="ghost" className="bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="bg-white/90 hover:bg-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Add to Cart Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="glass"
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Category */}
                    <p className="text-sm text-brand-gray font-medium mb-1">{product.category}</p>

                    {/* Product Name */}
                    <h3 className="font-semibold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-brand-gold fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-brand-gray">{product.rating} ({product.reviewsCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-brand-navy">{product.price}</span>
                      {product.originalPrice && <span className="text-sm text-brand-gray line-through">{product.originalPrice}</span>}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="premium" size="lg">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 