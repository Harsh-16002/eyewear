import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/components/AdminDashboard";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/about";
import GlassesPage from "./pages/glasses";
import SunglassesPage from "./pages/sunglasses";
import CollectionsPage from "./pages/collections";
import CartPage from "./pages/cart";
import AddProduct from "./pages/Admin/pages/addProduct";
import Categories from "./pages/Admin/pages/categories";
import ShowProducts from "./pages/Admin/pages/showProducts";
import PrivateRoute from "./components/auth/PrivateRoute";
import CheckoutPage from "./pages/checkout";
import MyOrdersPage from "./pages/order";
import AdminOrdersPage from "./pages/Admin/pages/adminOrders";
import ForgotPassword from "./pages/forgetPassword";
import AdminCustomersPage from "./pages/Admin/pages/adminCustomers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/glasses" element={<GlassesPage />} />
    <Route path="/sunglasses" element={<SunglassesPage />} />
    <Route path="/collections" element={<CollectionsPage />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Cart page - only logged-in users */}
    <Route
      path="/cart"
      element={
        <PrivateRoute role="user">
          <CartPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin/customers"
      element={
        <PrivateRoute role="admin">
          <AdminCustomersPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/checkout"
      element={
        <PrivateRoute role="user">
          <CheckoutPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/myorders"
      element={
        <PrivateRoute role="user">
          <MyOrdersPage />
        </PrivateRoute>
      }
    />


    {/* Admin routes */}
    <Route
      path="/admin"
      element={
        <PrivateRoute role="admin">
          <AdminDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin/add-product"
      element={
        <PrivateRoute role="admin">
          <AddProduct />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin/categories"
      element={
        <PrivateRoute role="admin">
          <Categories />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin/show-products"
      element={
        <PrivateRoute role="admin">
          <ShowProducts />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin/admin-orders"
      element={
        <PrivateRoute role="admin">
          <AdminOrdersPage />
        </PrivateRoute>
      }
    />
  

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
