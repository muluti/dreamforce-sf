export interface SessionItem {
  id: string;
  d: string; // "2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17"
  s: string; // "08:30"
  e: string; // "08:50"
  title: string;
  place: string;
  type: "personal" | "korea" | "reco";
  tags: string[];
  desc: string;
  why?: string;
  topRank?: number;
  catalogUrl?: string;
}

export interface RecommendationItem {
  rank: number;
  title: string;
  timeText: string;
  tags: string;
  why: string;
  catalogUrl: string;
}

export const DF_SESSION_CATALOG_URL =
  "https://reg.salesforce.com/flow/plus/df26/sessioncatalog/page/catalog";

export const DF_EVENTS: SessionItem[] = [
  // Day 0 (9/14 월)
  {
    id: "df-ev-badge-pickup",
    d: "2026-09-14",
    s: "11:00",
    e: "21:00",
    title: "Badge Pickup (사전 배지 수령)",
    place: "Moscone West · Level 1",
    type: "personal",
    tags: ["여권", "본인 직접 수령"],
    desc: "가능하면 9/14에 미리 수령. General Guest 기준 11:00 AM–9:00 PM. 실물 여권 지참 필수."
  },
  {
    id: "df-ev-korea-night",
    d: "2026-09-14",
    s: "18:00",
    e: "21:00",
    title: "Korea Trailblazers Night (한국 참가자 공식 디너)",
    place: "Bix San Francisco",
    type: "korea",
    tags: ["Korea Program", "Networking"],
    desc: "한국 고객·파트너·직원 대상. 18:00 Check-in → 18:30 Welcome → 20:40 Lucky Draw & Closing. 핑거푸드 & 주류 무제한 제공."
  },

  // Day 1 (9/15 화)
  {
    id: "df-ev-reco-connect",
    d: "2026-09-15",
    s: "08:30",
    e: "08:50",
    title: "Build Salesforce Connect Adapters with Agentforce Vibes",
    place: "Moscone West L1 · Developer Grove",
    type: "reco",
    tags: ["Agentforce", "Claude Code", "Integration"],
    desc: "자연어와 Claude Code로 Salesforce Connect Adapter/Handler를 만드는 세션.",
    why: "비개발자 관점에서도 'AI가 Salesforce 개발을 어떻게 바꾸는가'를 가장 직접적으로 볼 수 있음.",
    topRank: 1
  },
  {
    id: "df-ev-reco-fabric-15",
    d: "2026-09-15",
    s: "12:30",
    e: "12:50",
    title: "Build AI Experiences with Agent Fabric",
    place: "Moscone West L2 · Theater 5",
    type: "reco",
    tags: ["Agent Fabric", "MuleSoft", "Agentic AI"],
    desc: "에이전트·모델·MCP 서버를 찾아 하나의 AI 경험으로 오케스트레이션.",
    why: "MuleSoft/통합 아키텍처와 Agentic AI를 연결해서 보기 좋은 세션.",
    topRank: 2
  },
  {
    id: "df-ev-reco-ai-design",
    d: "2026-09-15",
    s: "13:00",
    e: "13:40",
    title: "5 Steps to Design AI Agents That Deliver True Business Value",
    place: "Moscone West L3 · Room 3020",
    type: "reco",
    tags: ["Agentic AI", "Strategy"],
    desc: "AI Agent를 실제 비즈니스 가치와 연결하는 5단계 프레임워크."
  },
  {
    id: "df-ev-reco-datakits",
    d: "2026-09-15",
    s: "13:30",
    e: "13:50",
    title: "Automate Search and Retrieval Deployments via DataKits",
    place: "Moscone West L1 · Developer Grove",
    type: "reco",
    tags: ["Data 360", "RAG", "DevOps"],
    desc: "Search index·retriever·ingestion 구성을 DataKit으로 배포하고 RAG 환경을 승격.",
    why: "사용자가 관심을 가져온 RAG·Vector·Data 360 구조와 직접 연결됨.",
    topRank: 3
  },
  {
    id: "df-ev-reco-slack-deals",
    d: "2026-09-15",
    s: "16:00",
    e: "16:20",
    title: "From Conversation to Close: How Deals Get Done in Slack",
    place: "Moscone West L2 · Learning Lab Theater B",
    type: "reco",
    tags: ["Slack", "Revenue", "Sales"],
    desc: "Slack 대화에서 가격·견적·계약까지 이어지는 Agentforce Revenue Management."
  },

  // Day 2 (9/16 수)
  {
    id: "df-ev-reco-goal-agent",
    d: "2026-09-16",
    s: "08:30",
    e: "08:50",
    title: "Automate Long-Running Work With New Goal-Based Agent",
    place: "Moscone South LL · Content Pavilion Stage 4",
    type: "reco",
    tags: ["Agentforce", "Sales", "Service"],
    desc: "Lead/Case 등 장시간 수행 업무를 Goal-based Agent로 자동화."
  },
  {
    id: "df-ev-reco-agent-testing",
    d: "2026-09-16",
    s: "09:30",
    e: "09:50",
    title: "Automate Multi-Turn Agentforce Testing",
    place: "Moscone West L1 · Redwood Theater",
    type: "reco",
    tags: ["Agentforce", "Testing", "Claude Code"],
    desc: "Claude Code와 Test Center로 multi-turn Agentforce 여정을 자동 검증.",
    why: "AI 개발방법론과 품질관리 관점에서 특히 유용.",
    topRank: 4
  },
  {
    id: "df-ev-reco-code-ext",
    d: "2026-09-16",
    s: "10:30",
    e: "10:50",
    title: "Build Complex Data Transformations with Code Extensions",
    place: "Moscone West L1 · Developer Grove",
    type: "reco",
    tags: ["Data 360", "Python", "AI Coding"],
    desc: "Data 360에서 Python 기반 복잡한 데이터 변환과 chunking 구현.",
    why: "외부 ETL/전처리와 Data 360의 경계를 판단하는 데 도움이 됨.",
    topRank: 5
  },
  {
    id: "df-ev-reco-unified-customer",
    d: "2026-09-16",
    s: "13:30",
    e: "13:50",
    title: "Build a Unified Customer View with Data 360",
    place: "Moscone West L1 · Redwood Theater",
    type: "reco",
    tags: ["Data 360", "Customer 360"],
    desc: "여러 시스템의 고객 데이터를 통합하고 Agentforce가 활용할 기반 구성.",
    why: "Salesforce CRM + Data 360 + Agentforce의 전체 그림을 잡기에 좋음.",
    topRank: 6
  },
  {
    id: "df-ev-ohana-tour",
    d: "2026-09-16",
    s: "14:00",
    e: "14:40",
    title: "Korean Partner Ohana Floor Tour — Group A",
    place: "Salesforce Tower 61F",
    type: "personal",
    tags: ["DKBMC", "확정 일정"],
    desc: "13:40까지 Salesforce Plaza 도착 → Check-in → Badge/Band → Tent에서 Salesforce Korea 직원 미팅 → 동행 입장."
  },
  {
    id: "df-ev-dreamfest",
    d: "2026-09-16",
    s: "18:00",
    e: "21:30",
    title: "Dreamfest (Usher & Gwen Stefani 라이브)",
    place: "Giants Ballpark (Oracle Park)",
    type: "personal",
    tags: ["21+", "Badge"],
    desc: "컨퍼런스 배지 필수. 재입장 불가. 백팩/캐리어 등 제한. 경기장 내 음식/음료 무료."
  },

  // Day 3 (9/17 목)
  {
    id: "df-ev-reco-skills-claude",
    d: "2026-09-17",
    s: "09:30",
    e: "09:50",
    title: "Build Salesforce Agent Skills with Claude Code",
    place: "Moscone West L1 · Developer Grove",
    type: "reco",
    tags: ["Claude Code", "Agent Skills", "MCP"],
    desc: "Salesforce Agent Skill의 구조와 Claude Code + MCP를 활용한 개발.",
    why: "현재 사용 중인 AI 개발도구와 Salesforce 개발의 연결점을 확인하기 좋음.",
    topRank: 7
  },
  {
    id: "df-ev-reco-fabric-17",
    d: "2026-09-17",
    s: "11:00",
    e: "11:20",
    title: "Build AI Experiences with Agent Fabric",
    place: "Moscone West L2 · Theater 5",
    type: "reco",
    tags: ["Agent Fabric", "MuleSoft", "Agentic AI"],
    desc: "Agent Fabric을 활용한 agent/model/MCP 오케스트레이션."
  },
  {
    id: "df-ev-reco-mulesoft-slack",
    d: "2026-09-17",
    s: "11:00",
    e: "11:40",
    title: "Automate Data 360 Pipelines via MuleSoft and Slack",
    place: "Moscone West L3 · Room 3024",
    type: "reco",
    tags: ["Data 360", "MuleSoft", "Slack"],
    desc: "MuleSoft API와 Slack 자연어 프롬프트로 Data 360 ingestion pipeline 자동화.",
    why: "통합·자동화·Data 360를 한 세션에서 연결해서 볼 수 있음.",
    topRank: 8
  },
  {
    id: "df-ev-kr-wrapup",
    d: "2026-09-17",
    s: "15:00",
    e: "17:00",
    title: "KR Wrap-up Session (한국 참가자 공식 랩업)",
    place: "Salesforce Tower West · 3F C04/05 + S01",
    type: "korea",
    tags: ["Korea Program", "Wrap-up"],
    desc: "14:30 Check-in. 15:00–17:00 세션. Main Keynote / Industry 내용 요약 및 네트워킹."
  }
];

export const DF_RECOMMENDATIONS: RecommendationItem[] = [
  {
    rank: 1,
    title: "Build Salesforce Connect Adapters with Agentforce Vibes",
    timeText: "9/15 08:30–08:50",
    tags: "Agentforce · Claude Code · Integration",
    why: "비개발자 관점에서도 'AI가 Salesforce 개발을 어떻게 바꾸는가'를 가장 직접적으로 볼 수 있음.",
    catalogUrl: DF_SESSION_CATALOG_URL
  },
  {
    rank: 2,
    title: "Build AI Experiences with Agent Fabric",
    timeText: "9/15 12:30–12:50",
    tags: "Agent Fabric · MuleSoft · MCP",
    why: "MuleSoft/통합 아키텍처와 Agentic AI를 연결해서 보기 좋은 세션.",
    catalogUrl: DF_SESSION_CATALOG_URL
  },
  {
    rank: 3,
    title: "Automate Search and Retrieval Deployments via DataKits",
    timeText: "9/15 13:30–13:50",
    tags: "Data 360 · RAG · DevOps",
    why: "사용자가 관심을 가져온 RAG·Vector·Data 360 구조와 직접 연결됨.",
    catalogUrl: DF_SESSION_CATALOG_URL
  },
  {
    rank: 4,
    title: "Automate Multi-Turn Agentforce Testing",
    timeText: "9/16 09:30–09:50",
    tags: "Agentforce · Testing · Claude Code",
    why: "AI 개발방법론과 품질관리 관점에서 특히 유용.",
    catalogUrl: DF_SESSION_CATALOG_URL
  },
  {
    rank: 5,
    title: "Build Complex Data Transformations with Code Extensions",
    timeText: "9/16 10:30–10:50",
    tags: "Data 360 · Python",
    why: "외부 ETL/전처리와 Data 360의 경계를 판단하는 데 도움이 됨.",
    catalogUrl: DF_SESSION_CATALOG_URL
  },
  {
    rank: 6,
    title: "Build a Unified Customer View with Data 360",
    timeText: "9/16 13:30–13:50",
    tags: "Data 360 · Customer 360",
    why: "Salesforce CRM + Data 360 + Agentforce의 전체 그림을 잡기에 좋음.",
    catalogUrl: DF_SESSION_CATALOG_URL
  },
  {
    rank: 7,
    title: "Build Salesforce Agent Skills with Claude Code",
    timeText: "9/17 09:30–09:50",
    tags: "Claude Code · Agent Skills · MCP",
    why: "현재 사용 중인 AI 개발도구와 Salesforce 개발의 연결점을 확인하기 좋음.",
    catalogUrl: DF_SESSION_CATALOG_URL
  },
  {
    rank: 8,
    title: "Automate Data 360 Pipelines via MuleSoft and Slack",
    timeText: "9/17 11:00–11:40",
    tags: "MuleSoft · Data 360 · Slack",
    why: "통합·자동화·Data 360를 한 세션에서 연결해서 볼 수 있음.",
    catalogUrl: DF_SESSION_CATALOG_URL
  }
];

export const DF_HOURLY_TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00"
];

export const DF_DAY_INFOS: Record<string, [string, string]> = {
  "2026-09-14": ["Day 0 · Mon, Sep 14", "Badge + Korean Night"],
  "2026-09-15": ["Day 1 · Tue, Sep 15", "Main Dreamforce"],
  "2026-09-16": ["Day 2 · Wed, Sep 16", "Ohana + Dreamfest"],
  "2026-09-17": ["Day 3 · Thu, Sep 17", "Wrap-up + final sessions"]
};

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function checkSessionsOverlap(a: SessionItem, b: SessionItem): boolean {
  if (a.d !== b.d || a.id === b.id) return false;
  const aStart = timeToMinutes(a.s);
  const aEnd = timeToMinutes(a.e);
  const bStart = timeToMinutes(b.s);
  const bEnd = timeToMinutes(b.e);
  return aStart < bEnd && bStart < aEnd;
}
