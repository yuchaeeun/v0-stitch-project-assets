"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { results, type DeveloperType, type DeveloperResult } from "@/lib/quiz-data";
import {
  Palette,
  Server,
  Layers,
  Cloud,
  Smartphone,
  BarChart3,
  Share2,
  RotateCcw,
  Heart,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultScreenProps {
  resultType: DeveloperType;
  onRestart: () => void;
}

const iconMap = {
  Palette: Palette,
  Server: Server,
  Layers: Layers,
  Cloud: Cloud,
  Smartphone: Smartphone,
  BarChart: BarChart3,
};

const colorMap: Record<string, string> = {
  "from-pink-500 to-rose-500": "bg-gradient-to-br from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500": "bg-gradient-to-br from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500": "bg-gradient-to-br from-violet-500 to-purple-500",
  "from-orange-500 to-amber-500": "bg-gradient-to-br from-orange-500 to-amber-500",
  "from-green-500 to-emerald-500": "bg-gradient-to-br from-green-500 to-emerald-500",
  "from-teal-500 to-cyan-500": "bg-gradient-to-br from-teal-500 to-cyan-500",
};

export function ResultScreen({ resultType, onRestart }: ResultScreenProps) {
  const result: DeveloperResult = results[resultType];
  const IconComponent = iconMap[result.icon as keyof typeof iconMap] || Palette;
  const gradientClass = colorMap[result.color] || "bg-gradient-to-br from-primary to-accent";

  const handleShare = async () => {
    const shareText = `나의 개발자 이상형은 "${result.titleKo}" 입니다! 🧑‍💻\n\n개발자 이상형 테스트로 당신의 유형을 알아보세요!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "개발자 이상형 테스트 결과",
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText + "\n" + window.location.href);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 pb-10">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          분석 완료!
        </div>
      </div>

      {/* Result Card */}
      <Card className="max-w-md mx-auto w-full overflow-hidden shadow-xl">
        {/* Gradient Header */}
        <div className={cn("p-8 text-center text-white", gradientClass)}>
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <p className="text-white/80 text-sm mb-1">당신의 개발자 이상형은</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{result.titleKo}</h1>
          <p className="text-white/80">{result.title}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-foreground leading-relaxed">{result.descriptionKo}</p>
          </div>

          {/* Traits */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              주요 특성
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.traitsKo.map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">환상의 짝꿍</p>
                <p className="font-semibold text-foreground">{result.compatibilityKo}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto w-full mt-8 space-y-3">
        <Button
          onClick={handleShare}
          className="w-full h-14 text-lg font-semibold rounded-2xl"
          size="lg"
        >
          <Share2 className="w-5 h-5 mr-2" />
          결과 공유하기
        </Button>
        <Button
          onClick={onRestart}
          variant="outline"
          className="w-full h-12 rounded-2xl"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          다시 테스트하기
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-xs text-muted-foreground">
          결과는 재미로만 봐주세요 :)
        </p>
      </div>
    </div>
  );
}
