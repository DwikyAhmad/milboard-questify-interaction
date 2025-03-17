
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
    title: "Pengantar Literasi Media",
    description: "Pelajari dasar-dasar literasi media dan mengapa hal itu penting di dunia digital saat ini.",
    duration: "20 menit",
    topics: ["Dasar Media", "Berpikir Kritis", "Sumber Informasi"],
    progress: 75,
    isNew: false,
    category: "foundations"
  },
  {
    id: "module-2",
    title: "Kewarganegaraan Digital",
    description: "Pahami cara menjadi warga digital yang bertanggung jawab dan menjelajahi ruang online dengan aman.",
    duration: "25 menit",
    topics: ["Keamanan Online", "Identitas Digital", "Pencegahan Perundungan Siber"],
    progress: 30,
    isNew: true,
    category: "foundations"
  },
  {
    id: "module-3",
    title: "Berita Palsu & Misinformasi",
    description: "Pelajari cara mengidentifikasi dan menghindari penyebaran berita palsu dan misinformasi online.",
    duration: "30 menit",
    topics: ["Verifikasi Sumber", "Pemeriksaan Fakta", "Bias Media"],
    progress: 0,
    isNew: true,
    category: "advanced"
  },
  {
    id: "module-4",
    title: "Privasi & Keamanan Digital",
    description: "Lindungi informasi pribadi Anda dan tetap aman di dunia digital.",
    duration: "35 menit",
    topics: ["Keamanan Kata Sandi", "Perlindungan Data", "Privasi Online"],
    progress: 0,
    isNew: false,
    category: "advanced"
  },
  {
    id: "module-5",
    title: "Literasi Media Sosial",
    description: "Navigasi platform media sosial secara bertanggung jawab dan pahami dampaknya.",
    duration: "25 menit",
    topics: ["Kesadaran Media Sosial", "Jejak Digital", "Perilaku Online"],
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
          <h1 className="text-2xl font-bold">Modul Pembelajaran</h1>
          <p className="text-muted-foreground mt-1">
            Jelajahi konsep literasi media dengan pelajaran interaktif
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari modul dan topik..."
            className="pl-10 input-focus"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="foundations">Dasar</TabsTrigger>
            <TabsTrigger value="advanced">Lanjutan</TabsTrigger>
            <TabsTrigger value="practical">Praktis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {filteredModules.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada modul yang sesuai dengan kriteria Anda</p>
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
                  <p className="text-muted-foreground">Tidak ada modul yang ditemukan di kategori ini</p>
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
          <h3 className="font-medium mb-2">Topik Populer</h3>
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
