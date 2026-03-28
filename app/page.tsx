"use client";

import { useState, useCallback } from "react";
import { HomeScreen } from "@/components/home-screen";
import { QuizScreen } from "@/components/quiz-screen";
import { LoadingScreen } from "@/components/loading-screen";
import { ResultScreen } from "@/components/result-screen";
import { calculateResult, type LanguageType } from "@/lib/quiz-data";

type Screen = "home" | "quiz" | "loading" | "result";

export default function DeveloperIdealTypeTest() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [answers, setAnswers] = useState<LanguageType[][]>([]);
  const [result, setResult] = useState<LanguageType | null>(null);

  const handleStart = useCallback(() => {
    setCurrentScreen("quiz");
  }, []);

  const handleQuizComplete = useCallback((quizAnswers: LanguageType[][]) => {
    setAnswers(quizAnswers);
    setCurrentScreen("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    const calculatedResult = calculateResult(answers);
    setResult(calculatedResult);
    setCurrentScreen("result");
  }, [answers]);

  const handleRestart = useCallback(() => {
    setCurrentScreen("home");
    setAnswers([]);
    setResult(null);
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentScreen("home");
    setAnswers([]);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === "home" && <HomeScreen onStart={handleStart} />}
      {currentScreen === "quiz" && (
        <QuizScreen onComplete={handleQuizComplete} onBack={handleBackToHome} />
      )}
      {currentScreen === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {currentScreen === "result" && result && (
        <ResultScreen resultType={result} onRestart={handleRestart} />
      )}
    </main>
  );
}
