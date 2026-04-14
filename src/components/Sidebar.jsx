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
            <span className="text-xl font-bold">SaintPatrick</span>
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
            <Link to="/transfer" className="w-full">
              <SidebarMenuButton className={cn(isActive("/transfer") && "bg-accent text-accent-foreground")}>
                <DollarSign className="h-4 w-4" />
                Transfer
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