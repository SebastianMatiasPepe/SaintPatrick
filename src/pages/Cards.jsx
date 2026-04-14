import React from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  DollarSign,
  Shield,
  AlertCircle,
  Plus,
  Settings,
  ChevronRight,
  MoreHorizontal,
  Lock,
  Unlock,
  RefreshCw,
} from "lucide-react";

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
import { Progress } from "../components/ui/progress";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function CardsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cards</h1>
          <p className="text-muted-foreground">Manage your credit and debit cards</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Card
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Cards</TabsTrigger>
          <TabsTrigger value="credit">Credit Cards</TabsTrigger>
          <TabsTrigger value="debit">Debit Cards</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Platinum Credit Card</span>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Visa ending in 8765</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold">$2,345.00</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-lg font-medium">$10,000.00</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credit Used</span>
                    <span>23.45%</span>
                  </div>
                  <Progress value={23.45} className="h-2" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Due</span>
                    <span className="font-medium">May 15, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Minimum Payment</span>
                    <span className="font-medium">$70.35</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Make Payment</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Cash Rewards Credit Card</span>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Visa ending in 3421</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold">$1,250.75</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-lg font-medium">$7,500.00</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credit Used</span>
                    <span>16.68%</span>
                  </div>
                  <Progress value={16.68} className="h-2" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Payment Due</span>
                    <span className="font-medium">May 22, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Minimum Payment</span>
                    <span className="font-medium">$35.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cash Back Rewards</span>
                    <span className="font-medium text-green-600">$125.50</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Make Payment</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Benefits</CardTitle>
              <CardDescription>Special offers and benefits for your credit cards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Cash Back Rewards</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Earn up to 5% cash back on select categories with your Cash Rewards card.
                  </p>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    View Rewards <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Purchase Protection</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your Platinum card offers protection against damage or theft for 90 days on new purchases.
                  </p>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="credit" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Platinum Credit Card</span>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Visa ending in 8765</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold">$2,345.00</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-lg font-medium">$10,000.00</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credit Used</span>
                    <span>23.45%</span>
                  </div>
                  <Progress value={23.45} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Make Payment</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Cash Rewards Credit Card</span>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Visa ending in 3421</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold">$1,250.75</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="text-lg font-medium">$7,500.00</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credit Used</span>
                    <span>16.68%</span>
                  </div>
                  <Progress value={16.68} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm">Make Payment</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Credit Card Benefits</CardTitle>
              <CardDescription>Special offers and benefits for your credit cards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Cash Back Rewards</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Earn up to 5% cash back on select categories with your Cash Rewards card.
                  </p>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    View Rewards <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Purchase Protection</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your Platinum card offers protection against damage or theft for 90 days on new purchases.
                  </p>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="debit" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Primary Debit Card</span>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Mastercard ending in 4582</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Linked Account</p>
                    <p className="text-lg font-medium">Primary Checking</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold">$12,580.00</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily ATM Limit</span>
                    <span className="font-medium">$1,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Daily Purchase Limit</span>
                    <span className="font-medium">$5,000.00</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Online Purchases</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">International Transactions</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Lock Card</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Request Replacement</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Manage Limits</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Business Debit Card</span>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Visa ending in 7890</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Linked Account</p>
                    <p className="text-lg font-medium">Business Checking</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold">$45,320.00</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily ATM Limit</span>
                    <span className="font-medium">$2,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Daily Purchase Limit</span>
                    <span className="font-medium">$10,000.00</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Online Purchases</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">International Transactions</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Lock Card</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Request Replacement</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Manage Limits</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Debit Card Management</CardTitle>
              <CardDescription>Control your debit card settings and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Lock className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">ATM Withdrawal Limits</h3>
                      <p className="text-sm text-muted-foreground">
                        Adjust your daily ATM withdrawal limits
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Adjust
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Purchase Limits</h3>
                      <p className="text-sm text-muted-foreground">
                        Control your daily spending limits
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Adjust
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Travel Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Notify us about your travel plans
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Set Up
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Dispute Transaction</h3>
                      <p className="text-sm text-muted-foreground">
                        Report unauthorized transactions
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}