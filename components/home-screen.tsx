"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HomeScreenProps {
  onStart: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generatedHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 12,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            className="text-primary fill-primary"
            style={{
              width: heart.size,
              height: heart.size,
              opacity: heart.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Soft glow decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-36 h-36 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Icon */}
        <div className="mb-8 relative">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/40">
            <Heart className="w-14 h-14 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center animate-bounce shadow-md">
            <span className="text-lg">{"<3"}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
          개발자 이상형 테스트
        </h1>
        <p className="text-lg text-primary font-medium mb-2">
          Developer Ideal Type Test
        </p>

        {/* Description */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          당신에게 딱 맞는 프로그래밍 언어 이상형은?
          <br />
          21개의 질문으로 알아보세요!
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-10 bg-card/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-primary/20 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">21</div>
            <div className="text-sm text-muted-foreground">질문</div>
          </div>
          <div className="w-px bg-primary/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">5분</div>
            <div className="text-sm text-muted-foreground">소요시간</div>
          </div>
          <div className="w-px bg-primary/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">9</div>
            <div className="text-sm text-muted-foreground">유형</div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full max-w-xs h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transition-all hover:scale-105 bg-gradient-to-r from-primary to-accent"
        >
          <Heart className="w-5 h-5 mr-2 fill-current" />
          테스트 시작하기
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          결과는 재미로만 봐주세요 :)
        </p>
      </div>
    </div>
  );
}
