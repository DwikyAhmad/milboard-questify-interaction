
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Mail, Key, User } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
}

const AuthForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Mock authentication - in a real app, this would connect to a backend
  const handleAuth = (type: "login" | "register", email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful authentication
      const mockUser: User = {
        id: "user-123",
        email,
        name: name || email.split("@")[0]
      };
      
      // Store user in localStorage (for demo purposes)
      localStorage.setItem("milboard-user", JSON.stringify(mockUser));
      
      // Show success message
      toast({
        title: type === "login" ? "Selamat datang kembali!" : "Akun telah dibuat",
        description: type === "login" 
          ? "Anda telah berhasil masuk." 
          : "Akun Anda telah berhasil dibuat.",
      });
      
      // Redirect to dashboard (mock)
      window.location.href = "/dashboard";
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: "login" | "register") => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    
    handleAuth(type, email, password, name);
  };

  return (
    <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="login" className="text-base">Masuk</TabsTrigger>
        <TabsTrigger value="register" className="text-base">Daftar</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="animate-fade-in">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-medium">Selamat datang kembali</CardTitle>
            <CardDescription>
              Masukkan kredensial Anda untuk mengakses akun
            </CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e, "login")}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="nama@contoh.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Button variant="link" className="px-0 font-normal h-auto" type="button">
                    Lupa kata sandi?
                  </Button>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full button-hover group"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sedang masuk..."
                ) : (
                  <>
                    Masuk
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="register" className="animate-fade-in">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-medium">Buat akun baru</CardTitle>
            <CardDescription>
              Masukkan informasi Anda untuk membuat akun
            </CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e, "register")}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Budi Santoso"
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="nama@contoh.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="pl-10 input-focus"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full button-hover group"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Membuat akun..."
                ) : (
                  <>
                    Buat Akun
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
