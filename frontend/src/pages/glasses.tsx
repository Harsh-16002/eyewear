import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import api from "@/api/axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Gem } from "lucide-react";


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

const GlassesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products"); // fetch all products
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

  // Add to cart
  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first to add items to your cart.");
      return;
    }
    try {
      const res = await api.post(
        "/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Added to cart");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <main className="relative">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=1600&q=80"
          alt="Premium Glasses Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/70"></div>
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Explore <span className="text-brand-gold">Our Glasses</span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Discover premium eyeglasses and sunglasses crafted with precision and style. 
            Find the perfect frame for your look and lifestyle.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-12 text-center">
          Our Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p className="text-center col-span-full text-brand-navy">No products available.</p>
          ) : (
            products.map((product) => (
              <Card key={product._id} variant="product" className="group">
                <div className="relative overflow-hidden">
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
                    <p className="text-sm text-brand-gray font-medium mb-1">{product.category}</p>
                    <h3 className="font-semibold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-brand-gold fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-brand-gray">{product.rating} ({product.reviewsCount})</span>
                    </div>
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
      </section>

      {/* Values / USP Section */}
      <section className="bg-brand-navy py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Eye className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Vision</h3>
              <p className="text-white/80">Perfect clarity and comfort in every frame.</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Gem className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Quality</h3>
              <p className="text-white/80">Premium materials and craftsmanship for long-lasting wear.</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Users className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-white/80">Trusted by thousands of happy customers worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">Find Your Perfect Frame</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Shop our exclusive collection of eyewear crafted for style and comfort.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl">Shop Collection</Button>
          <Button variant="glass" size="xl">Virtual Try-On</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GlassesPage;
