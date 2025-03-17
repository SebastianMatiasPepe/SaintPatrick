import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Building,
  Calendar,
  CreditCard,
  DollarSign,
  History,
  Plus,
  Repeat,
  Send,
  User,
  Users,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { accountService } from "../services/accountService";
import { transferService } from "../services/transferService";
import { toast } from "../components/ui/use-toast";
import { userService } from "../services/userService";

export default function TransferPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [memo, setMemo] = useState("");
  const [transferType, setTransferType] = useState("now");
  const [transfers, setTransfers] = useState([]);
  // Add these state variables at the top with the other state declarations
  const [cards, setCards] = useState([]);
  const [fromCard, setFromCard] = useState("");
  const [toCard, setToCard] = useState("");
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [isLoadingRecipient, setIsLoadingRecipient] = useState(false);
  
  // Update the useEffect to fetch cards from accounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get the token parts from localStorage
        const token = localStorage.getItem('token');
        
        // Try to decode the token to get the user ID
        let userId = null;
        if (token) {
          try {
            const base64 = token.split('.')[1];
            const decodedToken = JSON.parse(window.atob(base64));
            userId = decodedToken.id || decodedToken.userId;
            console.log('Decoded user info:', decodedToken);
          } catch (e) {
            console.error('Error decoding token:', e);
          }
        }
        
        // If we couldn't get userId from token, use a default for testing
        if (!userId) {
          console.log('Could not get userId from token, using default ID');
          userId = 14; // Use default ID for testing
        }
        
        // Fetch user data with accounts
        const userData = await userService.getUserById(userId);
        const userAccounts = userData?.usuario?.cuentaId || [];
        setAccounts(userAccounts);
        
        if (userAccounts.length > 0) {
          setFromAccount(userAccounts[0].id.toString());
          if (userAccounts.length > 1) {
            setToAccount(userAccounts[1].id.toString());
          }
        }
        
        // For now, we'll use an empty array for transfers
        // This will be replaced with actual API call when available
        setTransfers([]);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Add a function to look up recipient card info
  const lookupRecipient = async (cardNumber) => {
    if (!cardNumber) return;
    
    try {
      setIsLoadingRecipient(true);
      const data = await transferService.getCardOwner(cardNumber);
      setRecipientInfo(data);
      setIsLoadingRecipient(false);
    } catch (err) {
      console.error("Error looking up recipient:", err);
      setRecipientInfo(null);
      setIsLoadingRecipient(false);
    }
  };
  
  // Update the handleTransfer function to use account IDs instead of card numbers
  const handleTransfer = async () => {
    if (!fromAccount || !toAccount || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // Find the selected accounts
      const sourceAccount = accounts.find(acc => acc.id.toString() === fromAccount);
      const destinationAccount = accounts.find(acc => acc.id.toString() === toAccount);
      
      if (!sourceAccount || !destinationAccount) {
        toast({
          title: "Error",
          description: "Selected accounts not found",
          variant: "destructive",
        });
        return;
      }
      
      // Check if source account has a card
      if (!sourceAccount.tarjeta || sourceAccount.tarjeta.length === 0) {
        toast({
          title: "Error",
          description: "Source account does not have a card for transfer",
          variant: "destructive",
        });
        return;
      }
      
      // Check if destination account has a card
      if (!destinationAccount.tarjeta || destinationAccount.tarjeta.length === 0) {
        toast({
          title: "Error",
          description: "Destination account does not have a card for transfer",
          variant: "destructive",
        });
        return;
      }
      
      // Use the first card from each account
      const sourceCard = sourceAccount.tarjeta[0];
      const destinationCard = destinationAccount.tarjeta[0];
      
      const transferData = {
        fromCardNumber: sourceCard.numeroTarjeta,
        toCardNumber: destinationCard.numeroTarjeta,
        amount: parseFloat(amount)
      };
  
      const result = await transferService.transferBetweenAccounts(transferData);
      
      toast({
        title: "Success",
        description: result.mensaje || "Transfer completed successfully",
      });
      
      // Reset form
      setAmount("");
      setMemo("");
      
      // Refresh accounts and transfers
      const accountsData = await accountService.getAccounts();
      setAccounts(accountsData);
      
      const transfersData = await transferService.getTransferHistory();
      setTransfers(transfersData);
      
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // Add these new state variables with the other state declarations
  const [recipientCardNumber, setRecipientCardNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  
  // Add this function to handle external transfers
  const handleExternalTransfer = async () => {
    if (!fromAccount || !recipientCardNumber || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // Find the selected source account
      const sourceAccount = accounts.find(acc => acc.id.toString() === fromAccount);
      
      if (!sourceAccount) {
        toast({
          title: "Error",
          description: "Source account not found",
          variant: "destructive",
        });
        return;
      }
      
      // Check if source account has a card
      if (!sourceAccount.tarjeta || sourceAccount.tarjeta.length === 0) {
        toast({
          title: "Error",
          description: "Source account does not have a card for transfer",
          variant: "destructive",
        });
        return;
      }
      
      // Use the first card from source account
      const sourceCard = sourceAccount.tarjeta[0];
      
      const transferData = {
        fromCardNumber: sourceCard.numeroTarjeta,
        toCardNumber: recipientCardNumber,
        amount: parseFloat(amount)
      };
  
      const result = await transferService.transferBetweenAccounts(transferData);
      
      toast({
        title: "Success",
        description: result.mensaje || "Transfer completed successfully",
      });
      
      // Reset form
      setAmount("");
      setMemo("");
      setRecipientCardNumber("");
      setRecipientName("");
      
      // Refresh data
      const userData = await userService.getUserById(14); // Use your actual user ID here
      const userAccounts = userData?.usuario?.cuentaId || [];
      setAccounts(userAccounts);
      
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };
  
  // Add this function to look up recipient by card number
  const lookupRecipientByCard = async () => {
    if (!recipientCardNumber) {
      setRecipientName("");
      return;
    }
    
    try {
      setIsLoadingRecipient(true);
      const data = await transferService.getCardOwner(recipientCardNumber);
      setRecipientName(data.titular || "Unknown");
      setIsLoadingRecipient(false);
    } catch (err) {
      console.error("Error looking up recipient:", err);
      setRecipientName("");
      setIsLoadingRecipient(false);
      
      toast({
        title: "Warning",
        description: "Could not verify recipient card. Please check the card number.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transfer Money</h1>
          <p className="text-muted-foreground">Send money to your accounts or others</p>
        </div>
        <Button variant="outline">
          <History className="mr-2 h-4 w-4" />
          Transfer History
        </Button>
      </div>

      <Tabs defaultValue="between-accounts" className="space-y-4">

        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="between-accounts">Between Accounts</TabsTrigger>
          <TabsTrigger value="to-someone">To Someone</TabsTrigger>
        </TabsList>
        
        <TabsContent value="between-accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Between Your Accounts</CardTitle>
              <CardDescription>Move money between your accounts instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <Select 
                    value={fromAccount} 
                    onValueChange={setFromAccount}
                  >
                    <SelectTrigger id="from-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map(account => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          Account {account.numerocuenta} - ${parseFloat(account.dineroCuenta || 0).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-account">To Account</Label>
                  <Select 
                    value={toAccount} 
                    onValueChange={setToAccount}
                  >
                    <SelectTrigger id="to-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map(account => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          Account {account.numerocuenta} - ${parseFloat(account.dineroCuenta || 0).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="amount"
                    placeholder="0.00"
                    className="pl-9"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Input 
                  id="memo" 
                  placeholder="Add a note" 
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>When</Label>
                <RadioGroup 
                  value={transferType}
                  onValueChange={setTransferType}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now" className="font-normal">Transfer now</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="font-normal">Schedule for later</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleTransfer}>
                <Send className="mr-2 h-4 w-4" />
                Transfer Money
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
              <CardDescription>Your recent account transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transfers && transfers.length > 0 ? (
                  transfers.slice(0, 3).map((transfer) => (
                    <div key={transfer.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Repeat className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transfer.descripcion || transfer.description || 'Transfer'}</p>
                          <p className="text-xs text-muted-foreground">{new Date(transfer.fecha || transfer.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">${parseFloat(transfer.monto || transfer.amount || 0).toFixed(2)}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">No recent transfers</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs implementation would go here */}
        <TabsContent value="to-someone" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transfer to Someone</CardTitle>
              <CardDescription>Send money to another person's account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-account-external">From Account</Label>
                <Select 
                  value={fromAccount} 
                  onValueChange={setFromAccount}
                >
                  <SelectTrigger id="from-account-external">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(account => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        Account {account.numerocuenta} - ${parseFloat(account.dineroCuenta || 0).toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipient-card">Recipient Card Number</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="recipient-card"
                      placeholder="Enter card number"
                      className="pl-9"
                      value={recipientCardNumber}
                      onChange={(e) => setRecipientCardNumber(e.target.value)}
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={lookupRecipientByCard}>
                    Verify
                  </Button>
                </div>
                {isLoadingRecipient && <p className="text-xs text-muted-foreground mt-1">Looking up recipient...</p>}
                {recipientName && (
                  <p className="text-xs text-green-600 mt-1">Recipient: {recipientName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount-external">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="amount-external"
                    placeholder="0.00"
                    className="pl-9"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="memo-external">Memo (Optional)</Label>
                <Input 
                  id="memo-external" 
                  placeholder="Add a note" 
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>When</Label>
                <RadioGroup 
                  value={transferType}
                  onValueChange={setTransferType}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now-external" />
                    <Label htmlFor="now-external" className="font-normal">Transfer now</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled-external" />
                    <Label htmlFor="scheduled-external" className="font-normal">Schedule for later</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleExternalTransfer}>
                <Send className="mr-2 h-4 w-4" />
                Transfer Money
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent External Transfers</CardTitle>
              <CardDescription>Your recent transfers to other people</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transfers && transfers.length > 0 ? (
                  transfers
                    .filter(t => t.isExternal)
                    .slice(0, 3)
                    .map((transfer) => (
                      <div key={transfer.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transfer.descripcion || transfer.description || 'Transfer'}</p>
                            <p className="text-xs text-muted-foreground">{new Date(transfer.fecha || transfer.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">${parseFloat(transfer.monto || transfer.amount || 0).toFixed(2)}</div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">No recent external transfers</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="to-external" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>External Bank Transfer</CardTitle>
              <CardDescription>Send money to accounts at other banks</CardDescription>
            </CardHeader>
            <CardContent className="py-4 text-center">
              <p className="text-muted-foreground">External bank transfer functionality coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Transfers</CardTitle>
              <CardDescription>Set up recurring or future-dated transfers</CardDescription>
            </CardHeader>
            <CardContent className="py-4 text-center">
              <p className="text-muted-foreground">Scheduled transfers functionality coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
    </div>
  );
}