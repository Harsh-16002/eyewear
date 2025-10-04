import { useEffect, useState } from "react";
import api from "@/api/axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface OrderItem {
  product: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const res = await api.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading)
    return <p className="text-center text-white mt-20">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center text-white mt-20">No orders found.</p>;

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                Order ID: {order._id}
              </h2>
              <p className="text-gray-400 mb-2">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>

              {/* Status Badge */}
              <div className="mb-4">
                Status:{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-500 text-white"
                      : order.status === "Out for Delivery"
                      ? "bg-yellow-500 text-black"
                      : order.status === "Processing"
                      ? "bg-blue-500 text-white"
                      : order.status === "Cancelled"
                      ? "bg-red-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-gray-700/50 p-2 rounded-lg"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${item.product.image}`}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p>
                        ${item.product.price} x {item.quantity} = $
                        {item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-white font-semibold">
                Total Amount: ${order.totalAmount}
              </div>

              <div className="mt-4 text-gray-300">
                Shipping Address:
                <p>{order.address.fullName}</p>
                <p>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} -{" "}
                  {order.address.zip}
                </p>
                <p>Phone: {order.address.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default MyOrdersPage;
