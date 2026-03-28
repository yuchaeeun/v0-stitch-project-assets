"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// Mini-game 1: Escaping "Next" button
interface EscapingNextButtonProps {
  onComplete: () => void;
}

export function EscapingNextButton({ onComplete }: EscapingNextButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [isCaptured, setIsCaptured] = useState(false);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseEnter = useCallback(() => {
    if (isCaptured || escapeCount >= 5) return;
    
    setEscapeCount(prev => prev + 1);
    
    const container = containerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 120;
    const maxY = containerRect.height - 50;
    
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    setPosition({ x: newX, y: newY });
  }, [isCaptured, escapeCount]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (escapeCount < 5 || isCaptured) return;
    
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
    
    if (Math.abs(position.x) < 40 && Math.abs(position.y) < 40) {
      setIsCaptured(true);
      setPosition({ x: 0, y: 0 });
      setTimeout(onComplete, 500);
    }
  }, [position, onComplete]);

  useEffect(() => {
    if (escapeCount >= 5 && !isCaptured) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [escapeCount, isCaptured, handleMouseMove, handleMouseUp]);

  const showDragHint = escapeCount >= 5 && !isCaptured;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div ref={containerRef} className="relative w-80 h-60 flex flex-col items-center justify-center">
        <p className="text-lg font-medium text-foreground mb-8 text-center">
          {showDragHint 
            ? "버튼을 중앙으로 드래그 해주세요!" 
            : isCaptured 
              ? "잡았다!" 
              : "다음으로 버튼을 눌러주세요!"
          }
        </p>
        <Button
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          onClick={isCaptured ? onComplete : undefined}
          className={`
            px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium
            ${showDragHint ? "cursor-grab active:cursor-grabbing" : ""}
            ${isCaptured ? "animate-pulse" : ""}
          `}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging.current ? "none" : "transform 0.2s ease-out",
          }}
        >
          {isCaptured ? "계속하기" : "다음으로"}
        </Button>
      </div>
    </div>
  );
}

// Mini-game 2: Foggy screen scratch
interface FoggyScreenProps {
  onComplete: () => void;
}

export function FoggyScreen({ onComplete }: FoggyScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cleared, setCleared] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fill with foggy gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, "rgba(255, 200, 220, 0.95)");
    gradient.addColorStop(1, "rgba(220, 180, 200, 0.98)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add "Scratch here" text
    ctx.fillStyle = "rgba(150, 100, 120, 0.6)";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("화면을 문질러서 김서림을 닦아주세요!", canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    // Calculate cleared percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clearedPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) clearedPixels++;
    }
    const percentage = (clearedPixels / (canvas.width * canvas.height)) * 100;
    setCleared(Math.round(percentage));

    if (percentage > 40 && !isComplete) {
      setIsComplete(true);
      setTimeout(onComplete, 800);
    }
  }, [onComplete, isComplete]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  }, [scratch]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  }, [scratch]);

  return (
    <div className="fixed inset-0 z-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={() => { isDrawing.current = true; }}
        onMouseUp={() => { isDrawing.current = false; }}
        onMouseLeave={() => { isDrawing.current = false; }}
        onMouseMove={handleMouseMove}
        onTouchStart={() => { isDrawing.current = true; }}
        onTouchEnd={() => { isDrawing.current = false; }}
        onTouchMove={handleTouchMove}
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur px-6 py-3 rounded-full">
        <p className="text-sm font-medium">
          {isComplete ? "깨끗해졌어요!" : `${cleared}% 닦음`}
        </p>
      </div>
    </div>
  );
}

// Mini-game 3: Heart beat tapping
interface HeartBeatGameProps {
  onComplete: () => void;
}

export function HeartBeatGame({ onComplete }: HeartBeatGameProps) {
  const [beats, setBeats] = useState(0);
  const [scale, setScale] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const targetBeats = 15;
  const lastTap = useRef(0);

  const handleTap = useCallback(() => {
    if (isComplete) return;
    
    const now = Date.now();
    // Prevent too fast tapping (spam protection)
    if (now - lastTap.current < 100) return;
    lastTap.current = now;

    setBeats(prev => {
      const newBeats = prev + 1;
      if (newBeats >= targetBeats) {
        setIsComplete(true);
        setTimeout(onComplete, 800);
      }
      return newBeats;
    });

    // Heart beat animation
    setScale(1.3);
    setTimeout(() => setScale(1), 150);
  }, [isComplete, onComplete]);

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <p className="text-lg font-medium text-foreground mb-4 text-center">
        {isComplete ? "사랑을 충전했어요!" : "하트를 연타해서 심장을 뛰게 해주세요!"}
      </p>
      
      <p className="text-sm text-muted-foreground mb-8">
        {beats} / {targetBeats} beats
      </p>

      <button
        onClick={handleTap}
        className="relative focus:outline-none"
        disabled={isComplete}
      >
        <Heart
          className={`
            w-32 h-32 text-primary fill-primary transition-transform duration-150
            ${isComplete ? "animate-pulse" : ""}
          `}
          style={{ transform: `scale(${scale})` }}
        />
        {!isComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-2xl">
              TAP!
            </span>
          </div>
        )}
      </button>

      {/* Progress bar */}
      <div className="w-48 h-2 bg-secondary rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-200"
          style={{ width: `${(beats / targetBeats) * 100}%` }}
        />
      </div>
    </div>
  );
}

export type MiniGameType = "escaping" | "foggy" | "heartbeat";

export const miniGameQuestions: number[] = [3, 5, 8, 10, 12, 14, 16, 18, 19, 21];

export function getMiniGameForQuestion(questionNum: number): MiniGameType | null {
  const index = miniGameQuestions.indexOf(questionNum);
  if (index === -1) return null;
  
  const games: MiniGameType[] = ["escaping", "foggy", "heartbeat"];
  return games[index % 3];
}
