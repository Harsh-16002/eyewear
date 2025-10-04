import { useEffect, useState } from "react";
import { Eye, Users, Gem } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/api/axios"; // Axios instance

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  rating?: number;
  reviewsCount?: number;
}

const SunglassesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from backend
 // Fetch products from backend filtered by category
const fetchProducts = async () => {
  try {
    const res = await api.get("/products", {
      params: { category: "Sunglass" }, // <-- send category as query param
    });
    setProducts(res.data);
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1600&q=80"
          alt="Premium Sunglasses Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/70"></div>

        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Explore <span className="text-brand-gold">Sunglasses</span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Discover premium sunglasses designed for style, comfort, and clarity. 
            Perfect for every season and occasion.
          </p>
        </div>
      </section>

      {/* Sunglasses Collection */}
      <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-12 text-center">
          Our Sunglasses
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.length === 0 && <p className="text-center col-span-3">No sunglasses found.</p>}
          {products.map((product) => (
            <div key={product._id} className="bg-white/10 rounded-2xl shadow-lg p-6 text-center">
              <img
                src={`http://localhost:5000/uploads/${product.image}`} // Make sure your backend serves uploads folder
                alt={product.name}
                className="rounded-xl mb-4 w-full h-64 object-cover"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-white/80 mb-4">
                Price: ₹{product.price} | Rating: {product.rating || 0}⭐
              </p>
              <Button variant="hero" size="lg">
                Buy Now
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Values / USP Section */}
      <section className="bg-brand-navy py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Why Choose Our Sunglasses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Eye className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Clarity</h3>
              <p className="text-white/80">
                High-quality lenses for perfect vision and UV protection.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Gem className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Durability</h3>
              <p className="text-white/80">
                Built to last with premium materials and sturdy frames.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Users className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Style</h3>
              <p className="text-white/80">
                Designed to complement your look for every occasion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
          Find Your Perfect Sunglasses
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Browse our exclusive collection and pick the perfect frame for your style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl">
            Shop Collection
          </Button>
          <Button variant="glass" size="xl">
            Virtual Try-On
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SunglassesPage;
