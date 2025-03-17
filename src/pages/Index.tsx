
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Add animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    // Check if user is already logged in
    const user = localStorage.getItem("milboard-user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-white to-accent/30">
      <div className="container px-6 max-w-lg mx-auto text-center">
        <div className={`transform transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-10">
            <div className="w-20 h-20 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-6 rotate-12 shadow-lg">
              <span className="text-3xl font-bold text-white">M</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              <span className="text-primary">MIL</span>Board
            </h1>
            <p className="text-muted-foreground px-6 leading-relaxed">
              An innovative Media and Information Literacy tool 
              for educating children in the digital world
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-morph flex flex-col items-center p-5 rounded-2xl">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                    <path d="M12 13v9"></path>
                    <path d="M12 2v4"></path>
                  </svg>
                </div>
                <p className="text-sm font-medium">Learning Modules</p>
              </div>
              
              <div className="glass-morph flex flex-col items-center p-5 rounded-2xl">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <path d="M12 9h4"></path>
                    <path d="M12 13h4"></path>
                    <path d="M12 17h4"></path>
                    <path d="M8 9h.01"></path>
                    <path d="M8 13h.01"></path>
                    <path d="M8 17h.01"></path>
                  </svg>
                </div>
                <p className="text-sm font-medium">Interactive Quizzes</p>
              </div>
              
              <div className="glass-morph flex flex-col items-center p-5 rounded-2xl">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                </div>
                <p className="text-sm font-medium">QR Scanning</p>
              </div>
              
              <div className="glass-morph flex flex-col items-center p-5 rounded-2xl">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"></path>
                    <path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                    <path d="m21 15-3-3-3 3"></path>
                    <path d="M18 15v6"></path>
                  </svg>
                </div>
                <p className="text-sm font-medium">Progress Tracking</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full py-6 text-base button-hover group"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Media and Information Literacy by UNESCO
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
