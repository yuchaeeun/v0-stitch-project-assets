"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { questions, type LanguageType } from "@/lib/quiz-data";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizScreenProps {
  onComplete: (answers: LanguageType[][]) => void;
  onBack: () => void;
}

export function QuizScreen({ onComplete, onBack }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<LanguageType[][]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Get unique parts for section indicator
  const parts = [...new Set(questions.map((q) => q.part))];
  const currentPartIndex = parts.indexOf(question.part);

  const handleSelect = (optionIndex: number, languages: LanguageType[]) => {
    if (isAnimating) return;

    setSelectedOption(optionIndex);
    setIsAnimating(true);

    setTimeout(() => {
      const newAnswers = [...answers, languages];
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
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="rounded-full shrink-0"
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
        <span className="text-sm font-medium text-muted-foreground min-w-[3rem] text-right shrink-0">
          {currentQuestion + 1}/{questions.length}
        </span>
      </div>

      {/* Part Indicator */}
      <div className="flex justify-center gap-1.5 mb-6">
        {parts.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentPartIndex
                ? "w-6 bg-primary"
                : index < currentPartIndex
                  ? "w-3 bg-primary/50"
                  : "w-3 bg-secondary"
            )}
          />
        ))}
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {question.part}
          </span>
        </div>
        <div className="mb-2">
          <span className="text-sm font-bold text-primary">Q{question.id}.</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 text-balance leading-relaxed">
          {question.question}
        </h2>

        {/* Options - A and B */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index, option.languages)}
              disabled={isAnimating}
              className={cn(
                "w-full p-5 rounded-2xl text-left transition-all duration-200",
                "border-2 hover:border-primary hover:bg-primary/5",
                "flex items-start gap-4",
                "group disabled:cursor-not-allowed",
                selectedOption === index
                  ? "border-primary bg-primary/10 scale-[0.98]"
                  : "border-border bg-card"
              )}
            >
              <span
                className={cn(
                  "shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                  selectedOption === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                )}
              >
                {index === 0 ? "A" : "B"}
              </span>
              <span
                className={cn(
                  "font-medium transition-colors leading-relaxed pt-1",
                  selectedOption === index
                    ? "text-primary"
                    : "text-foreground group-hover:text-primary"
                )}
              >
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">직감적으로 선택해 주세요</p>
      </div>
    </div>
  );
}
