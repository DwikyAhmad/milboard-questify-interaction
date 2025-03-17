
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import ModuleCard from "@/components/learning/ModuleCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const mockModules = [
  {
    id: "module-1",
    title: "Introduction to Media Literacy",
    description: "Learn the fundamentals of media literacy and why it's important in today's digital world.",
    duration: "20 min",
    topics: ["Media Basics", "Critical Thinking", "Information Sources"],
    progress: 75,
    isNew: false,
    category: "foundations"
  },
  {
    id: "module-2",
    title: "Digital Citizenship",
    description: "Understand how to be a responsible digital citizen and navigate online spaces safely.",
    duration: "25 min",
    topics: ["Online Safety", "Digital Identity", "Cyberbullying Prevention"],
    progress: 30,
    isNew: true,
    category: "foundations"
  },
  {
    id: "module-3",
    title: "Fake News & Misinformation",
    description: "Learn how to identify and avoid spreading fake news and misinformation online.",
    duration: "30 min",
    topics: ["Source Verification", "Fact Checking", "Media Bias"],
    progress: 0,
    isNew: true,
    category: "advanced"
  },
  {
    id: "module-4",
    title: "Digital Privacy & Security",
    description: "Protect your personal information and stay secure in the digital world.",
    duration: "35 min",
    topics: ["Password Security", "Data Protection", "Online Privacy"],
    progress: 0,
    isNew: false,
    category: "advanced"
  },
  {
    id: "module-5",
    title: "Social Media Literacy",
    description: "Navigate social media platforms responsibly and understand their impact.",
    duration: "25 min",
    topics: ["Social Media Awareness", "Digital Footprint", "Online Behavior"],
    progress: 0,
    isNew: false,
    category: "practical"
  }
];

const Modules = () => {
  const [animate, setAnimate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModules, setFilteredModules] = useState(mockModules);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  useEffect(() => {
    // Add animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    // Filter modules based on search term and category
    const filtered = mockModules.filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || module.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredModules(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <Layout>
      <div className={`space-y-6 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div>
          <h1 className="text-2xl font-bold">Learning Modules</h1>
          <p className="text-muted-foreground mt-1">
            Explore media literacy concepts with interactive lessons
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search modules and topics..."
            className="pl-10 input-focus"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="foundations">Foundations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="practical">Practical</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredModules.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No modules found matching your criteria</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredModules.map((module) => (
                  <ModuleCard key={module.id} {...module} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {["foundations", "advanced", "practical"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              {filteredModules.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No modules found in this category</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredModules.map((module) => (
                    <ModuleCard key={module.id} {...module} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="pt-4">
          <h3 className="font-medium mb-2">Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(mockModules.flatMap(module => module.topics))).map((topic) => (
              <Badge 
                key={topic} 
                variant="secondary"
                className="cursor-pointer transition-all hover:bg-accent"
                onClick={() => setSearchTerm(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Modules;
