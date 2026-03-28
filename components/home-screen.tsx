"use client";

import { Button } from "@/components/ui/button";
import { Code2, Sparkles } from "lucide-react";

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-accent/10 animate-pulse delay-300" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 rounded-full bg-primary/5 animate-pulse delay-500" />
        <div className="absolute bottom-20 right-1/3 w-12 h-12 rounded-full bg-accent/10 animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Code2 className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-bounce">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
          개발자 이상형 테스트
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Developer Ideal Type Test
        </p>

        {/* Description */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          당신에게 딱 맞는 프로그래밍 언어 이상형은?
          <br />
          21개의 질문으로 알아보세요!
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-10">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">21</div>
            <div className="text-sm text-muted-foreground">질문</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">5분</div>
            <div className="text-sm text-muted-foreground">소요시간</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">9</div>
            <div className="text-sm text-muted-foreground">유형</div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full max-w-xs h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105"
        >
          테스트 시작하기
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          결과는 재미로만 봐주세요 :)
        </p>
      </div>
    </div>
  );
}
