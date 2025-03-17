
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, ChevronRight, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

const Quiz = ({ title, description, questions, onComplete }: QuizProps) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswerSubmitted(true);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(correctAnswers + (isCorrect ? 1 : 0), questions.length);
      }
      
      toast({
        title: "Kuis Selesai!",
        description: `Skor Anda ${correctAnswers + (isCorrect ? 1 : 0)} dari ${questions.length}`,
      });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswers(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const score = correctAnswers;
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    
    if (percentage >= 90) message = "Sempurna! Anda ahli literasi media!";
    else if (percentage >= 70) message = "Bagus! Anda memiliki pengetahuan literasi media yang baik.";
    else if (percentage >= 50) message = "Usaha yang baik! Terus belajar untuk meningkatkan keterampilan Anda.";
    else message = "Terus berlatih! Literasi media membutuhkan waktu untuk dikuasai.";
    
    return (
      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl">Kuis Selesai!</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8 pb-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="w-36 h-36 rounded-full flex items-center justify-center bg-accent">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{percentage}%</p>
                    <p className="text-sm text-muted-foreground">Skor</p>
                  </div>
                </div>
              </div>
              <Award className="absolute -right-2 bottom-4 h-12 w-12 text-primary animate-pulse" />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-medium">Skor Anda: {score}/{questions.length}</h3>
              <p className="text-muted-foreground mt-1">{message}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Ringkasan Kuis</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Jawaban benar
                </span>
                <span className="font-medium">{score}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <XCircle className="h-4 w-4 text-destructive mr-2" />
                  Jawaban salah
                </span>
                <span className="font-medium">{questions.length - score}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full button-hover"
            onClick={handleTryAgain}
          >
            Coba Lagi
          </Button>
          <Button 
            variant="outline" 
            className="w-full button-hover"
            onClick={() => window.location.href = "/modules"}
          >
            Kembali ke Modul
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-sm font-medium">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
        
        <div className="w-full h-1 bg-accent rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      
      <CardContent className="py-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
          
          <RadioGroup
            value={selectedAnswer?.toString()}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start",
                  "relative rounded-lg border p-4 transition-all hover:bg-muted/50",
                  isAnswerSubmitted && "pointer-events-none",
                  isAnswerSubmitted && index === currentQuestion.correctAnswer && "ring-2 ring-green-500 bg-green-50",
                  isAnswerSubmitted && selectedAnswer === index && index !== currentQuestion.correctAnswer && "ring-2 ring-destructive bg-destructive/10",
                )}
                onClick={() => handleAnswerSelect(index)}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  className="mt-1"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer ml-3"
                >
                  {option}
                </Label>
                
                {isAnswerSubmitted && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2 animate-scale-in" />
                )}
                {isAnswerSubmitted && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-destructive ml-2 animate-scale-in" />
                )}
              </div>
            ))}
          </RadioGroup>
          
          {isAnswerSubmitted && (
            <div className={cn(
              "mt-4 p-4 rounded-lg animate-fade-in",
              isCorrect ? "bg-green-50 border border-green-200" : "bg-destructive/10 border border-destructive/20"
            )}>
              <p className="font-medium mb-1">
                {isCorrect ? "Benar!" : "Salah!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        {!isAnswerSubmitted ? (
          <Button 
            className="w-full button-hover"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            Kirim Jawaban
          </Button>
        ) : (
          <Button 
            className="w-full button-hover group"
            onClick={handleNextQuestion}
          >
            {isLastQuestion ? "Selesaikan Kuis" : "Pertanyaan Berikutnya"}
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;
