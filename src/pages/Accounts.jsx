import React, { useState, useEffect } from "react";
import { ArrowUpRight, ChevronRight, CreditCard, DollarSign, Download, Eye, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { accountService } from "../services/accountService";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const data = await accountService.getAccounts();
        setAccounts(data);
        
        // Calculate total balance
        const total = data.reduce((sum, account) => sum + account.balance, 0);
        setTotalBalance(total);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAccounts();
  }, []);

  if (loading) return <div className="flex-1 p-8">Loading...</div>;
  if (error) return <div className="flex-1 p-8 text-red-500">Error: {error}</div>;

  // Group accounts by type
  const checkingAccounts = accounts.filter(account => account.type === 'checking');
  const savingsAccounts = accounts.filter(account => account.type === 'savings');
  const creditCards = accounts.filter(account => account.type === 'credit');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">Manage your bank accounts and view transactions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="space-y-4">
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
          {checkingAccounts.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Checking</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${checkingAccounts.reduce((sum, acc) => sum + acc.balance, 0).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Account ending in {checkingAccounts[0].accountNumber.slice(-4)}</p>
              </CardContent>
            </Card>
          )}
          {savingsAccounts.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${savingsAccounts.reduce((sum, acc) => sum + acc.balance, 0).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Account ending in {savingsAccounts[0].accountNumber.slice(-4)}</p>
              </CardContent>
            </Card>
          )}
          {creditCards.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${creditCards.reduce((sum, acc) => sum + acc.balance, 0).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Balance due in 15 days</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Accounts</TabsTrigger>
              <TabsTrigger value="checking">Checking</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="credit">Credit Cards</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </div>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Accounts</CardTitle>
                <CardDescription>View all your bank accounts and their details.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>{account.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{account.type.charAt(0).toUpperCase() + account.type.slice(1)}</TableCell>
                        <TableCell>${account.balance.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View transactions</DropdownMenuItem>
                                <DropdownMenuItem>Transfer money</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Account details</DropdownMenuItem>
                                <DropdownMenuItem>Close account</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Similar implementation for other tabs */}
        </Tabs>
      </div>
    </div>
  );
}