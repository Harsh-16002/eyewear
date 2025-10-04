import { useEffect, useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2 } from "lucide-react";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";


interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
    stock?: number;
    [key: string]: any;
  };
  quantity: number;
}

const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === cartItemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

 const removeItem = async (cartItemId: string) => {
  if (!token) return;
  try {
    // Call backend to delete item
    await api.delete(`/cart/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Update frontend state
    setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
  } catch (err) {
    console.error("Failed to remove item:", err);
  }
};


  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading)
    return (
      <p className="text-center text-white mt-20 text-lg font-medium">
        Loading cart...
      </p>
    );

  return (
    
    <main className="relative bg-gray-900 min-h-screen">
      <Navbar />

      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">
          Your Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 text-lg">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-gray-800 rounded-2xl shadow-xl p-5"
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.product.image}`}
                    alt={item.product.name}
                    className="w-28 h-28 object-cover rounded-xl shadow-lg"
                  />
                  <div className="flex-1 ml-5 space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {item.product.name}
                    </h3>
                    {item.product.description && (
                      <p className="text-gray-300 text-sm">
                        {item.product.description}
                      </p>
                    )}
                    {item.product.category && (
                      <p className="text-gray-400 text-sm">
                        Category: {item.product.category}
                      </p>
                    )}
                    <p className="text-white font-medium">
                      {item.product.price} x {item.quantity} = 
                      {item.product.price * item.quantity}
                    </p>
                    <div className="flex items-center mt-3 space-x-2">
                      <Button
                        size="sm"
                        variant="glass"
                        onClick={() => updateQuantity(item._id, -1)}
                      >
                        -
                      </Button>
                      <span className="text-white/90 text-lg">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="glass"
                        onClick={() => updateQuantity(item._id, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="glass"
                    size="icon"
                    className="text-red-500"
                    onClick={() => removeItem(item._id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Checkout Summary */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col space-y-6 text-white">
            <h2 className="text-2xl font-bold">Summary</h2>
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>15</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-white">
              <span>Total</span>
              <span>{subtotal + 15}</span>
            </div>
          <Button
  variant="hero"
  size="xl"
  onClick={() => navigate("/checkout")}
>
  Checkout
</Button>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CartPage;
