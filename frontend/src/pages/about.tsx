import { Eye, Users, Gem } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <main className="relative">
        <Navbar />
      {/* Hero Banner */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=1600&q=80"
          alt="About Premium Eyewear"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/70"></div>

        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About <span className="text-brand-gold">Us</span>
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Discover the story behind our passion for timeless design,
            premium quality, and eyewear crafted to help you see the world differently.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              For over 15 years, we have been redefining eyewear with a blend of
              craftsmanship, innovation, and timeless design. Every frame we create
              is a statement of individuality and elegance.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With a mission to combine luxury with comfort, our collections
              are inspired by global fashion trends while honoring classic styles.
            </p>
            <Button variant="hero" size="lg">
              Explore Collection
            </Button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1580657018954-91c0c7fa1f58?auto=format&fit=crop&w=1000&q=80"
              alt="Crafted Eyewear"
              className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-navy py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Eye className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Vision</h3>
              <p className="text-white/80">
                Creating eyewear that enhances clarity, comfort, and confidence.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Gem className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Quality</h3>
              <p className="text-white/80">
                Using premium materials and craftsmanship to ensure durability and style.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl shadow-lg">
              <Users className="h-12 w-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-white/80">
                Serving over 50,000 happy customers worldwide with trust and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
          Ready to See Differently?
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of fashion and function.
          Discover eyewear crafted just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl">
            Shop Now
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

export default AboutPage;
