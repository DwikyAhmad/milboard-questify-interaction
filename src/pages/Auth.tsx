
import { useEffect, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

const Auth = () => {
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
      <div className="container px-6 max-w-md mx-auto">
        <div className={`transform transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-4 rotate-12 shadow-lg">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              <span className="text-primary">MIL</span>Board
            </h1>
            <p className="text-muted-foreground text-sm">
              Masuk untuk mengakses perjalanan belajar Anda
            </p>
          </div>
          
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
