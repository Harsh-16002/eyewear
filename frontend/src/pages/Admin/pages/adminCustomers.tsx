import { useEffect, useState } from "react";
import api from "@/api/axios";
import Layout from "./layout";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string; // 'admin' or 'user'
  isBlocked?: boolean;
  createdAt: string;
}

const AdminCustomersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  // Fetch all customers
  const fetchUsers = async () => {
    if (!token) {
      setError("Not logged in");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/admin/customers/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure isBlocked is defined for all users
      const customers: User[] = res.data.users.map((user: User) => ({
        ...user,
        isBlocked: user.isBlocked ?? false,
      }));

      setUsers(customers);
    } catch (err: any) {
      console.error("Error fetching users:", err.response || err);
      setError(err.response?.data?.message || "Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle block/unblock
  const toggleBlockUser = async (id: string, block: boolean) => {
    if (!token) {
      setError("Not logged in");
      return;
    }

    try {
      await api.put(
        `/admin/customers/users/${id}/block`,
        { isBlocked: block },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state without refetching all
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBlocked: block } : user
        )
      );
    } catch (err: any) {
      console.error("Error blocking/unblocking user:", err.response || err);
      setError(err.response?.data?.message || "Failed to update user status. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-20 text-gray-700">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-full">
        <h1 className="text-3xl font-bold mb-6">Customers</h1>

        {users.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user._id} className="bg-white rounded shadow p-4">
                <p>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {user.isBlocked ? (
                    <span className="text-red-600 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </p>

                <button
                  onClick={() => toggleBlockUser(user._id, !user.isBlocked)}
                  className={`mt-3 px-3 py-1 rounded text-white ${
                    user.isBlocked
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {user.isBlocked ? "Unblock User" : "Block User"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminCustomersPage;
