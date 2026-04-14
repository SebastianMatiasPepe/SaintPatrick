import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, CreditCard, Check } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { toast } from "../components/ui/use-toast";
import { authService } from "../services/authService";
import { accountService } from "../services/accountService"; // Import accountService instead of axios

export default function OpenAccountPage() {
  const [initialDeposit, setInitialDeposit] = useState(500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Use authService to check authentication and get userId
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Get userId from authService
    const userId = authService.getUserId();
    if (!userId) {
      console.error('No user ID found');
      toast({
        title: "Authentication Error",
        description: "Please log in again to continue.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setUserId(userId);
  }, [navigate]);

  const handleOpenAccount = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError("User information not available. Please log in again.");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Use accountService instead of direct axios call
      const response = await accountService.createAccount({
        usuarioId: userId,
        dineroCuenta: initialDeposit
      });
      
      setSuccess(response);
      
      toast({
        title: "Account Created Successfully",
        description: `Your new account number is ${response.cuenta.numeroCuenta}`,
      });
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account. Please try again.");
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
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Open a New Account</CardTitle>
          <CardDescription>Set up your new bank account with an initial deposit</CardDescription>
        </CardHeader>
        <form onSubmit={handleOpenAccount}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            
            {success && (
              <div className="rounded-md bg-green-100 p-4 text-green-800">
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Account Created Successfully!</h3>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Account Number:</strong> {success.cuenta.numeroCuenta}</p>
                  <p><strong>Balance:</strong> ${success.cuenta.saldo}</p>
                  <p><strong>Status:</strong> {success.cuenta.status}</p>
                  <p><strong>Created:</strong> {new Date(success.cuenta.fechaCreacion).toLocaleString()}</p>
                </div>
                <p className="mt-2 text-xs">Redirecting to dashboard...</p>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="initialDeposit">Initial Deposit</Label>
                <span className="text-xl font-bold">${initialDeposit}</span>
              </div>
              <div className="py-4">
                <Slider
                  id="initialDeposit"
                  min={100}
                  max={10000}
                  step={100}
                  value={[initialDeposit]}
                  onValueChange={(values) => setInitialDeposit(values[0])}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>$100</span>
                  <span>$10,000</span>
                </div>
              </div>
              <div className="relative mt-4">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="number"
                  min="100"
                  max="10000"
                  placeholder="500"
                  className="pl-9"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value))}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                The minimum initial deposit is $100
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading || success}>
              {loading ? "Creating Account..." : "Open New Account"}
            </Button>
            <div className="text-center text-sm">
              <Button variant="link" className="h-auto p-0" onClick={() => navigate("/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}