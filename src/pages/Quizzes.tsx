
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Quiz from "@/components/quiz/Quiz";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ChevronRight } from "lucide-react";

const mockQuizzes = [
  {
    id: "quiz-1",
    title: "Dasar Literasi Media",
    description: "Uji pemahaman Anda tentang konsep dasar literasi media",
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        question: "Apa yang dimaksud dengan literasi media?",
        options: [
          "Kemampuan membaca artikel koran",
          "Kemampuan mengakses, menganalisis, mengevaluasi, dan membuat media dalam berbagai bentuk",
          "Studi tentang platform media sosial",
          "Keterampilan mengembangkan konten media"
        ],
        correctAnswer: 1,
        explanation: "Literasi media adalah kemampuan untuk mengakses, menganalisis, mengevaluasi, dan membuat media dalam berbagai bentuk, membantu individu menavigasi lanskap media yang kompleks secara kritis."
      },
      {
        id: "q2",
        question: "Mengapa berpikir kritis penting dalam literasi media?",
        options: [
          "Membantu Anda mengingat konten media dengan lebih baik",
          "Tidak penting; mengonsumsi media harusnya pasif",
          "Membantu Anda mempertanyakan dan mengevaluasi pesan media",
          "Membantu perusahaan media membuat konten yang lebih baik"
        ],
        correctAnswer: 2,
        explanation: "Berpikir kritis memungkinkan konsumen untuk mempertanyakan maksud, konten, dan dampak pesan media daripada secara pasif menerima informasi."
      },
      {
        id: "q3",
        question: "Manakah dari berikut ini yang BUKAN cara yang dapat diandalkan untuk memverifikasi informasi?",
        options: [
          "Memeriksa silang dengan beberapa sumber",
          "Memverifikasi kredensial penulis",
          "Menganggap informasi itu benar jika dibagikan oleh banyak orang",
          "Memeriksa tanggal publikasi"
        ],
        correctAnswer: 2,
        explanation: "Informasi yang banyak dibagikan tidak menjamin keakuratannya. Ini dikenal sebagai 'kekeliruan bandwagon' - kepercayaan bahwa sesuatu itu benar karena banyak orang mempercayainya."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Kewarganegaraan Digital",
    description: "Uji pengetahuan Anda tentang perilaku online yang bertanggung jawab",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        question: "Apa arti kewarganegaraan digital?",
        options: [
          "Memiliki sertifikat kewarganegaraan untuk layanan digital",
          "Penggunaan teknologi yang bertanggung jawab dan perilaku online yang tepat",
          "Membuat konten digital untuk tujuan pemerintahan",
          "Dilahirkan di era digital"
        ],
        correctAnswer: 1,
        explanation: "Kewarganegaraan digital mengacu pada penggunaan teknologi yang bertanggung jawab dan tepat, termasuk perilaku yang hormat secara online dan pemahaman tentang hak dan tanggung jawab digital seseorang."
      },
      {
        id: "q2",
        question: "Apa itu perundungan maya (cyberbullying)?",
        options: [
          "Mengajarkan keterampilan komputer kepada anak-anak",
          "Menggunakan komunikasi elektronik untuk merundung seseorang",
          "Membangun sistem cyber yang aman",
          "Membuat video edukasi secara online"
        ],
        correctAnswer: 1,
        explanation: "Perundungan maya adalah penggunaan komunikasi elektronik (seperti media sosial, pesan, dll.) untuk mengintimidasi, mengancam, atau merugikan orang lain. Ini adalah masalah serius yang dapat berdampak emosional signifikan."
      },
      {
        id: "q3",
        question: "Apa yang harus Anda lakukan jika Anda menyaksikan perundungan maya?",
        options: [
          "Abaikan saja, itu bukan masalah Anda",
          "Bergabung untuk menyesuaikan diri dengan orang lain",
          "Laporkan dan tawarkan dukungan kepada orang yang dirundung",
          "Bagikan konten perundungan dengan lebih banyak orang"
        ],
        correctAnswer: 2,
        explanation: "Jika Anda menyaksikan perundungan maya, tindakan yang bertanggung jawab adalah melaporkannya ke platform dan menawarkan dukungan kepada orang yang dirundung. Menjadi pengamat yang tidak mengambil tindakan dapat secara tidak langsung mendorong perilaku perundungan."
      }
    ]
  }
];

const Quizzes = () => {
  const [animate, setAnimate] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  
  useEffect(() => {
    // Add animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);
  
  const handleStartQuiz = (quizId: string) => {
    const quiz = mockQuizzes.find(q => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setActiveQuiz(quizId);
    }
  };
  
  const handleCompleteQuiz = (score: number, total: number) => {
    // In a real app, this would save the quiz results
    console.log(`Quiz completed with score: ${score}/${total}`);
  };
  
  return (
    <Layout>
      <div className={`space-y-6 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div>
          <h1 className="text-2xl font-bold">Kuis Interaktif</h1>
          <p className="text-muted-foreground mt-1">
            Uji pengetahuan literasi media Anda dengan kuis ini
          </p>
        </div>
        
        {activeQuiz ? (
          <div>
            <Quiz
              title={currentQuiz.title}
              description={currentQuiz.description}
              questions={currentQuiz.questions}
              onComplete={handleCompleteQuiz}
            />
            
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => setActiveQuiz(null)}
            >
              Kembali ke Kuis
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="beginner">Pemula</TabsTrigger>
              <TabsTrigger value="intermediate">Menengah</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid gap-4">
                {mockQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="overflow-hidden border-none shadow-md card-hover">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <Badge
                          variant="outline"
                          className={`capitalize ${
                            quiz.difficulty === "beginner" 
                              ? "bg-green-100 text-green-700 border-green-200" 
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}
                        >
                          {quiz.difficulty === "beginner" ? "Pemula" : "Menengah"}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      <p className="text-sm text-muted-foreground">
                        {quiz.description}
                      </p>
                      <div className="flex items-center mt-3 text-sm">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        <span>{quiz.questions.length} pertanyaan</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full button-hover group"
                        onClick={() => handleStartQuiz(quiz.id)}
                      >
                        Mulai Kuis
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="beginner" className="mt-0">
              <div className="grid gap-4">
                {mockQuizzes
                  .filter(quiz => quiz.difficulty === "beginner")
                  .map((quiz) => (
                    <Card key={quiz.id} className="overflow-hidden border-none shadow-md card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                          <Badge
                            variant="outline"
                            className="capitalize bg-green-100 text-green-700 border-green-200"
                          >
                            Pemula
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground">
                          {quiz.description}
                        </p>
                        <div className="flex items-center mt-3 text-sm">
                          <Award className="h-4 w-4 text-primary mr-2" />
                          <span>{quiz.questions.length} pertanyaan</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className="w-full button-hover group"
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Mulai Kuis
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="intermediate" className="mt-0">
              <div className="grid gap-4">
                {mockQuizzes
                  .filter(quiz => quiz.difficulty === "intermediate")
                  .map((quiz) => (
                    <Card key={quiz.id} className="overflow-hidden border-none shadow-md card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                          <Badge
                            variant="outline"
                            className="capitalize bg-blue-100 text-blue-700 border-blue-200"
                          >
                            Menengah
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground">
                          {quiz.description}
                        </p>
                        <div className="flex items-center mt-3 text-sm">
                          <Award className="h-4 w-4 text-primary mr-2" />
                          <span>{quiz.questions.length} pertanyaan</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className="w-full button-hover group"
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Mulai Kuis
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Quizzes;
