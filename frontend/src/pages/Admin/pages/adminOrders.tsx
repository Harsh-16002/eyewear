// src/pages/Admin/pages/adminOrders.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios";
import Layout from "./layout";

interface Product {
  name?: string;
  price?: number;
  image?: string;
}

interface OrderItem {
  product?: Product | null;
  quantity: number;
}

interface User {
  name?: string;
  email?: string;
}

interface Order {
  _id: string;
  user?: User | null;
  items?: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await api.get("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await api.put(
        `/admin/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // refresh after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-700">Loading...</p>;

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-full">
        <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

        {orders.length === 0 && <p>No orders found.</p>}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded p-4 mb-4 shadow"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>User:</strong>{" "}
              {order.user?.name || "N/A"} (
              {order.user?.email || "N/A"})
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="ml-2 px-2 py-1 text-black rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </p>

            <div className="mt-2">
              <strong>Items:</strong>
              {order.items?.length === 0 && <p>No items</p>}
              {order.items?.map((item, idx) => (
                <p key={idx}>
                  {item.product?.name || "N/A"} x {item.quantity} ($
                  {item.product?.price
                    ? item.product.price * item.quantity
                    : 0}
                  )
                </p>
              ))}
            </div>

            <p className="mt-2 font-semibold">
              Total: ${order.totalAmount}
            </p>
            <p>
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminOrdersPage;
