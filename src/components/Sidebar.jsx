import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  CreditCard, 
  DollarSign, 
  Home, 
  Menu, 
  PiggyBank, 
  Settings, 
  Users 
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";

export default function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarTrigger />
      <SidebarContent>
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <DollarSign className="h-6 w-6" />
            <span className="text-xl font-bold">FrontBank</span>
          </Link>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" className="w-full">
              <SidebarMenuButton className={cn(isActive("/") && "bg-accent text-accent-foreground")}>
                <Home className="h-4 w-4" />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/accounts" className="w-full">
              <SidebarMenuButton className={cn(isActive("/accounts") && "bg-accent text-accent-foreground")}>
                <CreditCard className="h-4 w-4" />
                Accounts
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/transfer" className="w-full">
              <SidebarMenuButton className={cn(isActive("/transfer") && "bg-accent text-accent-foreground")}>
                <DollarSign className="h-4 w-4" />
                Transfer
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/savings" className="w-full">
              <SidebarMenuButton className={cn(isActive("/savings") && "bg-accent text-accent-foreground")}>
                <PiggyBank className="h-4 w-4" />
                Savings
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/investments" className="w-full">
              <SidebarMenuButton className={cn(isActive("/investments") && "bg-accent text-accent-foreground")}>
                <BarChart3 className="h-4 w-4" />
                Investments
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/payments" className="w-full">
              <SidebarMenuButton className={cn(isActive("/payments") && "bg-accent text-accent-foreground")}>
                <Users className="h-4 w-4" />
                Payments
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter>
          <SidebarMenuItem>
            <Link to="/settings" className="w-full">
              <SidebarMenuButton className={cn(isActive("/settings") && "bg-accent text-accent-foreground")}>
                <Settings className="h-4 w-4" />
                Settings
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}