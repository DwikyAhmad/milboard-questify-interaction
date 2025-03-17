
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
    title: "Media Literacy Basics",
    description: "Test your understanding of fundamental media literacy concepts",
    difficulty: "beginner",
    questions: [
      {
        id: "q1",
        question: "What is media literacy?",
        options: [
          "The ability to read newspaper articles",
          "The ability to access, analyze, evaluate, and create media in various forms",
          "The study of social media platforms",
          "The skill of developing media content"
        ],
        correctAnswer: 1,
        explanation: "Media literacy is the ability to access, analyze, evaluate, and create media in various forms, helping individuals navigate the complex media landscape critically."
      },
      {
        id: "q2",
        question: "Why is critical thinking important in media literacy?",
        options: [
          "It helps you memorize media content better",
          "It's not important; consuming media should be passive",
          "It helps you question and evaluate media messages",
          "It helps media companies create better content"
        ],
        correctAnswer: 2,
        explanation: "Critical thinking allows consumers to question the intent, content, and impact of media messages rather than passively accepting information."
      },
      {
        id: "q3",
        question: "Which of the following is NOT a reliable way to verify information?",
        options: [
          "Cross-checking with multiple sources",
          "Verifying the author's credentials",
          "Assuming information is true if it's shared by many people",
          "Checking the publication date"
        ],
        correctAnswer: 2,
        explanation: "Information being widely shared doesn't guarantee its accuracy. This is known as the 'bandwagon fallacy' - the belief that something is true because many people believe it."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Digital Citizenship",
    description: "Test your knowledge of responsible online behavior",
    difficulty: "intermediate",
    questions: [
      {
        id: "q1",
        question: "What does digital citizenship mean?",
        options: [
          "Having a citizenship certificate for digital services",
          "The responsible use of technology and appropriate online behavior",
          "Creating digital content for governmental purposes",
          "Being born in a digital era"
        ],
        correctAnswer: 1,
        explanation: "Digital citizenship refers to the responsible and appropriate use of technology, including respectful behavior online and understanding one's digital rights and responsibilities."
      },
      {
        id: "q2",
        question: "What is cyberbullying?",
        options: [
          "Teaching computer skills to children",
          "Using electronic communication to bully someone",
          "Building secure cyber systems",
          "Creating educational videos online"
        ],
        correctAnswer: 1,
        explanation: "Cyberbullying is the use of electronic communication (like social media, messaging, etc.) to intimidate, threaten, or harm others. It's a serious issue that can have significant emotional impacts."
      },
      {
        id: "q3",
        question: "What should you do if you witness cyberbullying?",
        options: [
          "Ignore it, it's not your problem",
          "Join in to fit in with others",
          "Report it and offer support to the person being bullied",
          "Share the bullying content with more people"
        ],
        correctAnswer: 2,
        explanation: "If you witness cyberbullying, the responsible action is to report it to the platform and offer support to the person being bullied. Being a bystander who takes no action can indirectly encourage bullying behavior."
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
          <h1 className="text-2xl font-bold">Interactive Quizzes</h1>
          <p className="text-muted-foreground mt-1">
            Test your media literacy knowledge with these quizzes
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
              Back to Quizzes
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
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
                          {quiz.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      <p className="text-sm text-muted-foreground">
                        {quiz.description}
                      </p>
                      <div className="flex items-center mt-3 text-sm">
                        <Award className="h-4 w-4 text-primary mr-2" />
                        <span>{quiz.questions.length} questions</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full button-hover group"
                        onClick={() => handleStartQuiz(quiz.id)}
                      >
                        Start Quiz
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
                            {quiz.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground">
                          {quiz.description}
                        </p>
                        <div className="flex items-center mt-3 text-sm">
                          <Award className="h-4 w-4 text-primary mr-2" />
                          <span>{quiz.questions.length} questions</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className="w-full button-hover group"
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Start Quiz
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
                            {quiz.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground">
                          {quiz.description}
                        </p>
                        <div className="flex items-center mt-3 text-sm">
                          <Award className="h-4 w-4 text-primary mr-2" />
                          <span>{quiz.questions.length} questions</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className="w-full button-hover group"
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Start Quiz
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
