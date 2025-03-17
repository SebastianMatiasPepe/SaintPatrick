import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Menu } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"

const SidebarContext = React.createContext({})

const Sidebar = ({ children, ...props }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
        {children}
      </DialogPrimitive.Root>
    </SidebarContext.Provider>
  )
}

const SidebarTrigger = ({ className, ...props }) => {
  const { open, setOpen } = React.useContext(SidebarContext)

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("md:hidden", className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  const { open } = React.useContext(SidebarContext)

  return (
    <>
      <div className={cn("hidden h-full md:flex md:w-64 md:flex-col", className)} ref={ref} {...props} />
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:hidden" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-y-0 left-0 z-50 h-full w-3/4 bg-background p-0 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 duration-300 md:hidden",
            className
          )}
          {...props}
        />
      </DialogPrimitive.Portal>
    </>
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("flex h-14 items-center border-b px-4", className)} ref={ref} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("mt-auto", className)} ref={ref} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <nav className={cn("flex-1 overflow-auto", className)} ref={ref} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("px-2 py-1", className)} ref={ref} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef(({ className, ...props }, ref) => (
  <div
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
      className
    )}
    ref={ref}
    {...props}
  />
))
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarProvider = ({ children }) => {
  return <>{children}</>
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
}