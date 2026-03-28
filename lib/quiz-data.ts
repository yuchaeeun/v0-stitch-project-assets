export type LanguageType =
  | "python"
  | "javascript"
  | "java"
  | "csharp"
  | "cpp"
  | "typescript"
  | "rust"
  | "swift"
  | "notfound";

export interface QuestionOption {
  text: string;
  languages: LanguageType[];
}

export interface Question {
  id: number;
  part: string;
  question: string;
  options: [QuestionOption, QuestionOption];
}

export interface LanguageResult {
  type: LanguageType;
  title: string;
  subtitle: string;
  quote: string;
  quoteAlt?: string;
  description: string;
  color: string;
  icon: string;
}

export const questions: Question[] = [
  // 파트 1: 첫인상과 소통 스타일
  {
    id: 1,
    part: "첫인상과 소통 스타일",
    question: "연인의 옷 스타일이 매번 다르다면?",
    options: [
      { text: "예측할 수 없어서 더 끌려..", languages: ["javascript", "swift"] },
      { text: "변함없는 게 더 좋아. 10년째 변함없는 수트 스타일이 더 좋은걸?", languages: ["java", "csharp"] },
    ],
  },
  {
    id: 2,
    part: "첫인상과 소통 스타일",
    question: "연인과 대화 스타일은?",
    options: [
      { text: '"말하지 않아도 다 알아. 넌 내 마음의 가독성 1위니까"', languages: ["python", "javascript"] },
      { text: '"모호한 말 대신 명확하게 말해줘. 애매한 말은 Syntax Error 일 뿐"', languages: ["cpp", "rust", "typescript"] },
    ],
  },
  {
    id: 3,
    part: "첫인상과 소통 스타일",
    question: "단둘이 있을 때의 유머는?",
    options: [
      { text: "선을 가끔 넘지만 웃겨. 후회는 나중에", languages: ["javascript"] },
      { text: "예의 없는 드립은 내 사전엔 없어. 농담도 선을 지켜서 해줘.", languages: ["java", "typescript"] },
    ],
  },
  {
    id: 4,
    part: "첫인상과 소통 스타일",
    question: "우리만의 '비밀 암호'?",
    options: [
      { text: "오직 너와 나만 부를 수 있는 암호가 있다면 너무 설레..", languages: ["cpp", "swift"] },
      { text: "그런 건 유치해.", languages: ["python"] },
    ],
  },
  // 파트 2: 갈등 해결과 안정성
  {
    id: 5,
    part: "갈등 해결과 안정성",
    question: "싸웠을 때 연인의 태도는?",
    options: [
      { text: "미안해, 내가 다 잘못했어.", languages: ["python"] },
      { text: "왜 화가 난거야? 이유를 말해줘. 근본 원인 없는 사과는 안 받아.", languages: ["cpp", "rust"] },
    ],
  },
  {
    id: 6,
    part: "갈등 해결과 안정성",
    question: "연인이 나에게 잔소리를 한다면?",
    options: [
      { text: "오타 하나도 그냥 못 넘어감. 말투 하나, 눈빛 하나에도 엄격한 타입", languages: ["typescript", "rust"] },
      { text: "결과만 좋으면 됐지. 사소한 경고는 우리 사랑을 멈출 수 없어.", languages: ["javascript", "python"] },
    ],
  },
  {
    id: 7,
    part: "갈등 해결과 안정성",
    question: "갑작스러운 돌발 상황이 생겼을 때?",
    options: [
      { text: "그 자리에서 고쳐줄게. 난 실시간으로 사랑을 Hotfix 하거든", languages: ["javascript"] },
      { text: "이미 모든 경우의 수를 다 따져봤지. 플랜 B, C, D까지 있어. 걱정마.", languages: ["java", "csharp"] },
    ],
  },
  {
    id: 8,
    part: "갈등 해결과 안정성",
    question: "연인이 나를 구속하는 정도는?",
    options: [
      { text: "어디서 누구와 뭘 하는지 전부 알려줘. 숨기는 게 있는 사랑은 취약할 뿐.", languages: ["rust", "cpp"] },
      { text: "널 믿어. 그렇지만, 네 행동은 네가 책임져.", languages: ["javascript", "python"] },
    ],
  },
  // 파트 3: 데이트와 라이프스타일
  {
    id: 9,
    part: "데이트와 라이프스타일",
    question: "데이트 코스 스타일은?",
    options: [
      { text: "요즘 핫한 건 내가 다 찾아뒀어. 두쫀쿠? 봄동비빔밥? 버터떡? 말만 해.", languages: ["javascript", "swift"] },
      { text: "난 이미 검증된 맛집만 데려가. 괜한 시도하다가 데이트를 망칠 순 없잖아?", languages: ["java", "csharp"] },
    ],
  },
  {
    id: 10,
    part: "데이트와 라이프스타일",
    question: "연인의 취미 생활은?",
    options: [
      { text: "이것저것 다 해보는 호기심 많은 스타일 — 완성은 나중에", languages: ["python", "javascript"] },
      { text: "한 분야의 끝판왕. 전문가인 나 어때?", languages: ["cpp", "swift"] },
    ],
  },
  {
    id: 11,
    part: "데이트와 라이프스타일",
    question: "기념일 챙기는 방식은?",
    options: [
      { text: "널 감동시킬 서프라이즈 이벤트 계획서 10장 준비완료.", languages: ["csharp", "swift"] },
      { text: "내 진심을 담아 밤새 직접 널 위한 편지를 작성했어.", languages: ["python", "java"] },
    ],
  },
  {
    id: 12,
    part: "데이트와 라이프스타일",
    question: "여행 스타일은?",
    options: [
      { text: "무계획이 계획. 발길이 닿는 대로 가는거야.", languages: ["javascript"] },
      { text: "분 단위 일정표를 A4용지로 출력해 전달. 수정 시 여행은 종료야.", languages: ["typescript", "java"] },
    ],
  },
  // 파트 4: 가치관과 미래
  {
    id: 13,
    part: "가치관과 미래",
    question: "경제 관념은?",
    options: [
      { text: "인생은 한번뿐! 일단 질러!", languages: ["javascript"] },
      { text: "새는 구멍없이 자산 관리. 적금은 확실하게.", languages: ["java", "csharp"] },
    ],
  },
  {
    id: 14,
    part: "가치관과 미래",
    question: "연인의 커리어는?",
    options: [
      { text: "대기업의 안정적인 연봉 어때? 절대 짤리지 않는 안정감을 줄게.", languages: ["java", "csharp"] },
      { text: "지금은 작은 스타트업이지만, 내 가치는 무궁무진해. 나를 Import 해볼래?", languages: ["python", "swift"] },
    ],
  },
  {
    id: 15,
    part: "가치관과 미래",
    question: "함께 성장하는 방식은?",
    options: [
      { text: "네 실수는 내가 Code Review 해줄게. 우린 서로를 최적화하는 사이니까.", languages: ["typescript", "rust"] },
      { text: "잘했어. 응원이 최고의 성능 향상이지. 넌 존재 자체로 뛰어나.", languages: ["python"] },
    ],
  },
  {
    id: 16,
    part: "가치관과 미래",
    question: '"나 사랑해?" 라는 질문에 대한 연인의 대답은?',
    options: [
      { text: '"당연하지. 내 마음은 immutable이야. 절대 변하지 않아"', languages: ["java", "csharp"] },
      { text: '"어제보다 오늘 1.25배 더. 부동소수점 오차만큼 조금 더 널 좋아해"', languages: ["python", "javascript"] },
    ],
  },
  // 파트 5: 만우절 킹받는 최종 질문
  {
    id: 17,
    part: "만우절 킹받는 최종 질문",
    question: "연인이 갑자기 암호 같은 카톡을 보낸다면?",
    options: [
      { text: "나도 암호로 답장한다.", languages: ["javascript"] },
      { text: "무슨 말이야?", languages: ["cpp", "rust"] },
    ],
  },
  {
    id: 18,
    part: "만우절 킹받는 최종 질문",
    question: "데이트 중 길을 잃었다면?",
    options: [
      { text: "길을 잃은 게 아냐. 우린 지금 새로운 영역을 탐험하는 중인거야.", languages: ["python"] },
      { text: "이 경로는 내 설계엔 없었는데? 이 접근은 사절이야.", languages: ["cpp", "java"] },
    ],
  },
  {
    id: 19,
    part: "만우절 킹받는 최종 질문",
    question: "내가 연인의 생일을 잊어버렸을 때 연인의 반응은..?",
    options: [
      { text: "서운하지만 다음엔 캘린더 API 연동해줘..", languages: ["typescript"] },
      { text: "요새 신경 쓸 틈이 없었나봐? 시간을 내던지 뇌 용량을 업그레이드 해봐.", languages: ["cpp", "rust"] },
    ],
  },
  {
    id: 20,
    part: "만우절 킹받는 최종 질문",
    question: "우리 궁합을 점수로 매긴다면?",
    options: [
      { text: "99점. 나머지 1점은 같이 채워가는 거지", languages: ["python", "java"] },
      { text: "0x64점. 즉 100점임. 설명 끝", languages: ["cpp", "csharp"] },
    ],
  },
  {
    id: 21,
    part: "만우절 킹받는 최종 질문",
    question: "연인에게 가장 듣고 싶은 말은?",
    options: [
      { text: '"너는 내 인생의 main() 함수야. 너 없이는 나라는 시스템은 구동조차 안 돼"', languages: ["cpp", "java"] },
      { text: '"너라는 라이브러리 없이는 나는 그저 텅빈 Hello World야"', languages: ["python", "javascript"] },
    ],
  },
];

export const results: Record<LanguageType, LanguageResult> = {
  python: {
    type: "python",
    title: "Python",
    subtitle: "다정다감 해결사",
    quote: '"이거 import 하면 나랑 사귀는 거다?"',
    description:
      "당신의 복잡하고 얽힌 일상을 단 몇 줄의 대화로 심플하게 정리해 줄 만능 해결사입니다. 누구에게나 친절하고 이해하기 쉬운 성격으로, 당신이 힘들 때마다 필요한 위로와 해결책을 척척 import 해서 선물해 줄 거예요. \"코드는 읽기 쉬워야 한다\"는 철학처럼, 당신의 마음을 읽는 데에도 천부적인 재능이 있습니다. 가끔은 너무 여유로워 보여 긴장감이 없을 수 있지만, 그건 당신을 위해 자신의 내부적인 복잡함을 모두 추상화하여 숨겼기 때문이랍니다. 언제 어디서든 당신이 호출만 하면 달려와 줄 가장 따뜻한 인터프리터 같은 연인입니다.",
    color: "from-yellow-400 to-blue-500",
    icon: "python",
  },
  javascript: {
    type: "javascript",
    title: "JavaScript",
    subtitle: "트렌디한 자유영혼",
    quote: '"이 Event 안에 너 있다."',
    description:
      "매일 새로운 프레임워크처럼 변신하며 당신을 지루할 틈 없게 만드는 트렌드 세터입니다. 웹의 어디에나 존재하듯 당신의 일상 모든 곳에 스며들어 활력을 불어넣죠. 당신의 아주 작은 반응(Event)에도 실시간으로 응답하며, 때로는 비동기적으로 예상치 못한 감동을 주기도 합니다. 유연함이 무기라 어떤 상황에서도 당신에게 맞춰줄 준비가 되어 있지만, 가끔은 너무 많은 이벤트가 발생해 당신을 정신없게 만들지도 몰라요. 하지만 그 역동적인 에너지와 화려한 퍼포먼스는 당신의 세상을 누구보다 화려한 인터랙티브 아트로 만들어 줄 것입니다.",
    color: "from-yellow-400 to-yellow-600",
    icon: "javascript",
  },
  java: {
    type: "java",
    title: "Java",
    subtitle: "확신의 결혼상대",
    quote: '"저 사람이 내 Object 다, 저 사람이 내 Class 다. 왜 말을 못하냐고!"',
    description:
      "가벼운 만남보다는 튼튼한 미래를 설계하는 데 진심인 타입입니다. 첫인상은 다소 딱딱하고 규칙이 많아 고지식해 보일 수 있지만, 한 번 시작한 관계(Project)는 절대 중도 포기하지 않는 강직한 책임감을 가졌죠. \"한 번 작성하면 어디서든 돌아간다\"는 원칙처럼, 당신이 어디에 있든 변치 않는 사랑을 줄 준비가 되어 있습니다. 당신과의 미래를 객체지향적으로 꼼꼼하게 설계하고, 예기치 못한 갈등(Exception)조차 완벽하게 핸들링하며 안정적인 배포(결혼)까지 책임질 가장 듬직한 인생의 파트너입니다.",
    color: "from-red-500 to-orange-500",
    icon: "java",
  },
  csharp: {
    type: "csharp",
    title: "C#",
    subtitle: "엘리트 완벽주의자",
    quote: '"우리 인터페이스 완벽하지않아? 너랑 나랑 Build 한 번 눌러볼까."',
    description:
      "세련된 정장처럼 깔끔하고 스마트한 매너를 자랑합니다. 당신과의 데이트 코스부터 기념일 챙기기까지, 모든 과정을 닷넷 프레임워크처럼 체계적이고 매끄럽게 관리하죠. 논리적이고 깔끔한 화법으로 당신의 고민을 정리해 주며, 어떤 예외 상황이 닥쳐도 당황하지 않고 우아하게 해결책을 제시합니다. 세련된 도시적 감성과 탄탄한 능력을 동시에 갖춘 이 사람은, 당신의 평범한 일상을 윈도우 배경화면처럼 아름답고 안정적으로 유지해 줄 가장 현대적인 연인입니다.",
    color: "from-purple-600 to-violet-600",
    icon: "csharp",
  },
  cpp: {
    type: "cpp",
    title: "C++",
    subtitle: "츤데레 뇌섹남/녀",
    quote: '"코드가 좋아서, 코드가 좋지 않아서. 너와 함께한 모든 Memory가 눈부셨다."',
    description:
      "겉으로는 차갑고 냉철한 실력자처럼 보이지만, 사실 속마음은 누구보다 깊고 섬세한 '츤데레'입니다. 당신의 아주 작은 습관까지 메모리 단위로 기억(Memory)하고, 주소(Address)를 찾아가듯 당신의 진심을 정확히 꿰뚫어 보죠. 다가가기까지 다소 시간이 걸리고 까다로울 수 있지만, 한 번 소중한 사람으로 등록되면 자신의 모든 리소스를 할당해 헌신합니다. 성능 최적화에 목숨 거는 이 사람처럼, 당신에게 가장 최고의 효율과 깊은 사랑을 줄 준비가 된, 알면 알수록 진국인 사람입니다.",
    color: "from-blue-600 to-blue-800",
    icon: "cpp",
  },
  typescript: {
    type: "typescript",
    title: "TypeScript",
    subtitle: "섬세한 잔소리꾼",
    quote: '"혹시.. 나 너 Type Check 하고 있냐?"',
    description:
      "당신이 실수하거나 상처받지 않도록 사소한 것 하나하나 챙겨주는 세밀한 연인입니다. 때로는 \"밥은 먹었니?\", \"차 조심해\" 같은 잔소리가 '타입 체크'처럼 엄격하게 느껴질 수 있지만, 사실 당신의 삶에 치명적인 오류(Runtime Error)가 생기지 않기를 바라는 깊은 애정의 표현이죠. 당신의 불확실한 미래를 명확한 타입으로 정의해 주며, 어떤 돌발 상황에서도 당신을 안전하게 가이드합니다. 당신이 더 나은 사람이 될 수 있도록 곁에서 꼼꼼하게 컴파일해 주는, 세상에서 가장 다정한 모범생입니다.",
    color: "from-blue-500 to-blue-700",
    icon: "typescript",
  },
  rust: {
    type: "rust",
    title: "Rust",
    subtitle: "철벽 과보호론자",
    quote: '"한눈팔지 마. 내 Ownership 안이 제일 안전해."',
    description:
      "당신을 향한 독점욕과 소유권(Ownership)이 조금 강하게 느껴질지도 모릅니다. 하지만 그것은 당신을 세상의 온갖 풍파와 에러로부터 완벽하게 격리해 지켜내기 위한 철저한 보호 본능입니다. 당신에게 상처(Memory Leak)가 날 상황을 절대 허락하지 않으며, 단 하나의 논리적 결점도 용납하지 않는 철벽 수호자이죠. 처음엔 조금 답답할 정도로 엄격해 보일 수 있지만, 그 경계 안으로 들어가는 순간 당신은 세상에서 가장 안전하고 견고한 사랑을 받게 될 것입니다.",
    color: "from-orange-600 to-red-600",
    icon: "rust",
  },
  swift: {
    type: "swift",
    title: "Swift",
    subtitle: "감성충만 전문직",
    quote: '"내 인생의 Main Storyboard 주인공은 너야."',
    description:
      "독보적인 감각과 세련된 비주얼을 자랑하는 '애플' 감성의 예술가 스타일입니다. 누구나 좋아할 만한 화려한 외모와는 달리, 오직 당신 한 사람에게만 최적화된 로맨틱한 일상을 설계하는 지독한 순애보를 가졌습니다. 당신과의 매 순간을 한 폭의 화보 같은 UI로 그려내며, 가장 현대적이고 트렌디한 방식으로 사랑을 표현합니다. 특정 분야의 전문직처럼 자신의 일과 사랑에 대한 자부심이 강하며, 오직 당신이라는 단 하나의 타겟 디바이스에만 자신의 모든 열정을 쏟아붓는 감성적인 연인입니다.",
    color: "from-orange-500 to-pink-500",
    icon: "swift",
  },
  notfound: {
    type: "notfound",
    title: "404 NOT FOUND",
    subtitle: "상상속의 유니콘",
    quote: '"Error 404: 현실을 직시하세요"',
    description:
      "축하합니다! 당신은 이 세상 어떤 알고리즘으로도 정의할 수 없는 유니콘 같은 이상형을 꿈꾸고 계시군요. 다정하면서도 냉철하고, 자유로우면서도 책임감 넘치는 그 완벽한 존재는 안타깝게도 현재 서버상에 존재하지 않습니다. 혹시 테스트 도중 모든 질문에 '보통이다'라고 답하며 진심을 숨기진 않으셨나요? 시스템은 당신의 거짓된 데이터에 응답하지 않습니다. 잠시 웹 브라우저를 끄고 거울을 보며 당신 곁의 평범하지만 소중한 사람들을 떠올려 보세요. (만우절이니까요! 다시 한 번 진심을 담아 테스트해 보시겠어요?)",
    color: "from-gray-500 to-gray-700",
    icon: "notfound",
  },
};

export function calculateResult(answers: LanguageType[][]): LanguageType {
  const counts: Record<LanguageType, number> = {
    python: 0,
    javascript: 0,
    java: 0,
    csharp: 0,
    cpp: 0,
    typescript: 0,
    rust: 0,
    swift: 0,
    notfound: 0,
  };

  // Count each language selected
  answers.forEach((selectedLanguages) => {
    selectedLanguages.forEach((lang) => {
      counts[lang]++;
    });
  });

  // Find the highest scoring language(s)
  const maxScore = Math.max(...Object.values(counts).filter((v) => v > 0));
  
  // If no clear winner or all scores are very low/equal, return 404
  if (maxScore === 0) {
    return "notfound";
  }

  const topLanguages = Object.entries(counts)
    .filter(([_, score]) => score === maxScore)
    .map(([lang]) => lang as LanguageType);

  // If there's a tie, pick the first one (or could randomize)
  // But if there are too many ties, it might indicate indecisive answers
  if (topLanguages.length >= 4) {
    return "notfound";
  }

  return topLanguages[0];
}
