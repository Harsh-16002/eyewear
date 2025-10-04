import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";

const recentOrders = [
  { id: "#ORD001", customer: "John Doe", product: "Classic Aviator", amount: "$299", status: "completed", date: "2024-01-15" },
  { id: "#ORD002", customer: "Jane Smith", product: "Modern Rectangle", amount: "$249", status: "processing", date: "2024-01-15" },
  { id: "#ORD003", customer: "Mike Johnson", product: "Vintage Round", amount: "$199", status: "shipped", date: "2024-01-14" },
  { id: "#ORD004", customer: "Sarah Wilson", product: "Cat Eye Chic", amount: "$329", status: "pending", date: "2024-01-14" },
];

const products = [
  { id: 1, name: "Classic Aviator", category: "Sunglasses", price: "$299", stock: 45, status: "active", sales: 124 },
  { id: 4, name: "Cat Eye Chic", category: "Sunglasses", price: "$329", stock: 12, status: "low_stock", sales: 203 }
];

const getStatusColor = (status: string) => {
  switch(status){
    case "completed": return "bg-green-500";
    case "processing": return "bg-blue-500";
    case "shipped": return "bg-purple-500";
    case "pending": return "bg-yellow-500";
    case "low_stock": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const OverviewTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Recent Orders */}
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">Recent Orders <Button variant="ghost" size="sm">View All</Button></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map(order => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-brand-gray-light/50 rounded-lg">
              <div>
                <p className="font-medium text-brand-navy">{order.id}</p>
                <p className="text-sm text-brand-gray">{order.customer}</p>
                <p className="text-sm text-brand-gray">{order.product}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-brand-navy">{order.amount}</p>
                <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>{order.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Low Stock Alerts */}
    <Card variant="elevated">
      <CardHeader>
        <CardTitle className="flex items-center"><AlertCircle className="h-5 w-5 text-red-500 mr-2" />Low Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.filter(p => p.status==="low_stock").map(product => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="font-medium text-brand-navy">{product.name}</p>
                <p className="text-sm text-brand-gray">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-600 font-medium">{product.stock} left</p>
                <Button variant="outline" size="sm">Restock</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default OverviewTab;
