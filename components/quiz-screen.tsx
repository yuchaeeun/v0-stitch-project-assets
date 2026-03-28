"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { questions, type DeveloperType } from "@/lib/quiz-data";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizScreenProps {
  onComplete: (answers: DeveloperType[]) => void;
  onBack: () => void;
}

export function QuizScreen({ onComplete, onBack }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<DeveloperType[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (optionIndex: number, type: DeveloperType) => {
    if (isAnimating) return;
    
    setSelectedOption(optionIndex);
    setIsAnimating(true);

    setTimeout(() => {
      const newAnswers = [...answers, type];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        onComplete(newAnswers);
      }
      setIsAnimating(false);
    }, 400);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground min-w-[3rem] text-right">
          {currentQuestion + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="mb-2">
          <span className="text-sm font-medium text-primary">
            Q{question.id}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-balance leading-relaxed">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index, option.type)}
              disabled={isAnimating}
              className={cn(
                "w-full p-4 rounded-2xl text-left transition-all duration-200",
                "border-2 hover:border-primary hover:bg-primary/5",
                "flex items-center justify-between gap-4",
                "group disabled:cursor-not-allowed",
                selectedOption === index
                  ? "border-primary bg-primary/10 scale-[0.98]"
                  : "border-border bg-card"
              )}
            >
              <span
                className={cn(
                  "font-medium transition-colors",
                  selectedOption === index
                    ? "text-primary"
                    : "text-foreground group-hover:text-primary"
                )}
              >
                {option.text}
              </span>
              <ChevronRight
                className={cn(
                  "w-5 h-5 transition-all",
                  selectedOption === index
                    ? "text-primary translate-x-1"
                    : "text-muted-foreground group-hover:text-primary group-hover:translate-x-1"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          직감적으로 선택해 주세요
        </p>
      </div>
    </div>
  );
}
