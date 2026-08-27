export interface MediaItem {
  id: string;
  type: "image" | "video" | "link";
  url: string; // Base64 data URL or external URL (YouTube / Web)
  name: string;
  thumbnail?: string;
}

export interface TimelineEvent {
  id: string;
  date: string; // e.g. "2026-09-13"
  time: string; // e.g. "09:00 - 10:30"
  title: string;
  category: "flight" | "hotel" | "keynote" | "session" | "party" | "meeting" | "sightseeing" | "custom";
  location: string;
  description: string;
  proTip?: string;
  media?: MediaItem[];
  isImportant?: boolean;
  completed?: boolean;
}

export interface TravelDocument {
  id: string;
  category: "passport_esta" | "flight" | "hotel" | "dreamforce_badge" | "insurance_card" | "esim" | "custom";
  title: string;
  subtitle: string;
  fields: { label: string; value: string }[];
  notes?: string;
  media?: MediaItem[];
  emergencyContact?: string;
}

export interface ChecklistItem {
  id: string;
  category: "documents" | "electronics" | "clothing" | "medicine" | "business" | "custom";
  text: string;
  checked: boolean;
  proTip?: string;
}

export interface ColleagueContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  roomNumber?: string;
  status: "세션 참석 중" | "부스 탐방 중" | "호텔 휴식" | "식사 중" | "외부 미팅" | "자유 시간";
  kakaoOrSlack?: string;
  notes?: string;
  avatarUrl?: string;
}

export interface BusinessCardRecord {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  linkedin?: string;
  tags: string[];
  keyDiscussion: string;
  followUpTodo?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface EnglishPhrase {
  id: string;
  category: "immigration" | "booth" | "keynote_session" | "smalltalk" | "restaurant_tip" | "emergency" | "custom";
  en: string;
  ko: string;
  pronunciationGuide?: string;
  situation: string;
  proTip?: string;
}

export interface ProTip {
  id: string;
  stage: "pre_trip" | "flight" | "immigration" | "conference" | "safety_sf" | "wellness_jetlag" | "dining_tip";
  title: string;
  content: string;
  urgency: "gold" | "warning" | "info";
  iconName?: string;
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: "meals" | "transport" | "drinks" | "hotel" | "shopping" | "other";
  amountUSD: number;
  amountKRW: number;
  description: string;
  paymentMethod: "법인카드" | "개인카드" | "현금";
  receiptImg?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  content: string;
  tag?: string;
  media?: MediaItem[];
}

export interface CustomSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: CustomSectionItem[];
}

export interface SafetyZone {
  id: string;
  name: string;
  status: "danger" | "caution" | "safe" | "must_visit";
  description: string;
  safetyRule: string;
  address?: string;
}

export interface AppData {
  pin: string;
  userName: string;
  exchangeRate: number; // e.g. 1380
  timelineEvents: TimelineEvent[];
  travelDocuments: TravelDocument[];
  checklist: ChecklistItem[];
  colleagues: ColleagueContact[];
  businessCards: BusinessCardRecord[];
  englishPhrases: EnglishPhrase[];
  proTips: ProTip[];
  expenses: ExpenseRecord[];
  customSections: CustomSection[];
  safetyZones: SafetyZone[];
}
