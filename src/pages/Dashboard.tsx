
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
    title: "Pengantar Literasi Media",
    description: "Pelajari dasar-dasar literasi media dan mengapa hal itu penting di dunia digital saat ini.",
    duration: "20 menit",
    topics: ["Dasar Media", "Berpikir Kritis", "Sumber Informasi"],
    progress: 75,
    isNew: false
  },
  {
    id: "module-2",
    title: "Kewarganegaraan Digital",
    description: "Pahami cara menjadi warga digital yang bertanggung jawab dan menavigasi ruang online dengan aman.",
    duration: "25 menit",
    topics: ["Keamanan Online", "Identitas Digital", "Pencegahan Perundungan Maya"],
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
  const userName = user?.name || "Pengguna";

  return (
    <Layout>
      <div className={`space-y-8 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div>
          <h1 className="text-2xl font-bold">Selamat datang kembali, {userName.split(" ")[0]}</h1>
          <p className="text-muted-foreground mt-1">Lanjutkan perjalanan literasi media Anda</p>
        </div>
        
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Kemajuan Anda</h2>
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
                <span className="text-xs">Pembelajaran</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 button-hover"
                onClick={() => navigate("/quizzes")}
              >
                <Award className="h-5 w-5 mb-2 text-primary" />
                <span className="text-xs">Kuis</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 button-hover"
                onClick={() => navigate("/scan")}
              >
                <QrCode className="h-5 w-5 mb-2 text-primary" />
                <span className="text-xs">Pindai QR</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Lanjutkan Pembelajaran</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-primary group"
              onClick={() => navigate("/modules")}
            >
              Lihat Semua
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
