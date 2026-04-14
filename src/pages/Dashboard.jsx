import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  LogOut,
  PlusCircle // Add PlusCircle here
} from "lucide-react";

// Remove this duplicate import
// import { PlusCircle } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { accountService } from "../services/accountService";
import { transactionService } from "../services/transactionService";
import { userService } from "../services/userService";
import { authService } from "../services/authService"; // Import authService
import { toast } from "../components/ui/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const navigate = useNavigate();

  const [transactionFilter, setTransactionFilter] = useState("all");
                    const [accountFilter, setAccountFilter] = useState("");
                    const [cardFilter, setCardFilter] = useState("");
                    const [filteredTransactions, setFilteredTransactions] = useState([]);
                    const [currentPage, setCurrentPage] = useState(1);
                    const [totalPages, setTotalPages] = useState(1);
                    const itemsPerPage = 10;
                    
                    // Add this useEffect to handle filtering transactions
                    useEffect(() => {
                      if (!transactions || !transactions.length) return;
                      
                      let filtered = [...transactions];
                      
                      // Filter by account if selected
                      if (accountFilter) {
                        filtered = filtered.filter(
                          t => t.cuentaOrigenId === parseInt(accountFilter) || 
                               t.cuentaDestinoId === parseInt(accountFilter)
                        );
                      }
                      
                      // Filter by card if selected
                      if (cardFilter) {
                        // Assuming transactions have a tarjetaId field
                        filtered = filtered.filter(t => t.tarjetaId === parseInt(cardFilter));
                      }
                      
                      // Sort by date (newest first)
                      filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                      
                      setFilteredTransactions(filtered);
                      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
                      setCurrentPage(1); // Reset to first page when filters change
                    }, [transactions, accountFilter, cardFilter]);
                    
                    

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
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
        
        // Fetch user data
        const userData = await userService.getUserById(userId);
        setUserData(userData);
        
        // Extract accounts from user data
        const userAccounts = userData?.usuario?.cuentaId || [];
        setAccounts(userAccounts);
        
        // Calculate total balance
        const total = userAccounts.reduce((sum, account) => sum + parseFloat(account.dineroCuenta || 0), 0);
        setTotalBalance(total);
        
        // For now, we'll use placeholder values for income and expenses
        setIncome(1250.00);
        setExpenses(450.00);
        
        // Fetch all transactions for the user
        try {
          // We'll use the first account ID to fetch all transactions
          // The API should return all transactions for the user
          if (userAccounts.length > 0) {
            const transactionsData = await transactionService.getTransactionsByAccountId(userData.usuario.id);
            
            // Combine all transactions from all accounts
            let allTransactions = [];
            
            // Add transactions from the API response
            if (transactionsData && Array.isArray(transactionsData)) {
              allTransactions = [...transactionsData];
            }
            
            // Also add transactions from account objects if available
            userAccounts.forEach(account => {
              if (account.transaccionesOrigen && Array.isArray(account.transaccionesOrigen)) {
                allTransactions = [...allTransactions, ...account.transaccionesOrigen];
              }
              if (account.transaccionesDestino && Array.isArray(account.transaccionesDestino)) {
                allTransactions = [...allTransactions, ...account.transaccionesDestino];
              }
            });
            
            // Remove duplicates
            const uniqueTransactions = Array.from(
              new Map(allTransactions.map(item => [item.id, item])).values()
            );
            
            setTransactions(uniqueTransactions);
            setFilteredTransactions(uniqueTransactions);
            setTotalPages(Math.ceil(uniqueTransactions.length / itemsPerPage));
          }
        } catch (err) {
          console.log('Could not fetch transactions:', err);
          setTransactions([]);
          setFilteredTransactions([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.message || 'An error occurred while loading dashboard data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  // Add this useEffect to handle filtering transactions
  useEffect(() => {
    if (!transactions || !transactions.length) return;
    
    let filtered = [...transactions];
    
    // Filter by account if selected
    if (accountFilter) {
      filtered = filtered.filter(
        t => t.cuentaOrigenId === parseInt(accountFilter) || 
             t.cuentaDestinoId === parseInt(accountFilter)
      );
    }
    
    // Filter by card if selected
    if (cardFilter) {
      // Assuming transactions have a tarjetaId field
      filtered = filtered.filter(t => t.tarjetaId === parseInt(cardFilter));
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    setFilteredTransactions(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [transactions, accountFilter, cardFilter]);

  // Function to get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTransactions.slice(startIndex, endIndex);
  };
  

  const handleLogout = () => {
    try {
      // Use authService for logout
      authService.logout();
      // Redirect to login page
      navigate('/login');
      // Show toast
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Force navigation even if there was an error
      window.location.href = '/login';
    }
  };

  if (loading) return <div className="flex-1 p-8">Loading dashboard data...</div>;
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
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="hover:bg-red-100 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            {userData?.usuario?.name ? `Welcome, ${userData.usuario.name}` : 'Dashboard'}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Transaction History
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/open-account">
                <PlusCircle className="mr-2 h-4 w-4" />
                Open New Account
              </Link>
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
            <TabsTrigger value="investments">Transactions</TabsTrigger>
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
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Income</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${income.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +10.5% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                  <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${expenses.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    -5.2% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{accounts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {accounts.length > 0 ? '+1 account' : 'No change'} since last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-8">
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
                              Transaction #{transaction.id}
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
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Your Cards</h2>
                        <Button asChild>
                          <Link to="/add-card">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Card
                          </Link>
                        </Button>
                      </div>
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
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold">Transaction History</h2>
                          <div className="flex space-x-2">
                            <Select value={accountFilter} onValueChange={setAccountFilter}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Account" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">All Accounts</SelectItem>
                                {accounts.map(account => (
                                  <SelectItem key={account.id} value={account.id.toString()}>
                                    {account.numerocuenta || account.numeroCuenta}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Select value={cardFilter} onValueChange={setCardFilter}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Card" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">All Cards</SelectItem>
                                {accounts.flatMap(account => 
                                  (account.tarjeta || []).map(card => (
                                    <SelectItem key={card.id} value={card.id.toString()}>
                                      Card ending in {card.numeroTarjeta?.slice(-4) || 'XXXX'}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Transactions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {filteredTransactions.length > 0 ? (
                              <div className="space-y-6">
                                <div className="rounded-md border">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b bg-muted/50 font-medium">
                                        <th className="py-3 px-4 text-left">Date</th>
                                        <th className="py-3 px-4 text-left">Description</th>
                                        <th className="py-3 px-4 text-left">From</th>
                                        <th className="py-3 px-4 text-left">To</th>
                                        <th className="py-3 px-4 text-right">Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {getCurrentPageItems().map((transaction, index) => {
                                        const fromAccount = accounts.find(a => a.id === transaction.cuentaOrigenId);
                                        const toAccount = accounts.find(a => a.id === transaction.cuentaDestinoId);
                                        const isIncoming = accounts.some(a => a.id === transaction.cuentaDestinoId);
                                        const isOutgoing = accounts.some(a => a.id === transaction.cuentaOrigenId);
                                        
                                        return (
                                          <tr key={transaction.id || index} className="border-b">
                                            <td className="py-3 px-4">
                                              {new Date(transaction.fecha).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                              Transaction #{transaction.id}
                                              {transaction.tipo && ` - ${transaction.tipo}`}
                                            </td>
                                            <td className="py-3 px-4">
                                              {fromAccount ? 
                                                `Account ${fromAccount.numerocuenta || fromAccount.numeroCuenta}` : 
                                                'External Account'}
                                            </td>
                                            <td className="py-3 px-4">
                                              {toAccount ? 
                                                `Account ${toAccount.numerocuenta || toAccount.numeroCuenta}` : 
                                                'External Account'}
                                            </td>
                                            <td className={`py-3 px-4 text-right font-medium ${
                                              isIncoming && !isOutgoing ? 'text-green-600' : 
                                              isOutgoing && !isIncoming ? 'text-red-600' : ''
                                            }`}>
                                              {isIncoming && !isOutgoing ? '+' : 
                                              isOutgoing && !isIncoming ? '-' : ''}
                                              ${parseFloat(transaction.monto || 0).toFixed(2)}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                                
                                <Pagination>
                                  <PaginationContent>
                                    <PaginationItem>
                                      <PaginationPrevious 
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                      />
                                    </PaginationItem>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                      .filter(page => 
                                        page === 1 || 
                                        page === totalPages || 
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                      )
                                      .map((page, i, array) => {
                                        // Add ellipsis if there are gaps
                                        if (i > 0 && array[i - 1] !== page - 1) {
                                          return (
                                            <React.Fragment key={`ellipsis-${page}`}>
                                              <PaginationItem>
                                                <PaginationEllipsis />
                                              </PaginationItem>
                                              <PaginationItem>
                                                <PaginationLink
                                                  isActive={page === currentPage}
                                                  onClick={() => setCurrentPage(page)}
                                                >
                                                  {page}
                                                </PaginationLink>
                                              </PaginationItem>
                                            </React.Fragment>
                                          );
                                        }
                                        
                                        return (
                                          <PaginationItem key={page}>
                                            <PaginationLink
                                              isActive={page === currentPage}
                                              onClick={() => setCurrentPage(page)}
                                            >
                                              {page}
                                            </PaginationLink>
                                          </PaginationItem>
                                        );
                                      })}
                                    
                                    <PaginationItem>
                                      <PaginationNext 
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                      />
                                    </PaginationItem>
                                  </PaginationContent>
                                </Pagination>
                              </div>
                            ) : (
                              <div className="text-center py-10">
                                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-medium">No transactions found</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  {accountFilter || cardFilter ? 
                                    "Try changing your filters to see more transactions." : 
                                    "You don't have any transactions yet."}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
        </Tabs>
      </main>
    </div>
  );}
