
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  progress?: number;
  isNew?: boolean;
  className?: string;
}

const ModuleCard = ({
  id,
  title,
  description,
  duration,
  topics,
  progress = 0,
  isNew = false,
  className,
}: ModuleCardProps) => {
  return (
    <Card className={cn("overflow-hidden border-none shadow-md card-hover", className)}>
      <CardHeader className="pb-2 relative">
        {isNew && (
          <Badge className="absolute top-4 right-4 bg-unesco-blue text-white">Baru</Badge>
        )}
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-xs mt-1">
              {duration} • {topics.length} topik
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mt-3">
          {topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="secondary" className="font-normal">
              {topic}
            </Badge>
          ))}
          {topics.length > 3 && (
            <Badge variant="outline" className="font-normal">
              +{topics.length - 3} lainnya
            </Badge>
          )}
        </div>
        
        {progress > 0 && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Kemajuan</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full button-hover group"
          onClick={() => window.location.href = `/modules/${id}`}
        >
          Lanjutkan Pembelajaran
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
