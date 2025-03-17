
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, QrCode, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ModuleCard from "@/components/learning/ModuleCard";
import { useNavigate } from "react-router-dom";

const mockModules = [
  {
    id: "module-1",
    title: "Introduction to Media Literacy",
    description: "Learn the fundamentals of media literacy and why it's important in today's digital world.",
    duration: "20 min",
    topics: ["Media Basics", "Critical Thinking", "Information Sources"],
    progress: 75,
    isNew: false
  },
  {
    id: "module-2",
    title: "Digital Citizenship",
    description: "Understand how to be a responsible digital citizen and navigate online spaces safely.",
    duration: "25 min",
    topics: ["Online Safety", "Digital Identity", "Cyberbullying Prevention"],
    progress: 30,
    isNew: true
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  
  useEffect(() => {
    // Add animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    // Calculate overall progress
    if (mockModules.length > 0) {
      const totalProgress = mockModules.reduce((acc, module) => acc + module.progress, 0);
      setOverallProgress(totalProgress / mockModules.length);
    }
  }, []);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("milboard-user") || "{}");
  const userName = user?.name || "User";

  return (
    <Layout>
      <div className={`space-y-8 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {userName.split(" ")[0]}</h1>
          <p className="text-muted-foreground mt-1">Continue your media literacy journey</p>
        </div>
        
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Your Progress</h2>
              <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 button-hover"
                onClick={() => navigate("/modules")}
              >
                <BookOpen className="h-5 w-5 mb-2 text-primary" />
                <span className="text-xs">Learning</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 button-hover"
                onClick={() => navigate("/quizzes")}
              >
                <Award className="h-5 w-5 mb-2 text-primary" />
                <span className="text-xs">Quizzes</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 button-hover"
                onClick={() => navigate("/scan")}
              >
                <QrCode className="h-5 w-5 mb-2 text-primary" />
                <span className="text-xs">Scan QR</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Continue Learning</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-primary group"
              onClick={() => navigate("/modules")}
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockModules.map((module) => (
              <ModuleCard key={module.id} {...module} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
