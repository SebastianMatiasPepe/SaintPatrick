import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Check } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "../components/ui/use-toast";
import { authService } from "../services/authService";
import { accountService } from "../services/accountService";
import { cardService } from "../services/cardService";
import { userService } from "../services/userService";

export default function AddCardPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [cvv, setCvv] = useState("");
  const [initialAmount, setInitialAmount] = useState(1000);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
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
        
        // Fetch user data to get accounts
        const userData = await userService.getUserById(userId);
        
        // Access accounts correctly from the nested structure
        const userAccounts = userData?.usuario?.cuentaId || [];
        setAccounts(userAccounts);
        
        // Set first account as default if available
        if (userAccounts.length > 0) {
          setSelectedAccount(userAccounts[0].id.toString());
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
        setError("Failed to load accounts. Please try again.");
      }
    };
    
    fetchAccounts();
  }, [navigate]);

  const generateRandomCardNumber = () => {
    let cardNum = "";
    for (let i = 0; i < 16; i++) {
      cardNum += Math.floor(Math.random() * 10).toString();
    }
    setCardNumber(cardNum);
  };

  const generateRandomCVV = () => {
    let cvvNum = "";
    for (let i = 0; i < 3; i++) {
      cvvNum += Math.floor(Math.random() * 10).toString();
    }
    setCvv(cvvNum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAccount) {
      setError("Please select an account for this card.");
      return;
    }
    
    if (cardNumber.length !== 16) {
      setError("Card number must be 16 digits.");
      return;
    }
    
    if (pin.length !== 4) {
      setError("PIN must be 4 digits.");
      return;
    }
    
    if (cvv.length !== 3) {
      setError("CVV must be 3 digits.");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const cardData = {
        numeroTarjeta: cardNumber,
        pin: pin,
        dineroTarjeta: parseFloat(initialAmount),
        cv: cvv,
        cuentaId: parseInt(selectedAccount)
      };
      
      const response = await cardService.createCard(cardData);
      setSuccess(response);
      
      toast({
        title: "Card Created Successfully",
        description: `Your new card number is ${response.tarjeta.numeroTarjeta}`,
      });
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create card. Please try again.");
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
          <CardTitle className="text-2xl">Add a New Card</CardTitle>
          <CardDescription>Link a new credit card to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
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
                  <h3 className="font-medium">Card Created Successfully!</h3>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p><strong>Card Number:</strong> {success.tarjeta.numeroTarjeta}</p>
                  <p><strong>CVV:</strong> {success.tarjeta.cv}</p>
                  <p><strong>Balance:</strong> ${success.tarjeta.dineroTarjeta}</p>
                  <p><strong>Status:</strong> {success.tarjeta.status || "Active"}</p>
                </div>
                <p className="mt-2 text-xs">Redirecting to dashboard...</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="account">Select Account</Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      Account {account.numerocuenta || account.numeroCuenta} (${parseFloat(account.dineroCuenta).toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={generateRandomCardNumber}
                >
                  Generate
                </Button>
              </div>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                maxLength={16}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pin">PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="1234"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cvv">CVV</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={generateRandomCVV}
                  >
                    Generate
                  </Button>
                </div>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  maxLength={3}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="initialAmount">Initial Amount</Label>
              <Input
                id="initialAmount"
                type="number"
                min="0"
                step="100"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading || success}>
              {loading ? "Creating Card..." : "Add New Card"}
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