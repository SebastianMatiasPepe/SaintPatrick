import React from "react"
import Link from "next/link"
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Clock,
  Plus,
  Search,
  Bell,
  User,
} from "lucide-react"

import { Button } from "../../src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card"
import { Input } from "../../src/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/ui/tabs"

export default function Dashboard() {
  // Sample transaction data
  const transactions = [
    {
      name: "Grocery Store",
      date: "Today, 2:30 PM",
      amount: "-$85.25",
      type: "expense",
    },
    {
      name: "Salary Deposit",
      date: "Yesterday",
      amount: "+$3,500.00",
      type: "income",
    },
    {
      name: "Electric Bill",
      date: "Mar 12, 2025",
      amount: "-$124.50",
      type: "expense",
    },
    {
      name: "Online Shopping",
      date: "Mar 10, 2025",
      amount: "-$67.99",
      type: "expense",
    },
    {
      name: "Freelance Payment",
      date: "Mar 8, 2025",
      amount: "+$950.00",
      type: "income",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-bold">Dashboard</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard/accounts" className="text-sm font-medium hover:text-primary">
                Accounts
              </Link>
              <Link href="/dashboard/transfer" className="text-sm font-medium hover:text-primary">
                Transfers
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                Payments
              </Link>
              <Link href="/dashboard/cards" className="text-sm font-medium hover:text-primary">
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Transaction History
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Transaction
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
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Income</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$7,350.00</div>
                  <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                  <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,850.25</div>
                  <p className="text-xs text-muted-foreground">-5.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[68%] rounded-full bg-primary" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">$6,800 of $10,000 goal</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted" />
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Spending Categories</CardTitle>
                  <CardDescription>Your spending breakdown for the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-center rounded-full bg-muted/30 p-6">
                      <PieChart className="h-16 w-16 text-muted" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span>Housing (35%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        <span>Food (25%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span>Transport (15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <span>Entertainment (10%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span>Other (15%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your recent transactions across all accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <ArrowUpRight className="h-5 w-5 text-green-600" />
                            ) : (
                              <ArrowDownRight className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transaction.name}</p>
                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                            {transaction.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bills</CardTitle>
                  <CardDescription>Your upcoming bills and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Rent</p>
                        <p className="text-xs text-muted-foreground">Due in 5 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$1,200.00</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Internet</p>
                        <p className="text-xs text-muted-foreground">Due in 7 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$59.99</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Credit Card</p>
                        <p className="text-xs text-muted-foreground">Due in 12 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$350.00</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Phone Bill</p>
                        <p className="text-xs text-muted-foreground">Due in 15 days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$85.00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Bills
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="accounts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Checking Account</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,580.00</div>
                  <p className="text-xs text-muted-foreground">Account ending in 4567</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Transfer
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Account</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$25,350.75</div>
                  <p className="text-xs text-muted-foreground">Account ending in 7890</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Transfer
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Business Account</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,320.00</div>
                  <p className="text-xs text-muted-foreground">Account ending in 2345</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Transfer
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="cards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,450.25</div>
                  <p className="text-xs text-muted-foreground">Balance • Card ending in 1234</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Pay Balance
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Debit Card</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Active</div>
                  <p className="text-xs text-muted-foreground">Card ending in 5678</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Manage Card
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Business Credit Card</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$7,890.50</div>
                  <p className="text-xs text-muted-foreground">Balance • Card ending in 9012</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Pay Balance
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="investments" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Investment Portfolio</CardTitle>
                  <CardDescription>Your investment performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted" />
                  </div>
                </CardContent>
              </Card>
              <Card className="row-span-2">
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Your current investment mix</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center justify-center rounded-full bg-muted/30 p-6">
                      <PieChart className="h-16 w-16 text-muted" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span>Stocks (45%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                        <span>Bonds (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span>Real Estate (15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <span>Cash (10%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Investment Accounts</CardTitle>
                  <CardDescription>Your investment account balances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Retirement Account (401k)</p>
                        <p className="text-xs text-muted-foreground">+12.5% YTD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$145,890.00</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Brokerage Account</p>
                        <p className="text-xs text-muted-foreground">+8.3% YTD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$78,350.25</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">IRA</p>
                        <p className="text-xs text-muted-foreground">+10.1% YTD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$52,720.75</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Investments
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t bg-background p-4 text-center text-sm text-muted-foreground">
        <p>© 2025 SecureBank. All rights reserved.</p>
      </footer>
    </div>
  )
}