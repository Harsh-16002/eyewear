import { Button } from "@/components/ui/enhanced-button";
import { ArrowRight, Eye } from "lucide-react";
import heroImage from "@/assets/hero-glasses.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium Eyewear Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-6">
            <Eye className="h-8 w-8 text-brand-gold" />
            <span className="text-brand-gold font-medium text-lg">Premium Eyewear</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            See the World
            <span className="block text-brand-gold">Differently</span>
          </h1>

          <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Discover our curated collection of premium eyeglasses and sunglasses. 
            From classic designs to modern innovations, find the perfect frames that 
            express your unique style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
          <Button
  asChild
  variant="hero"
  size="xl"
  className="group inline-flex items-center"
>
  <a href="/collections">
    Shop Collection
    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
  </a>
</Button>

            <Button variant="glass" size="xl">
              Virtual Try-On
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-gold">500+</div>
              <div className="text-white/80 text-sm">Premium Frames</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-gold">50K+</div>
              <div className="text-white/80 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-gold">15+</div>
              <div className="text-white/80 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-brand-gold/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl"></div>
    </section>
  );
};

export default HeroSection;