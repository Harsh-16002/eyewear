import { useEffect, useState } from "react";
import { Sun, Star, Globe, Heart } from "lucide-react"; // example icons
import { Button } from "@/components/ui/enhanced-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchCategories } from "@/api/categories"; // your API call

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const iconMap: Record<string, JSX.Element> = {
  Sunglass: <Sun className="w-16 h-16 text-yellow-400 mb-4" />,
  Classic: <Star className="w-16 h-16 text-white mb-4" />,
  Travel: <Globe className="w-16 h-16 text-blue-400 mb-4" />,
  Love: <Heart className="w-16 h-16 text-pink-400 mb-4" />,
  // Add more category names mapped to icons as needed
};

const CollectionsPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    loadCategories();
  }, []);

  const getRandomGradient = () => {
    const colors = [
      "#FF7E5F",
      "#FEB47B",
      "#6A82FB",
      "#FC5C7D",
      "#36D1DC",
      "#5B86E5",
      "#FFAFBD",
      "#C9FFBF",
    ];
    const first = colors[Math.floor(Math.random() * colors.length)];
    const second = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(135deg, ${first}, ${second})`;
  };

  return (
    <main className="relative">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=1600&q=80"
          alt="Collections Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/70"></div>
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-brand-gold">Collections</span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Explore our curated collections of premium eyewear designed for every style and occasion.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="rounded-2xl shadow-lg p-6 text-center flex flex-col justify-between"
                style={{ background: getRandomGradient() }}
              >
                {iconMap[cat.name] || <Sun className="w-16 h-16 text-white mb-4" />}
                <h3 className="text-xl font-semibold text-white mb-2">{cat.name}</h3>
                <p className="text-white/80 mb-4">{cat.description || "No description available"}</p>
                <Button variant="hero" size="lg" className="mt-auto">
                  Shop {cat.name}
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Values / USP Section */}
      <section className="bg-brand-navy py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Why Choose Our Collections
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Sun className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Vision</h3>
              <p className="text-white/80">
                Frames that enhance clarity and comfort for every day.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Star className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Quality</h3>
              <p className="text-white/80">
                Premium materials and expert craftsmanship in every collection.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-white/80">
                Trusted by thousands of happy customers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CollectionsPage;
