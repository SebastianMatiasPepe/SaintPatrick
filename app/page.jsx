import Link from "next/link"
import Image from "next/image"
import { Shield, CreditCard, BarChart3, ArrowRight, Menu, Bell, Search } from "lucide-react"

import { Button } from "../src/components/ui/button"
import React from "react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SecureBank</span>
            </Link>
          </div>
          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/accounts" className="text-sm font-medium hover:text-primary">
              Accounts
            </Link>
            <Link href="/transfer" className="text-sm font-medium hover:text-primary">
              Transfers
            </Link>
            <Link href="/payments" className="text-sm font-medium hover:text-primary">
              Payments
            </Link>
            <Link href="/investments" className="text-sm font-medium hover:text-primary">
              Investments
            </Link>
          </nav>
          {/* Header buttons */}
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
      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          {/* Rest of the hero section content remains the same */}
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
                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Banking dashboard preview"
                    width={1280}
                    height={720}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the sections remain the same */}
        {/* ... */}
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SecureBank</span>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Support
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 SecureBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}