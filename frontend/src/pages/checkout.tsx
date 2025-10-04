import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const res = await api.get("/cart", { headers: { Authorization: `Bearer ${token}` } });
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + (item.product.price || 0) * item.quantity,
        0
      );

      const res = await api.post(
        "/orders/checkout",
        { items: cartItems, address, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      navigate("/"); // Redirect to home or order confirmation
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      <section className="py-20 px-6 lg:px-12 max-w-3xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { name: "fullName", label: "Full Name" },
            { name: "street", label: "Street Address" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "country", label: "Country" },
            { name: "zip", label: "ZIP / Postal Code" },
            { name: "phone", label: "Phone Number" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={address[field.name as keyof typeof address]}
                onChange={handleChange}
                required
                className="px-3 py-2 rounded-lg text-gray-900"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-brand-gold text-white py-3 rounded-lg font-semibold mt-4 hover:bg-yellow-500"
          >
            Place Order
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
};

export default CheckoutPage;
