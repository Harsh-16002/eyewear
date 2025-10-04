import { Button } from "@/components/ui/enhanced-button";
import { Menu, Download, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
};

const Header = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth info
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Redirect to login
    navigate("/login");
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Admin Dashboard</h1>
            <p className="text-brand-gray mt-1">Manage your eyewear store</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
         

          {/* Logout button */}
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
