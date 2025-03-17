import React from "react";
import { Link } from "react-router-dom";
import { Shield, CreditCard, BarChart3, ArrowRight, Menu, Bell, Search } from "lucide-react";

import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SecureBank</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link to="/dashboard/accounts" className="text-sm font-medium hover:text-primary">
              Accounts
            </Link>
            <Link to="/dashboard/transfer" className="text-sm font-medium hover:text-primary">
              Transfers
            </Link>
            <Link to="/dashboard/payments" className="text-sm font-medium hover:text-primary">
              Payments
            </Link>
            <Link to="/dashboard/investments" className="text-sm font-medium hover:text-primary">
              Investments
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" className="hidden md:flex">
              Log In
            </Button>
            <Button>Sign Up</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Banking that puts you in control
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Secure, simple, and smart banking solutions for your everyday financial needs. Manage your money with
                  confidence.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Open an Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                  <img
                    src="/placeholder.svg"
                    alt="Banking dashboard preview"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need in one place</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our comprehensive banking platform provides all the tools you need to manage your finances
                  effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Cards</h3>
                <p className="text-muted-foreground">
                  Manage your cards, set spending limits, and enable or disable features with a single tap.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure Banking</h3>
                <p className="text-muted-foreground">
                  Advanced security features including biometric authentication and real-time fraud monitoring.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Financial Insights</h3>
                <p className="text-muted-foreground">
                  Track your spending, set budgets, and receive personalized financial recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to get started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of customers who trust us with their banking needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Open an Account</Button>
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SecureBank</span>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link to="#" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              Support
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 SecureBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}