import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Glasses,
  ChevronDown,
  ClipboardList, // My Orders icon
} from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import api from "@/api/axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0); // optional badge for My Orders

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Glasses", href: "/glasses" },
    { name: "Sunglasses", href: "/sunglasses" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!token) return;
      try {
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const count = res.data.items?.reduce(
          (acc: number, item: any) => acc + item.quantity,
          0
        ) || 0;
        setCartItemsCount(count);
      } catch (err) {
        console.error("Failed to fetch cart count:", err);
      }
    };
    fetchCartCount();
  }, [token]);

  // Fetch orders count (optional badge)
  useEffect(() => {
    const fetchOrdersCount = async () => {
      if (!token) return;
      try {
        const res = await api.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrdersCount(res.data.length || 0);
      } catch (err) {
        console.error("Failed to fetch orders count:", err);
      }
    };
    fetchOrdersCount();
  }, [token]);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-brand-navy">
          <Glasses className="h-8 w-8 text-brand-gold" />
          <span>Eyewear</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.href) ? "text-brand-gold" : "text-foreground hover:text-brand-gold"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* My Orders */}
          {user && (
            <Link to="/myorders" className="relative">
              <Button variant="ghost" size="icon">
                <ClipboardList className="h-5 w-5" />
                {ordersCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                  >
                    {ordersCount}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {/* Shopping Cart */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="h-4 w-4 text-gray-700" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 text-sm text-gray-800">Hello, {user.name}</div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-brand-gold bg-brand-gray-light"
                      : "text-foreground hover:text-brand-gold hover:bg-brand-gray-light"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                <Button variant="ghost" className="w-full justify-start px-3">
                  <Search className="h-4 w-4 mr-3" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
