import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, BookOpen, Award, QrCode, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Beranda", icon: Home, path: "/dashboard" },
  { label: "Pembelajaran", icon: BookOpen, path: "/modules" },
  { label: "Kuis", icon: Award, path: "/quizzes" },
  { label: "Pindai QR", icon: QrCode, path: "/scan" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  // Check if user is logged in (for demo purposes, just check localStorage)
  const isLoggedIn = localStorage.getItem("milboard-user") !== null;
  const user = isLoggedIn 
    ? JSON.parse(localStorage.getItem("milboard-user") || "{}") 
    : null;
    
  const handleLogout = () => {
    localStorage.removeItem("milboard-user");
    window.location.href = "/";
  };
  
  // If not on auth page but not logged in, redirect to home
  React.useEffect(() => {
    if (!location.pathname.includes("/auth") && !isLoggedIn && location.pathname !== "/") {
      window.location.href = "/";
    }
  }, [location.pathname, isLoggedIn]);

  const isAuthPage = location.pathname === "/auth";
  const isHomePage = location.pathname === "/";
  
  // If it's the auth page or home page, don't show the layout
  if (isAuthPage || isHomePage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar - hidden on mobile */}
      <div className="fixed top-0 left-0 bottom-0 hidden md:block w-64 border-r bg-background">
        <div className="h-full flex flex-col">
          <div className="p-6">
            <div className="text-2xl font-bold text-primary">MILBoard</div>
            <p className="text-xs text-muted-foreground mt-1">Media Literacy Learning</p>
          </div>
          
          <div className="px-3 py-2">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-3">
            <div className="rounded-lg bg-primary/5 p-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <p className="font-medium truncate">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <div className="p-6 bg-primary/5">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <nav className="space-y-1">
                      {navItems.map((item) => (
                        <Link 
                          key={item.path} 
                          to={item.path}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors",
                            location.pathname === item.path
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </nav>
                    
                    <Separator className="my-4" />
                    
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="text-2xl font-bold text-primary">MILBoard</div>
            </div>
            
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container py-6">
          {children}
        </main>
        
        {/* Bottom navigation */}
        <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur-md md:hidden">
          <nav className="flex justify-between px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center py-2 text-center text-xs",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 mb-1",
                  location.pathname === item.path 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Layout;
