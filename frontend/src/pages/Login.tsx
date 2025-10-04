import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Separator } from "@/components/ui/separator";
import { Glasses, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await loginUser({
      email: formData.email,
      password: formData.password,
    });

    console.log("Login successful:", response);

    // Save token and user info
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify({ name: response.user.name }));
    localStorage.setItem("role", response.user.role);

    // Redirect
    if (response.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/"); // normal user goes home
    }

  } catch (error: any) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    alert(error.response?.data?.message || "Login failed");
  }
};



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Glasses className="h-10 w-10 text-brand-gold" />
            <span className="text-3xl font-bold text-white">Eyewear</span>
          </Link>
        </div>

        <Card variant="glass" className="backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-white/80">
              Sign in to your account to continue shopping
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-white/80">
                  <input type="checkbox" className="rounded border-white/20" />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-brand-gold hover:text-brand-gold-light"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="gold" size="lg" className="w-full">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <Separator className="bg-white/20" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-navy px-3 text-sm text-white/80">
                or
              </span>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="glass" size="lg" className="w-full">
                Continue with Google
              </Button>
              <Button variant="glass" size="lg" className="w-full">
                Continue with Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-white/80">Don't have an account? </span>
              <Link
                to="/register"
                className="text-brand-gold hover:text-brand-gold-light font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Admin Link */}
        <div className="text-center mt-6">
          <Link
            to="/admin"
            className="text-white/60 hover:text-brand-gold text-sm transition-colors"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;