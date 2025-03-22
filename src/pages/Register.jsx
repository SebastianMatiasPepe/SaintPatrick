import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Lock, Mail, User, Phone, MapPin } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { authService } from "../services/authService";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationString = `{${position.coords.latitude},${position.coords.longitude}}`;
          setLocation(locationString);
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("{0,0}"); // Default location if error
          setLocationLoading(false);
        }
      );
    } else {
      setLocation("{0,0}"); // Default location if geolocation not supported
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !cedula || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create user data object with the required format
      const userData = {
        name,
        cedula,
        email,
        phone,
        password,
        location: location || "{0,0}"
      };
      
      await authService.register(userData);
      navigate("/login", { state: { message: "Registration successful. Please log in." } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-2">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cedula">ID Number (Cédula)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="cedula"
                  placeholder="1234567890"
                  className="pl-9"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="9876543210"
                  className="pl-9"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-9"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center">
                Location
                {locationLoading && <span className="ml-2 text-xs text-muted-foreground">(Getting location...)</span>}
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Location coordinates"
                  className="pl-9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={locationLoading}
                />
              </div>
              <p className="text-xs text-muted-foreground">Your location will be used for security purposes</p>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading || locationLoading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Button variant="link" className="h-auto p-0" onClick={() => navigate("/login")}>
                Sign in
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}