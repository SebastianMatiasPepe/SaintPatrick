import React from "react"
import Link from "next/link"
import { DollarSign, ArrowUpRight, ArrowDownRight, Plus, Download, Filter } from "lucide-react"

import { Button } from "../../../src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../src/components/ui/tabs"
import { Input } from "../../../src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../src/components/ui/select"

export default function AccountsPage() {
  // Sample transaction data
  const transactions = [
    {
      name: "Grocery Store",
      date: "Today, 2:30 PM",
      amount: "-$85.25",
      type: "expense",
      account: "Checking",
    },
    {
      name: "Salary Deposit",
      date: "Yesterday",
      amount: "+$3,500.00",
      type: "income",
      account: "Checking",
    },
    {
      name: "Electric Bill",
      date: "Mar 12, 2025",
      amount: "-$124.50",
      type: "expense",
      account: "Checking",
    },
    {
      name: "Interest Payment",
      date: "Mar 10, 2025",
      amount: "+$12.75",
      type: "income",
      account: "Savings",
    },
    {
      name: "Online Shopping",
      date: "Mar 10, 2025",
      amount: "-$67.99",
      type: "expense",
      account: "Checking",
    },
    {
      name: "Freelance Payment",
      date: "Mar 8, 2025",
      amount: "+$950.00",
      type: "income",
      account: "Business",
    },
    {
      name: "Office Supplies",
      date: "Mar 5, 2025",
      amount: "-$45.30",
      type: "expense",
      account: "Business",
    },
    {
      name: "Client Deposit",
      date: "Mar 3, 2025",
      amount: "+$1,200.00",
      type: "income",
      account: "Business",
    },
  ];

  return (
    <div className="space-y-6 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Accounts</h2>
          <p className="text-muted-foreground">Manage your bank accounts and view transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checking Account</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,580.00</div>
            <p className="text-xs text-muted-foreground">Account ending in 4567</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-full w-[75%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">75% of monthly budget used</p>
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
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">68% of savings goal reached</p>
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
            <div className="mt-4 h-1 w-full rounded-full bg-muted">
              <div className="h-full w-[40%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">40% of quarterly target</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all transactions across your accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="checking">Checking Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="business">Business Account</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="relative">
              <Input placeholder="Search transactions..." className="w-full sm:w-[300px]" />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
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
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.account}</span>
                    </div>
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
          <Button variant="outline" className="w-full">
            View All Transactions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}