import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  ArrowRight,
  Plus,
  Clock,
  RefreshCw,
  MoreHorizontal,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function InvestmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
          <p className="text-muted-foreground">Manage your investment portfolio and track performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Investment
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,350.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stocks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78,250.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bonds</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,100.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retirement</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,000.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="bonds">Bonds</TabsTrigger>
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Current distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full rounded-md border p-6">
                  <div className="flex h-full items-center justify-center">
                    <PieChart className="h-40 w-40 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Stocks (63%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Bonds (26%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Retirement (11%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Your best performing investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <span className="text-xs font-bold">AAPL</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Apple Inc.</p>
                        <p className="text-xs text-muted-foreground">Technology</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$182.50</p>
                      <p className="text-xs text-green-500">+24.8%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <span className="text-xs font-bold">MSFT</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Microsoft Corp.</p>
                        <p className="text-xs text-muted-foreground">8 shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$3,321.60</p>
                      <p className="text-xs text-green-500">+18.3%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <span className="text-xs font-bold">NVDA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">NVIDIA Corp.</p>
                        <p className="text-xs text-muted-foreground">5 shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$4,753.75</p>
                      <p className="text-xs text-green-500">+32.1%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <span className="text-xs font-bold">GOOGL</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Alphabet Inc.</p>
                        <p className="text-xs text-muted-foreground">10 shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$16,200.00</p>
                      <p className="text-xs text-green-500">+8.7%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <span className="text-xs font-bold">META</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Meta Platforms Inc.</p>
                        <p className="text-xs text-muted-foreground">12 shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$5,820.00</p>
                      <p className="text-xs text-red-500">-2.3%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Investments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your recent investment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Purchased 5 shares of AAPL</p>
                    <p className="text-sm text-muted-foreground">May 10, 2025 • $912.50</p>
                  </div>
                  <div className="ml-auto font-medium text-green-600">+$912.50</div>
                </div>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Sold 10 shares of META</p>
                    <p className="text-sm text-muted-foreground">May 8, 2025 • $4,850.00</p>
                  </div>
                  <div className="ml-auto font-medium text-red-600">-$4,850.00</div>
                </div>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <RefreshCw className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Dividend Payment</p>
                    <p className="text-sm text-muted-foreground">May 5, 2025 • $325.75</p>
                  </div>
                  <div className="ml-auto font-medium text-green-600">+$325.75</div>
                </div>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Purchased 2 shares of GOOGL</p>
                    <p className="text-sm text-muted-foreground">May 3, 2025 • $3,240.00</p>
                  </div>
                  <div className="ml-auto font-medium text-green-600">+$3,240.00</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                View Transaction History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Portfolio</CardTitle>
              <CardDescription>Your stock investments and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <span className="text-xs font-bold">AAPL</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Apple Inc.</p>
                      <p className="text-xs text-muted-foreground">15 shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$2,737.50</p>
                    <p className="text-xs text-green-500">+24.8%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <span className="text-xs font-bold">MSFT</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Microsoft Corp.</p>
                      <p className="text-xs text-muted-foreground">8 shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$3,321.60</p>
                    <p className="text-xs text-green-500">+18.3%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <span className="text-xs font-bold">NVDA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">NVIDIA Corp.</p>
                      <p className="text-xs text-muted-foreground">5 shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$4,753.75</p>
                    <p className="text-xs text-green-500">+32.1%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <span className="text-xs font-bold">GOOGL</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alphabet Inc.</p>
                      <p className="text-xs text-muted-foreground">10 shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$16,200.00</p>
                    <p className="text-xs text-green-500">+8.7%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <span className="text-xs font-bold">META</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Meta Platforms Inc.</p>
                      <p className="text-xs text-muted-foreground">12 shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$5,820.00</p>
                    <p className="text-xs text-red-500">-2.3%</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Buy Stocks
              </Button>
              <Button variant="outline" size="sm">
                <TrendingDown className="mr-2 h-4 w-4" />
                Sell Stocks
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="bonds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bond Portfolio</CardTitle>
              <CardDescription>Your bond investments and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <span className="text-xs font-bold">GOVT</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">US Treasury Bond</p>
                      <p className="text-xs text-muted-foreground">10-Year • 4.2% Yield</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$15,000.00</p>
                    <p className="text-xs text-green-500">+4.2%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <span className="text-xs font-bold">CORP</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Corporate Bond Fund</p>
                      <p className="text-xs text-muted-foreground">5-Year • 5.1% Yield</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$10,000.00</p>
                    <p className="text-xs text-green-500">+5.1%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <span className="text-xs font-bold">MUNI</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Municipal Bond</p>
                      <p className="text-xs text-muted-foreground">7-Year • 3.8% Yield</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$7,100.00</p>
                    <p className="text-xs text-green-500">+3.8%</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Buy Bonds
              </Button>
              <Button variant="outline" size="sm">
                <TrendingDown className="mr-2 h-4 w-4" />
                Sell Bonds
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bond Maturity Timeline</CardTitle>
              <CardDescription>When your bonds will mature</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">2026</p>
                    <p className="text-xs text-muted-foreground">1-Year Treasury</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$5,000.00</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">2030</p>
                    <p className="text-xs text-muted-foreground">5-Year Corporate</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$10,000.00</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">2032</p>
                    <p className="text-xs text-muted-foreground">7-Year Municipal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$7,100.00</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">2035</p>
                    <p className="text-xs text-muted-foreground">10-Year Treasury</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$10,000.00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retirement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Accounts</CardTitle>
              <CardDescription>Your retirement savings and investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                      <span className="text-xs font-bold">401K</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">401(k) Plan</p>
                      <p className="text-xs text-muted-foreground">Employer-sponsored</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$10,000.00</p>
                    <p className="text-xs text-green-500">+5.8%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                      <span className="text-xs font-bold">IRA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Traditional IRA</p>
                      <p className="text-xs text-muted-foreground">Tax-deferred</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$4,000.00</p>
                    <p className="text-xs text-green-500">+4.2%</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Contribute
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Adjust Allocation
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Retirement Progress</CardTitle>
              <CardDescription>Track your progress toward retirement goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current Savings</span>
                    <span>$14,000.00 of $1,000,000.00</span>
                  </div>
                  <Progress value={1.4} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">You're 1.4% of the way to your retirement goal</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Monthly Contribution</p>
                    <p className="text-lg">$500.00</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Retirement Age</p>
                    <p className="text-lg">67 years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Years to Retirement</p>
                    <p className="text-lg">35 years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Projected Annual Income</p>
                    <p className="text-lg">$40,000.00</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Adjust Retirement Plan
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Retirement Tips</CardTitle>
              <CardDescription>Recommendations to improve your retirement savings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Increase your monthly contribution</p>
                    <p className="text-xs text-muted-foreground">
                      Increasing your monthly contribution by just $100 could add over $100,000 to your retirement savings.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Take advantage of employer matching</p>
                    <p className="text-xs text-muted-foreground">
                      Ensure you're contributing enough to get the full employer match on your 401(k).
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Consider a Roth IRA</p>
                    <p className="text-xs text-muted-foreground">
                      Tax-free withdrawals in retirement can provide significant benefits compared to traditional accounts.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Retirement Consultation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}