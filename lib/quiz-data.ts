export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    type: DeveloperType;
  }[];
}

export type DeveloperType = 
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'devops'
  | 'mobile'
  | 'data';

export interface DeveloperResult {
  type: DeveloperType;
  title: string;
  titleKo: string;
  description: string;
  descriptionKo: string;
  traits: string[];
  traitsKo: string[];
  compatibility: DeveloperType;
  compatibilityKo: string;
  color: string;
  icon: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "새로운 프로젝트를 시작할 때 가장 먼저 하고 싶은 것은?",
    options: [
      { text: "예쁜 UI/UX 디자인 구상하기", type: "frontend" },
      { text: "데이터베이스 구조 설계하기", type: "backend" },
      { text: "배포 파이프라인 먼저 구축하기", type: "devops" },
      { text: "전체 아키텍처 그려보기", type: "fullstack" },
    ],
  },
  {
    id: 2,
    question: "버그를 발견했을 때 당신의 반응은?",
    options: [
      { text: "콘솔창을 열어 디버깅 시작", type: "frontend" },
      { text: "로그 파일부터 확인", type: "backend" },
      { text: "모니터링 대시보드 확인", type: "devops" },
      { text: "데이터 흐름 추적", type: "data" },
    ],
  },
  {
    id: 3,
    question: "가장 설레는 순간은?",
    options: [
      { text: "애니메이션이 부드럽게 동작할 때", type: "frontend" },
      { text: "API 응답 속도가 빨라졌을 때", type: "backend" },
      { text: "앱이 앱스토어에 등록됐을 때", type: "mobile" },
      { text: "데이터에서 인사이트를 발견했을 때", type: "data" },
    ],
  },
  {
    id: 4,
    question: "팀 프로젝트에서 맡고 싶은 역할은?",
    options: [
      { text: "사용자와 가장 가까운 화면 개발", type: "frontend" },
      { text: "안정적인 서버 로직 구현", type: "backend" },
      { text: "앱의 모든 것을 관리", type: "mobile" },
      { text: "시스템 전체를 아우르는 설계", type: "fullstack" },
    ],
  },
  {
    id: 5,
    question: "주말에 사이드 프로젝트를 한다면?",
    options: [
      { text: "인터랙티브한 포트폴리오 사이트", type: "frontend" },
      { text: "유용한 API 서비스", type: "backend" },
      { text: "나만의 앱 만들기", type: "mobile" },
      { text: "데이터 분석 대시보드", type: "data" },
    ],
  },
  {
    id: 6,
    question: "새로운 기술을 배울 때 선호하는 방식은?",
    options: [
      { text: "튜토리얼 따라 UI 만들어보기", type: "frontend" },
      { text: "공식 문서 정독하기", type: "backend" },
      { text: "실제 서비스에 바로 적용해보기", type: "devops" },
      { text: "작은 프로토타입 앱 만들기", type: "mobile" },
    ],
  },
  {
    id: 7,
    question: "가장 좋아하는 도구는?",
    options: [
      { text: "Figma / 디자인 툴", type: "frontend" },
      { text: "터미널 / CLI", type: "backend" },
      { text: "Xcode / Android Studio", type: "mobile" },
      { text: "Jupyter Notebook", type: "data" },
    ],
  },
  {
    id: 8,
    question: "코드 리뷰에서 가장 신경 쓰는 부분은?",
    options: [
      { text: "컴포넌트 재사용성", type: "frontend" },
      { text: "코드 효율성과 성능", type: "backend" },
      { text: "배포 안정성", type: "devops" },
      { text: "데이터 정확성", type: "data" },
    ],
  },
];

export const results: Record<DeveloperType, DeveloperResult> = {
  frontend: {
    type: "frontend",
    title: "Frontend Developer",
    titleKo: "프론트엔드 개발자",
    description: "You have a keen eye for design and user experience. Creating beautiful, interactive interfaces brings you joy.",
    descriptionKo: "디자인과 사용자 경험에 대한 예리한 눈을 가지고 있어요. 아름답고 인터랙티브한 인터페이스를 만드는 것에서 기쁨을 느껴요.",
    traits: ["Creative", "Detail-oriented", "User-focused", "Visual thinker"],
    traitsKo: ["창의적", "디테일 중시", "사용자 중심", "시각적 사고"],
    compatibility: "backend",
    compatibilityKo: "백엔드 개발자",
    color: "from-pink-500 to-rose-500",
    icon: "Palette",
  },
  backend: {
    type: "backend",
    title: "Backend Developer",
    titleKo: "백엔드 개발자",
    description: "You love building robust systems and solving complex problems. Data structures and algorithms are your playground.",
    descriptionKo: "견고한 시스템을 구축하고 복잡한 문제를 해결하는 것을 좋아해요. 자료구조와 알고리즘이 당신의 놀이터예요.",
    traits: ["Logical", "Systematic", "Problem-solver", "Efficient"],
    traitsKo: ["논리적", "체계적", "문제 해결사", "효율 추구"],
    compatibility: "frontend",
    compatibilityKo: "프론트엔드 개발자",
    color: "from-blue-500 to-cyan-500",
    icon: "Server",
  },
  fullstack: {
    type: "fullstack",
    title: "Fullstack Developer",
    titleKo: "풀스택 개발자",
    description: "You see the big picture and can work on all layers of an application. Versatility is your superpower.",
    descriptionKo: "큰 그림을 보고 애플리케이션의 모든 레이어에서 작업할 수 있어요. 다재다능함이 당신의 초능력이에요.",
    traits: ["Versatile", "Big-picture thinker", "Adaptable", "Independent"],
    traitsKo: ["다재다능", "큰 그림 사고", "적응력", "독립적"],
    compatibility: "devops",
    compatibilityKo: "DevOps 엔지니어",
    color: "from-violet-500 to-purple-500",
    icon: "Layers",
  },
  devops: {
    type: "devops",
    title: "DevOps Engineer",
    titleKo: "DevOps 엔지니어",
    description: "You love automation and making things run smoothly. Infrastructure and deployment are your domain.",
    descriptionKo: "자동화를 사랑하고 모든 것이 원활하게 돌아가도록 만드는 것을 좋아해요. 인프라와 배포가 당신의 영역이에요.",
    traits: ["Automation-focused", "Reliable", "Process-oriented", "Scalable thinker"],
    traitsKo: ["자동화 중심", "신뢰성", "프로세스 지향", "확장성 사고"],
    compatibility: "fullstack",
    compatibilityKo: "풀스택 개발자",
    color: "from-orange-500 to-amber-500",
    icon: "Cloud",
  },
  mobile: {
    type: "mobile",
    title: "Mobile Developer",
    titleKo: "모바일 개발자",
    description: "You love creating apps that people carry in their pockets. Native experiences and smooth performance matter to you.",
    descriptionKo: "사람들이 주머니에 넣고 다니는 앱을 만드는 것을 좋아해요. 네이티브 경험과 부드러운 성능이 중요해요.",
    traits: ["User-centric", "Performance-focused", "Platform-aware", "Detail-driven"],
    traitsKo: ["사용자 중심", "성능 중시", "플랫폼 이해", "디테일 추구"],
    compatibility: "backend",
    compatibilityKo: "백엔드 개발자",
    color: "from-green-500 to-emerald-500",
    icon: "Smartphone",
  },
  data: {
    type: "data",
    title: "Data Engineer/Scientist",
    titleKo: "데이터 엔지니어",
    description: "You find stories in numbers and love extracting insights from data. Analytics and visualization are your tools.",
    descriptionKo: "숫자 속에서 이야기를 찾고 데이터에서 인사이트를 추출하는 것을 좋아해요. 분석과 시각화가 당신의 도구예요.",
    traits: ["Analytical", "Curious", "Pattern-finder", "Data-driven"],
    traitsKo: ["분석적", "호기심", "패턴 발견", "데이터 기반"],
    compatibility: "fullstack",
    compatibilityKo: "풀스택 개발자",
    color: "from-teal-500 to-cyan-500",
    icon: "BarChart",
  },
};

export function calculateResult(answers: DeveloperType[]): DeveloperType {
  const counts: Record<DeveloperType, number> = {
    frontend: 0,
    backend: 0,
    fullstack: 0,
    devops: 0,
    mobile: 0,
    data: 0,
  };

  answers.forEach((answer) => {
    counts[answer]++;
  });

  return Object.entries(counts).reduce((a, b) => 
    b[1] > counts[a as DeveloperType] ? b[0] as DeveloperType : a
  , 'frontend' as DeveloperType);
}
