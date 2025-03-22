import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Save, Loader2 } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "../components/ui/use-toast";
import { authService } from "../services/authService";
import { userService } from "../services/userService";

export default function SettingsPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check authentication
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }
        
        // Get userId
        const userId = authService.getUserId();
        if (!userId) {
          toast({
            title: "Authentication Error",
            description: "Please log in again to continue.",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }
        
        // Fetch user data
        const response = await userService.getUserById(userId);
        const user = response.usuario;
        
        if (user) {
          setUserData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            location: user.location || ""
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again.");
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      
      const userId = authService.getUserId();
      
      // Update user data
      await userService.updateUser(userId, userData);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setSaving(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Account Settings</CardTitle>
            </div>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  placeholder="New York, USA"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}