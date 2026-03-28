"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

interface HomeScreenProps {
  onStart: (name: string, gender: string) => void;
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

interface EscapingButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function EscapingButton({ onClick, disabled }: EscapingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isEscaping, setIsEscaping] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [isCaptured, setIsCaptured] = useState(false);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseEnter = useCallback(() => {
    if (disabled || isCaptured || escapeCount >= 3) return;
    
    setIsEscaping(true);
    setEscapeCount(prev => prev + 1);
    
    // Calculate random escape position within container
    const container = containerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 200;
    const maxY = containerRect.height - 60;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setPosition({ x: newX, y: newY });
  }, [disabled, isCaptured, escapeCount]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (escapeCount < 3 || isCaptured) return;
    
    isDragging.current = true;
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
    }
  }, [escapeCount, isCaptured]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    const newX = e.clientX - containerRect.left - containerRect.width / 2 - dragOffset.current.x;
    const newY = e.clientY - containerRect.top - containerRect.height / 2 - dragOffset.current.y;
    
    setPosition({ x: newX, y: newY });
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    // Check if button is near center (capture zone)
    if (Math.abs(position.x) < 30 && Math.abs(position.y) < 30) {
      setIsCaptured(true);
      setPosition({ x: 0, y: 0 });
    }
  }, [position]);

  useEffect(() => {
    if (escapeCount >= 3 && !isCaptured) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [escapeCount, isCaptured, handleMouseMove, handleMouseUp]);

  const showDragHint = escapeCount >= 3 && !isCaptured;

  return (
    <div ref={containerRef} className="relative w-full max-w-xs h-32 flex items-center justify-center">
      {showDragHint && (
        <div className="absolute -top-8 left-0 right-0 text-center text-sm text-primary animate-pulse">
          버튼을 중앙으로 드래그 해주세요!
        </div>
      )}
      <Button
        ref={buttonRef}
        onClick={isCaptured || escapeCount < 3 ? undefined : onClick}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        disabled={disabled}
        size="lg"
        className={`
          w-full h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/40 
          hover:shadow-xl hover:shadow-primary/50 transition-all bg-gradient-to-r from-primary to-accent
          ${isEscaping && !isCaptured ? "cursor-grab active:cursor-grabbing" : "hover:scale-105"}
          ${showDragHint ? "cursor-grab" : ""}
        `}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging.current ? "none" : "transform 0.3s ease-out",
        }}
      >
        <Heart className="w-5 h-5 mr-2 fill-current" />
        {isCaptured ? "잡았다! 시작하기" : showDragHint ? "나를 잡아봐!" : "테스트 시작하기"}
      </Button>
    </div>
  );
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const handleStart = () => {
    onStart(name, gender);
  };

  const isFormValid = name.trim().length > 0 && gender.length > 0;

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

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Icon */}
        <div className="mb-6 relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/40">
            <Heart className="w-12 h-12 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-bounce shadow-md">
            <span className="text-sm">{"<3"}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
          개발자 이상형 테스트
        </h1>
        <p className="text-lg text-primary font-medium mb-4">
          Developer Ideal Type Test
        </p>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
          당신에게 딱 맞는 프로그래밍 언어 이상형은?
        </p>

        {/* Input Form */}
        <div className="w-full space-y-4 mb-6 bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 shadow-sm">
          <div className="space-y-2 text-left">
            <Label htmlFor="name" className="text-sm font-medium">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl border-primary/20 focus:border-primary"
            />
          </div>
          <div className="space-y-2 text-left">
            <Label className="text-sm font-medium">성별</Label>
            <div className="flex gap-3">
              {[
                { value: "male", label: "남성" },
                { value: "female", label: "여성" },
                { value: "other", label: "기타" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGender(option.value)}
                  className={`
                    flex-1 h-12 rounded-xl border-2 font-medium transition-all
                    ${gender === option.value 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-primary/20 bg-background hover:border-primary/40"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6 text-sm">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">21</div>
            <div className="text-xs text-muted-foreground">질문</div>
          </div>
          <div className="w-px bg-primary/20" />
          <div className="text-center">
            <div className="text-xl font-bold text-primary">5분</div>
            <div className="text-xs text-muted-foreground">소요시간</div>
          </div>
          <div className="w-px bg-primary/20" />
          <div className="text-center">
            <div className="text-xl font-bold text-primary">9</div>
            <div className="text-xs text-muted-foreground">유형</div>
          </div>
        </div>

        {/* Escaping Start Button */}
        <EscapingButton onClick={handleStart} disabled={!isFormValid} />

        {!isFormValid && (
          <p className="text-xs text-muted-foreground mt-4">
            이름과 성별을 입력해주세요
          </p>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          결과는 재미로만 봐주세요 :)
        </p>
      </div>
    </div>
  );
}
