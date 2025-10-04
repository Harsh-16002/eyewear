import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/enhanced-card";
import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react";
import api from "@/api/axios";

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: any;
}

const StatsCards = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    try {
      // Fetch orders
      const ordersRes = await api.get("/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch products
      const productsRes = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch customers
      const customersRes = await api.get("/admin/customers/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dynamicStats: Stat[] = [
        {
          title: "Total Orders",
          value: ordersRes.data.orders?.length.toLocaleString() || "0",
          change: "+0%",
          icon: ShoppingCart,
        },
        {
          title: "Active Products",
          value: productsRes.data.products?.length?.toLocaleString() || productsRes.data?.length?.toLocaleString() || "0",
          change: "+0%",
          icon: Package,
        },
        {
          title: "Total Customers",
          value: customersRes.data.users?.length.toLocaleString() || "0",
          change: "+0%",
          icon: Users,
        },
      ];

      setStats(dynamicStats);
    } catch (err: any) {
      console.error("Error fetching stats:", err.response || err);
      setError(err.response?.data?.message || "Failed to fetch stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading stats...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">{stat.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Icon className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
