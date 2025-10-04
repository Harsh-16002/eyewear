import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Home, BarChart3, Package, ShoppingCart, Users, Settings, X, Plus, List, Grid } from "lucide-react";

type Props = { sidebarOpen: boolean; setSidebarOpen: (val: boolean) => void; };

const Sidebar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null); // track which menu is open

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-brand-navy transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-brand-navy-light">
        <h1 className="text-xl font-bold text-white">Eyewear Admin</h1>
        <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-brand-navy-light" onClick={() => setSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <a href="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-brand-navy-light hover:text-white">
              <Home className="h-5 w-5 mr-3" /> Dashboard
            </a>
          </li>


          {/* Products (Accordion) */}
          <li>
            <button
              onClick={() => setOpenMenu(openMenu === "products" ? null : "products")}
              className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-brand-navy-light hover:text-white focus:outline-none"
            >
              <Package className="h-5 w-5 mr-3" />
              Products
              <span className="ml-auto">{openMenu === "products" ? "▲" : "▼"}</span>
            </button>

            {/* Sub-menu */}
            {openMenu === "products" && (
              <ul className="mt-2 ml-8 space-y-2">
                <li>
                  <a href="/admin/add-product" className="flex items-center px-2 py-2 text-sm text-white hover:bg-brand-navy-light rounded">
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                  </a>
                </li>
                <li>
                  <a href="/admin/show-products" className="flex items-center px-2 py-2 text-sm text-white hover:bg-brand-navy-light rounded">
                    <List className="h-4 w-4 mr-2" /> Show Products
                  </a>
                </li>
                <li>
                  <a href="/admin/categories" className="flex items-center px-2 py-2 text-sm text-white hover:bg-brand-navy-light rounded">
                    <Grid className="h-4 w-4 mr-2" /> Categories
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Orders */}
          <li>
            <a href="/admin/admin-orders" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-brand-navy-light hover:text-white">
              <ShoppingCart className="h-5 w-5 mr-3" /> Orders
            </a>
          </li>

          {/* Customers */}
          <li>
            <a href="/admin/customers" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-white hover:bg-brand-navy-light hover:text-white">
              <Users className="h-5 w-5 mr-3" /> Customers
            </a>
          </li>

          {/* Settings */}
        
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-navy-light">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-brand-gold flex items-center justify-center">
            <span className="text-brand-navy font-bold">A</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-300">admin@eyewear.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
