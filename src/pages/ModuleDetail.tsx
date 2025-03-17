import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Clock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModuleContent {
  id: string;
  title: string;
  estimatedReadTime: string;
  content: string;
  completed: boolean;
}

// Data contoh untuk konten modul
const mockContent: ModuleContent[] = [
  {
    id: "content-1",
    title: "Apa itu Literasi Media?",
    estimatedReadTime: "5 menit",
    content: "Literasi media adalah kemampuan untuk mengakses, menganalisis, mengevaluasi, dan menciptakan media dalam berbagai bentuk...",
    completed: true,
  },
  {
    id: "content-2",
    title: "Pentingnya Berpikir Kritis dalam Era Digital",
    estimatedReadTime: "7 menit",
    content: "Di era digital saat ini, kita dihadapkan dengan banjir informasi dari berbagai sumber...",
    completed: false,
  },
  {
    id: "content-3",
    title: "Cara Mengenali Informasi yang Terpercaya",
    estimatedReadTime: "8 menit",
    content: "Untuk mengenali informasi yang terpercaya, ada beberapa hal yang perlu diperhatikan...",
    completed: false,
  },
];

const ModuleDetail = () => {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState<ModuleContent | null>(null);
  const [progress] = useState(33);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header dengan tombol kembali */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Pengantar Literasi Media</h1>
            <p className="text-muted-foreground">
              Pelajari dasar-dasar literasi media dan mengapa hal itu penting
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress Modul</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Informasi modul */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Waktu Baca</span>
            </div>
            <p className="mt-1 font-medium">20 Menit</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Jumlah Materi</span>
            </div>
            <p className="mt-1 font-medium">3 Bagian</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daftar materi */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Daftar Materi</h2>
            <div className="space-y-3">
              {mockContent.map((content) => (
                <Button
                  key={content.id}
                  variant={content.id === selectedContent?.id ? "secondary" : "outline"}
                  className="w-full justify-start gap-4 h-auto py-4"
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="text-left">
                    <p className="font-medium">{content.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {content.estimatedReadTime}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Konten materi */}
          <div className="md:col-span-2 rounded-lg border p-6">
            {selectedContent ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{selectedContent.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{selectedContent.estimatedReadTime}</span>
                </div>
                <div className="prose prose-slate max-w-none">
                  {selectedContent.content}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Pilih materi di sebelah kiri untuk mulai membaca
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleDetail; 