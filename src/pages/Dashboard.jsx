import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  Plus,
  Search,
  Bell,
  User,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { accountService } from "../services/accountService";
import { transactionService } from "../services/transactionService";
// Import the userService at the top of the file
import { userService } from "../services/userService";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  // Update the useEffect hook to fetch user data
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
            const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(window.atob(base64));
            userId = decodedToken.id;
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
        
        // Fetch user data with the new endpoint
        const userDataResponse = await userService.getUserById(userId);
        setUserData(userDataResponse);
        
        // Extract accounts from user data
        const userAccounts = userDataResponse?.usuario?.cuentaId || [];
        setAccounts(userAccounts);
        
        // Calculate total balance from all accounts
        const total = userAccounts.reduce((sum, account) => sum + (parseFloat(account.dineroCuenta) || 0), 0);
        setTotalBalance(total);
        
        // Extract all transactions (both origin and destination)
        let allTransactions = [];
        userAccounts.forEach(account => {
          if (account.transaccionesOrigen) {
            allTransactions = [...allTransactions, ...account.transaccionesOrigen];
          }
          if (account.transaccionesDestino) {
            allTransactions = [...allTransactions, ...account.transaccionesDestino];
          }
        });
        
        // Remove duplicates (transactions that appear in both origin and destination)
        const uniqueTransactions = Array.from(new Map(allTransactions.map(item => [item.id, item])).values());
        setTransactions(uniqueTransactions);
        
        // Calculate income and expenses
        let totalIncome = 0;
        let totalExpenses = 0;
        
        uniqueTransactions.forEach(transaction => {
          // Check if this is an incoming transaction (destination is user's account)
          const isIncoming = userAccounts.some(account => account.id === transaction.cuentaDestinoId);
          
          // Check if this is an outgoing transaction (origin is user's account)
          const isOutgoing = userAccounts.some(account => account.id === transaction.cuentaOrigenId);
          
          // If it's a self-transfer, don't count it as income or expense
          if (isIncoming && isOutgoing) {
            return;
          }
          
          if (isIncoming && !isOutgoing) {
            totalIncome += parseFloat(transaction.monto) || 0;
          } else if (isOutgoing && !isIncoming) {
            totalExpenses += parseFloat(transaction.monto) || 0;
          }
        });
        
        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load data");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div className="flex-1 p-8">Loading...</div>;
  if (error) return <div className="flex-1 p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-bold">Dashboard</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard/accounts" className="text-sm font-medium hover:text-primary">
                Accounts
              </Link>
              <Link to="/dashboard/transfer" className="text-sm font-medium hover:text-primary">
                Transfers
              </Link>
              <Link to="/dashboard/payments" className="text-sm font-medium hover:text-primary">
                Payments
              </Link>
              <Link to="/dashboard/cards" className="text-sm font-medium hover:text-primary">
                Cards
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[200px] lg:w-[300px]" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        // Update the New Transaction button in the Dashboard header
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {userData?.usuario?.name ? `Welcome, ${userData.usuario.name}` : 'Dashboard'}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Transaction History
            </Button>
            <Button size="sm" asChild>
              <Link to="/transfer">
                <Plus className="mr-2 h-4 w-4" />
                New Transaction
              </Link>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalBalance.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Across all accounts</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Income</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${income.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                  <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${expenses.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Investments</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$0.00</div>
                  <p className="text-xs text-muted-foreground">No investments yet</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {transactions && transactions.length > 0 ? (
                      transactions.slice(0, 4).map((transaction, index) => (
                        <div key={transaction.id || index} className="flex items-center">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {transaction.tipo || 'Transaction'} 
                              {transaction.estado && ` - ${transaction.estado}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              From Account: {accounts.find(a => a.id === transaction.cuentaOrigenId)?.numerocuenta || 'Unknown'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              To Account: {accounts.find(a => a.id === transaction.cuentaDestinoId)?.numerocuenta || 'Unknown'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.fecha).toLocaleDateString()} {new Date(transaction.fecha).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className={`ml-auto font-medium ${
                            accounts.some(a => a.id === transaction.cuentaDestinoId) && 
                            (!accounts.some(a => a.id === transaction.cuentaOrigenId) || 
                             transaction.cuentaDestinoId === transaction.cuentaOrigenId)
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {accounts.some(a => a.id === transaction.cuentaDestinoId) && 
                             !accounts.some(a => a.id === transaction.cuentaOrigenId)
                              ? '+' 
                              : accounts.some(a => a.id === transaction.cuentaOrigenId) &&
                                !accounts.some(a => a.id === transaction.cuentaDestinoId)
                                ? '-' 
                                : ''}
                            ${Math.abs(parseFloat(transaction.monto || 0)).toFixed(2)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">No transactions found</div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span className="text-sm">Housing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">$1,200.00</span>
                        <span className="text-xs text-muted-foreground">32%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Food</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">$750.00</span>
                        <span className="text-xs text-muted-foreground">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Transportation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">$450.00</span>
                        <span className="text-xs text-muted-foreground">12%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Entertainment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">$380.00</span>
                        <span className="text-xs text-muted-foreground">10%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">Other</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">$970.25</span>
                        <span className="text-xs text-muted-foreground">26%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="accounts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {accounts && accounts.length > 0 ? (
                accounts.map((account, index) => (
                  <Card key={account.id || index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Account
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${parseFloat(account.dineroCuenta || 0).toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground">
                        Account: {account.numerocuenta || "N/A"}
                      </p>
                      {account.usuario && (
                        <p className="text-xs text-muted-foreground">
                          Owner: {account.usuario.nombre || account.usuario.name || "Unknown"}
                        </p>
                      )}
                      {account.estado && (
                        <p className={`text-xs ${account.estado === 'ACTIVO' ? 'text-green-600' : 'text-red-600'}`}>
                          Status: {account.estado}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full">
                  <CardContent className="py-4 text-center">
                    <p className="text-muted-foreground">No accounts found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="cards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {accounts && accounts.length > 0 ? (
                accounts.filter(account => account.tarjeta && account.tarjeta.length > 0)
                  .flatMap((account) => 
                    account.tarjeta.map((card, cardIndex) => (
                      <Card key={`card-${account.id}-${cardIndex}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Card
                          </CardTitle>
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ${parseFloat(card.dineroTarjeta || 0).toFixed(2)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Card number: {card.numeroTarjeta || "Unknown"}
                          </p>
                          {card.created_at && (
                            <p className="text-xs text-muted-foreground">
                              Created: {new Date(card.created_at).toLocaleDateString()}
                            </p>
                          )}
                          {card.status && (
                            <p className={`text-xs ${card.status === 'ACTIVO' ? 'text-green-600' : 'text-red-600'}`}>
                              Status: {card.status}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )
              ) : (
                <Card className="col-span-full">
                  <CardContent className="py-4 text-center">
                    <p className="text-muted-foreground">No cards found</p>
                  </CardContent>
                </Card>
              )}
              {accounts && accounts.length > 0 && 
               !accounts.some(account => account.tarjetas && account.tarjetas.length > 0) && (
                <Card className="col-span-full">
                  <CardContent className="py-4 text-center">
                    <p className="text-muted-foreground">No cards found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="investments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stock Portfolio</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,350.00</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Retirement</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,230.00</div>
                  <p className="text-xs text-muted-foreground">+5.3% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );}
