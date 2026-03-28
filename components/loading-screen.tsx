"use client";

import { useEffect, useState } from "react";
import { Code2, Cpu, Database, Globe, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  "응답을 분석하고 있어요...",
  "당신의 연애 스타일을 파악 중...",
  "언어별 호환성을 계산하고 있어요...",
  "당신의 이상형 코드를 컴파일 중...",
  "결과를 준비하고 있어요!",
];

const icons = [Code2, Cpu, Database, Globe];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 400);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(iconInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const IconComponent = icons[currentIcon];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 animate-ping"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1.5 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Animated icon */}
        <div className="mb-8 relative">
          <div className="w-28 h-28 rounded-3xl bg-primary/10 flex items-center justify-center animate-pulse">
            <IconComponent className="w-14 h-14 text-primary animate-bounce" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent-foreground animate-spin" />
          </div>
        </div>

        {/* Loading message */}
        <h2 className="text-xl font-bold text-foreground mb-2 min-h-[2rem] transition-all">
          {loadingMessages[messageIndex]}
        </h2>
        <p className="text-muted-foreground mb-8">
          잠시만 기다려 주세요
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>

        {/* Floating dots */}
        <div className="flex gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
