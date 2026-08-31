import { AppData } from "../types";

export const initialAppData: AppData = {
  pin: "1234",
  userName: "김진수",
  exchangeRate: 1385,
  timelineEvents: [
    {
      id: "ev-1",
      date: "2026-09-13",
      time: "13:50",
      title: "인천국제공항(ICN) 집결 & 유나이티드 항공 출국 수속",
      category: "flight",
      location: "인천공항 제1여객터미널 유나이티드 항공(UA) 카운터",
      description: "DK BMC 출장팀 미팅 후 유나이티드 UA 892 체크인, 수하물(1인당 23kg 1개 무료) 위탁, e-SIM 수령 후 출국 심사",
      proTip: "베이직 이코노미(K) 좌석(47K) 확인! 기내 수하물 1개 + 개인 소지품 1개 휴대 가능. 보조배터리는 반드시 기내 가방에 소지하세요.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-2",
      date: "2026-09-13",
      time: "16:50 (KST) -> 11:40 (PDT)",
      title: "인천 -> 샌프란시스코(SFO) 비행 (UA 892 / 10시간 50분)",
      category: "flight",
      location: "유나이티드 항공 UA 892 (Boeing 787-9 Dreamliner) / 좌석 47K",
      description: "보잉 787-9 드림라이너 탑승, 기내식 식사 후 수면 유도 (목베개/안대 착용하여 시차 적응 시작)",
      proTip: "비행기 탑승 즉시 시계를 샌프란시스코 현지 시간(11:40)으로 맞추고 비행 후반부에는 휴식을 취하세요.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-3",
      date: "2026-09-13",
      time: "11:40 - 13:00 (PDT)",
      title: "SFO 공항 도착, 입국심사 & 수하물 수령",
      category: "flight",
      location: "SFO International Arrivals (국제선 입국장)",
      description: "ESTA 전용 라인 대기, 세관 신고, 입국 심사관 인터뷰 진행 및 수하물(23kg) 수령",
      proTip: "심사관 질문에는 'Attending Dreamforce business conference for 6 days'라고 답변. 체류 숙소(137 Milton St)와 여권 준비.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-4",
      date: "2026-09-13",
      time: "13:30 - 14:30",
      title: "SFO 공항 -> DK BMC 단체 숙소 이동 & 체크인",
      category: "hotel",
      location: "137 Milton St, San Francisco, CA 94112",
      description: "공항에서 Uber XL 또는 BART로 Milton St 숙소 이동, 15:00 체크인 및 짐 정리 (팀원 5인 공동 숙소)",
      proTip: "숙소 호스트 연락처: +1 213-361-1889. 체크인 후 모스콘 센터로 이동하여 사전 배지 수령을 진행합니다.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-5",
      date: "2026-09-13",
      time: "15:30 - 17:30",
      title: "드림포스 사전 배지(Badge) 수령 & 모스콘 캠퍼스 사전 탐방",
      category: "keynote",
      location: "Moscone West / Yerba Buena Gardens",
      description: "사전 등록 바코드(Jinsoo Kim)와 여권을 제시하고 목걸이 배지 및 웰컴 키트 수령",
      proTip: "행사 당일 아침에는 배지 수령 줄이 1시간 이상 길어집니다. 9/13 오후에 미리 받아두면 내일 일정이 매우 여유롭습니다!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-6",
      date: "2026-09-14",
      time: "09:30 - 16:30",
      title: "드림포스 캠퍼스 사전 탐방 & 팀 미팅 (※ 와인투어 미해당)",
      category: "session",
      location: "Moscone Center & Yerba Buena",
      description: "모스콘 센터 주변 동선 확인, 팀별 세션 플래닝 및 자유 파트너 미팅 (와이너리 투어는 고객사 전용 프로그램으로 미참석)",
      proTip: "내일부터 시작되는 메인 컨퍼런스에 대비해 주요 세션룸 위치(Moscone South/West)와 통역기 부스를 미리 체크하세요.",
      completed: false
    },
    {
      id: "ev-7",
      date: "2026-09-14",
      time: "18:00 - 21:00",
      title: "🌉 🇰🇷 Korea Trailblazers Night (한국 참가자 공식 디너)",
      category: "party",
      location: "BIX SAN FRANCISCO (56 Gold St, San Francisco)",
      description: "공식 행사 전 한국 고객 및 파트너분들을 위한 특별 디너 네트워킹 리셉션. 세일즈포스 전문가 및 국내 디지털 혁신 리더들과 교류",
      proTip: "한국 세일즈포스 에코시스템의 핵심 리더들이 총출동하는 자리입니다. 영문 명함과 스마트폰 링크드인 QR을 꼭 챙기세요!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-8",
      date: "2026-09-15",
      time: "09:00 - 11:30",
      title: "🌟 메인 오프닝 키노트 (Marc Benioff & Special Guests)",
      category: "keynote",
      location: "Moscone South - Main Keynote Hall (Level 1)",
      description: "세일즈포스 Agentforce 3.0 및 차세대 자율 AI 에이전트, Data Cloud 신규 혁신 발표",
      proTip: "좋은 자리를 잡으려면 최소 45분 전(08:15)까지 입장하세요. 숙소(Milton St)에서 모스콘까지 우버로 약 15분 소요!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-9",
      date: "2026-09-15",
      time: "13:00 - 16:30",
      title: "Campground (전시 부스) 탐방 & 파트너사 데모 시연",
      category: "session",
      location: "Moscone Center Ground Floor",
      description: "글로벌 ISV 솔루션 부스 방문, 신기술 라이브 데모 관람, 스와그(굿즈) 수집",
      proTip: "부스 스태프에게 'Could you show me a 2-minute demo?'로 말을 걸고 명함을 건네세요.",
      completed: false
    },
    {
      id: "ev-10",
      date: "2026-09-16",
      time: "10:00 - 11:30",
      title: "AI 에이전트 구축 심층 세션 (Hands-on Lab)",
      category: "session",
      location: "Moscone West - 2nd Floor",
      description: "Agentforce Prompt & Action Studio 실습 및 기업 워크플로우 자동화 아키텍처 강의",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-11",
      date: "2026-09-16",
      time: "19:00 - 22:30",
      title: "🎸 Dreamfest 2026 자선 콘서트",
      category: "party",
      location: "Oracle Park (San Francisco Giants 야구장)",
      description: "세계적인 팝/록 밴드 라이브 공연 및 드림포스 공식 야외 축제 (무료 푸드/음료 제공)",
      proTip: "저녁 야외 경기장은 바닷바람으로 매우 춥습니다! 두꺼운 점퍼나 패딩, 머플러 필수 지참!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-12",
      date: "2026-09-17",
      time: "10:30 - 13:00",
      title: "드림포스 클로징 키노트 & 로드맵 총정리",
      category: "keynote",
      location: "Moscone South",
      description: "3일간의 핵심 발표 요약 및 향후 1년간의 제품 로드맵 발표",
      completed: false
    },
    {
      id: "ev-13",
      date: "2026-09-17",
      time: "15:00 - 17:00",
      title: "👨‍💻 🇰🇷 Korea Wrap-up Session (한국 참가자 공식 랩업 세션)",
      category: "session",
      location: "SALESFORCE TOWER WEST 3F - C04/05",
      description: "드림포스에서 발표된 핵심 내용을 요약 정리하여 공유하는 한국 참가자 전용 랩업 세션. 최신 AI Agent 및 데이터 클라우드 인사이트 총정리",
      proTip: "모스콘 센터에서 세일즈포스 타워(Salesforce Tower West)까지 도보 약 7~10분 거리입니다. 3층 C04/05룸에서 진행됩니다.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-14",
      date: "2026-09-17",
      time: "17:30 - 21:00",
      title: "샌프란시스코 랜드마크 투어 & 귀국 선물 쇼핑, 팀 회식",
      category: "sightseeing",
      location: "금문교(Golden Gate Bridge) -> 피어39 -> 기라델리 스퀘어 -> 페리빌딩",
      description: "컨퍼런스 종료 후 DK BMC 팀원들과 기념 촬영, 기라델리 초콜릿 선물 구매 및 보딘 사워도우 클램 차우더 저녁 회식",
      proTip: "내일(9/18) 아침 10:25 귀국 비행기(UA893)이므로 쇼핑과 시내 관광은 오늘 9/17 저녁에 모두 마쳐야 합니다!",
      completed: false
    },
    {
      id: "ev-15",
      date: "2026-09-18",
      time: "07:15 - 08:30",
      title: "숙소 체크아웃 & SFO 공항(터미널 3) 이동",
      category: "hotel",
      location: "137 Milton St -> SFO 터미널 3 (United)",
      description: "숙소(137 Milton St) 11:00 이전 얼리 체크아웃 후 Uber XL로 SFO 공항 터미널 3 이동 (출국 3시간 전 도착)",
      proTip: "국제선 유나이티드 항공(UA893)은 출발 2.5~3시간 전 공항 도착 필수. 트래블러스 체크카드로 면세점 기념품 결제 가능!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-16",
      date: "2026-09-18",
      time: "10:25 (PDT) -> 9/19 15:00 (KST)",
      title: "샌프란시스코(SFO) -> 인천(ICN) 귀국 비행 (UA 893 / 12시간 35분)",
      category: "flight",
      location: "유나이티드 항공 UA 893 (Boeing 787-9 Dreamliner) / 좌석 52J (터미널 3)",
      description: "UA 893편 탑승, 기내 휴식 및 수면 후 9월 19일(토) 15:00 인천국제공항 제1여객터미널 도착 & 귀가",
      proTip: "인천공항 도착 후 남은 미국 달러는 토스뱅크 외화통장에서 수수료 0원으로 원화 무료 재환전 가능!",
      isImportant: true,
      completed: false
    }
  ],
  travelDocuments: [
    {
      id: "doc-1",
      category: "passport_esta",
      title: "여권 및 미국 ESTA 승인 정보",
      subtitle: "외교부 7대 수칙 & ESTA 정보",
      fields: [
        { label: "성명 (Name)", value: "KIM JINSOO (김진수)" },
        { label: "여권 유효기간", value: "2027년 이후 만료 (입국 기준 6개월 이상 잔여 확인)" },
        { label: "여권 서명 확인", value: "3페이지 자필 서명 완료 (카드/출입국 서류와 일치)" },
        { label: "ESTA 신청 번호", value: "ESTA-2026-KR-99824" },
        { label: "미국 내 체류 주소", value: "137 Milton St, San Francisco, CA 94112" },
        { label: "미국 내 연락처 (Host)", value: "+1 213-361-1889" },
        { label: "체류 목적", value: "Business Conference (Dreamforce 2026 - DK BMC)" }
      ],
      notes: "[ESTA/입국 필수 정보] 비자/ESTA 신청 시 기재한 미국 내 체류지 주소는 '137 Milton St, San Francisco, CA 94112'이며 연락처는 호스트 전화번호 '+1 213-361-1889'입니다.",
      emergencyContact: "외교부 24시간 영사콜센터: +82-2-3210-0404 / 샌프란시스코 총영사관: +1-415-921-2251"
    },
    {
      id: "doc-2",
      category: "flight",
      title: "유나이티드 항공 (United Airlines) E-Ticket",
      subtitle: "예약 번호: NVV8JR (김진수)",
      fields: [
        { label: "United 예약 번호", value: "NVV8JR" },
        { label: "승객명 / 이메일", value: "Jinsoo Kim / jinsoo****@gmail.com" },
        { label: "총 결제 금액", value: "₩1,276,600 (운임 ₩874,000 + 유류 ₩242,600 + 세금/수수료 ₩160,000)" },
        { label: "출국편 (ICN -> SFO)", value: "UA 892 (9/13 16:50 KST -> 9/13 11:40 PDT) | 좌석 47K" },
        { label: "귀국편 (SFO -> ICN)", value: "UA 893 (9/18 10:25 PDT -> 9/19 15:00 KST) | 좌석 52J" },
        { label: "운항 기종 / 클래스", value: "Boeing 787-9 Dreamliner | 베이직 이코노미(K/G)" },
        { label: "수하물 규정", value: "1st Bag(위탁 23kg 1개) 무료 포함 / 2nd Bag USD $120" },
        { label: "기내 수하물", value: "기내 휴대 가방 1개 + 개인 소지품 1개 반입 가능" }
      ],
      notes: "유나이티드 앱에서 모바일 체크인 및 좌석 확인 가능. 탄소 배출량: 출국 410kg / 귀국 537kg CO2",
      emergencyContact: "유나이티드 항공 고객센터: +82-2-751-0300 (한국) / +1-800-864-8331 (미국)"
    },
    {
      id: "doc-3",
      category: "custom",
      title: "토스뱅크 외화통장 & 체크카드 해외 혜택",
      subtitle: "김진수 님 외화통장 혜택 적용 중",
      fields: [
        { label: "해외 결제 수수료", value: "100% 무료 (국제 브랜드 1% + 해외이용 수수료 0원)" },
        { label: "해외 ATM 출금", value: "매월 5회 또는 $700(USD) 한도까지 수수료 무료" },
        { label: "ATM 초과 수수료", value: "월 $700 초과 시 국제브랜드 1% + 건당 3달러 (매월 1일 리셋)" },
        { label: "부족한 돈 자동환전", value: "USD 잔액 부족 시 원화 통장에서 실시간 자동 환전 결제" },
        { label: "남은 외화 재환전", value: "귀국 후 남은 USD 원화 환전 시 수수료 100% 무료" },
        { label: "연결 카드 / 상태", value: "토스뱅크 체크카드 (Mastercard) / 혜택 적용 중" }
      ],
      notes: "해외 상점/식당 결제 시 반드시 '현지 통화(USD)'로 결제하세요. ATM 출금 한도는 매월 1일 초기화됩니다.",
      emergencyContact: "토스뱅크 24시간 고객센터: +82-2-1661-7654 / 해외: +82-2-2060-0000"
    },
    {
      id: "doc-3b",
      category: "custom",
      title: "KB국민 트래블러스 체크카드 (토심이)",
      subtitle: "해외 10% 할인 & 수수료 면제 서브 카드",
      fields: [
        { label: "해외 결제 수수료", value: "면제 (국제브랜드 1% + 해외서비스 0.25% = 1.25% 면제)" },
        { label: "해외 ATM 출금", value: "면제 (국제브랜드 1% + 건당 $3 면제 / 월 10회)" },
        { label: "해외 가맹점 할인", value: "10% 환급 할인 (온·오프라인 월 최대 1만원)" },
        { label: "실적 조건", value: "수수료 면제: 무실적 상시 제공 / 10% 할인: 전월 20만원" },
        { label: "국내 혜택", value: "KB Pay 200원(월 10회), 카페 1천원, 베이커리 2천원, 철도 5천원" },
        { label: "연회비", value: "없음 (0원)" }
      ],
      notes: "토스뱅크 카드와 함께 듀얼로 지참하는 필수 서브 카드입니다. 해외 가맹점 10% 할인(월 1만원)과 월 10회 ATM 수수료 면제 혜택을 누리세요.",
      emergencyContact: "KB국민카드 고객센터: 1588-1688 / 해외: +82-2-6300-7300"
    },
    {
      id: "doc-4",
      category: "hotel",
      title: "샌프란시스코 DK BMC 단합 숙소 바우처",
      subtitle: "137 Milton St (5인 단체 숙소)",
      fields: [
        { label: "영문 주소", value: "137 Milton St, San Francisco, CA 94112" },
        { label: "체크인 / 아웃", value: "2026.09.13 (15:00) ~ 2026.09.18 (11:00) / 5박" },
        { label: "호스트 연락처 (ESTA)", value: "+1 213-361-1889 (Call Host)" },
        { label: "동반 투숙 인원 (5명)", value: "배창욱 대표, 정창열 이사, 정훈 부장, 배광진 팀장, 김진수" },
        { label: "예약 총괄", value: "정창열 이사 (솔루션영업팀 / +82 10-7149-3432)" },
        { label: "모스콘 센터 이동", value: "Uber/Lyft 약 15분 또는 Glen Park BART 역 이용" }
      ],
      notes: "DK BMC 출장팀 5인이 함께 머무는 단합 숙소입니다. 미국 비자/ESTA 신청 시 본 주소와 호스트 연락처(+1 213-361-1889)를 기재하세요."
    },
    {
      id: "doc-5",
      category: "dreamforce_badge",
      title: "드림포스 2026 공식 등록 & 한국 특별 프로그램",
      subtitle: "Korea Trailblazer Programs 공식 참여",
      fields: [
        { label: "등록자 이름", value: "Jinsoo Kim (DK BMC / Salesforce Specialist)" },
        { label: "소속 회사", value: "DK BMC (디케이비엠씨)" },
        { label: "Korea Trailblazers Night", value: "9/14(월) 18:00~21:00 @ BIX SAN FRANCISCO (56 Gold St)" },
        { label: "Korea Wrap-up Session", value: "9/17(목) 15:00~17:00 @ Salesforce Tower West 3F (C04/05)" },
        { label: "와이너리 투어", value: "고객사 전용 프로그램 (미참석)" },
        { label: "배지 수령 장소", value: "Moscone West Lobby (9/13 15:30 수령)" }
      ],
      notes: "9/14 저녁 Korea Trailblazers Night(BIX SF)와 9/17 오후 Korea Wrap-up Session(Salesforce Tower West 3F)에 참석합니다."
    },
    {
      id: "doc-6",
      category: "esim",
      title: "미국 로밍 & e-SIM 설정 정보",
      subtitle: "T-Mobile 5G 무제한 데이터 (7일권)",
      fields: [
        { label: "현지 전화번호", value: "+1 (415) 555-0199" },
        { label: "데이터 용량", value: "5G 무제한 속도 + 핫스팟 5GB" },
        { label: "활성화 방법", value: "비행기 착륙 후 '셀룰러 데이터'를 e-SIM으로 켜기" }
      ],
      notes: "미국 도착 전 한국에서 미리 QR코드로 e-SIM을 등록해두세요. 현지 도착 즉시 데이터가 켜집니다."
    }
  ],
  checklist: [
    { id: "chk-1", category: "documents", text: "여권 3페이지 서명 완료 (신용카드 서명과 동일 필체)", checked: true, proTip: "외교부 지침: 수령 직후 3페이지 서명란에 자필 서명 필수!" },
    { id: "chk-2", category: "documents", text: "여권 유효기간 6개월 이상 잔여 확인 (2027년 이후)", checked: true, proTip: "미국 및 대부분 국가 입국 시 최소 6개월 이상 유효기간 요구" },
    { id: "chk-3", category: "documents", text: "여권 뒷면 비상연락처 연필 기재", checked: true, proTip: "국내 및 현지 연락처를 변경 가능하도록 연필로 기재 권장" },
    { id: "chk-4", category: "documents", text: "전자여권 보호 케이스 (IC칩 구김/훼손 방지)", checked: false, proTip: "전자칩 및 안테나 손상 시 공항 판독기 오류 발생 주의" },
    { id: "chk-5", category: "documents", text: "ESTA 신청 & 체류지 확인 (137 Milton St / +1 213-361-1889)", checked: true, proTip: "미국 비자/ESTA 신청 시 숙소 주소와 호스트 연락처 기재 필수" },
    { id: "chk-6", category: "documents", text: "해외 결제 카드 2종 챙기기 (토스뱅크 + KB국민 트래블러스)", checked: true, proTip: "토스뱅크(수수료0원/자동환전) + KB 트래블러스(수수료면제/해외10%할인/ATM월10회무료). 분실 대비 분산 소지!" },
    { id: "chk-7", category: "documents", text: "유나이티드 항공 앱(United) 설치 & 모바일 탑승권", checked: false, proTip: "예약번호 NVV8JR 조회, 기내 엔터테인먼트 및 사전 좌석(47K / 52J) 확인" },
    { id: "chk-8", category: "clothing", text: "수하물 규정 확인 (위탁 23kg 1개 무료, 2번째 $120)", checked: false, proTip: "베이직 이코노미 기준 1st bag 23kg 무료 포함, 2nd bag은 $120 부과" },
    { id: "chk-9", category: "electronics", text: "보조배터리 (10,000~20,000mAh) 기내 휴대", checked: false, proTip: "⚠️ 보조배터리는 절대로 위탁수하물 불가! 반드시 기내 가방 휴대" },
    { id: "chk-10", category: "electronics", text: "110V 돼지코 어댑터 2~3개 & 3구 멀티탭", checked: false, proTip: "미국 110V 11자 콘센트용. 숙소에서 팀원 공동 충전용 멀티탭 필수" },
    { id: "chk-11", category: "clothing", text: "가장 편한 쿠션 운동화 (하루 1.5만 보)", checked: false, proTip: "모스콘 캠퍼스 이동이 많으니 편안한 러닝화 필수" },
    { id: "chk-12", category: "clothing", text: "바람막이 / 경량 패딩 / 가디건 (SF 일교차 대비)", checked: false, proTip: "샌프란시스코 바닷바람과 Dreamfest 야외 공연 대비용 겉옷 필수" },
    { id: "chk-13", category: "medicine", text: "상비약 (멜라토닌, 타이레놀, 지사제, 소화제, 인공눈물)", checked: false, proTip: "16시간 시차 극복을 위해 첫날 밤 멜라토닌 복용 추천" },
    { id: "chk-14", category: "business", text: "영문 명함 100장 & 링크드인 QR코드 준비", checked: false, proTip: "9/14 Korea Trailblazers Night 및 부스/리셉션 네트워킹용 명함 필수" }
  ],
  colleagues: [
    {
      id: "col-1",
      name: "배창욱 대표이사",
      role: "DK BMC 대표이사 (CEO)",
      phone: "+82 10-5234-5678",
      roomNumber: "137 Milton St (메인 룸)",
      status: "세션 참석 중",
      kakaoOrSlack: "slack: @cwbae",
      notes: "드림포스 2026 총괄 및 글로벌 VIP 파트너십 미팅 주관."
    },
    {
      id: "col-2",
      name: "정창열 이사 / 팀장",
      role: "솔루션영업팀 총괄 (Director)",
      phone: "+82 10-7149-3432",
      roomNumber: "137 Milton St (룸 1)",
      status: "외부 미팅",
      kakaoOrSlack: "email: changyeol.jeong@dkbmc.com",
      notes: "숙소 예약 및 현지 일정 총괄, 고객사 미팅 주관 (일요일 사전 도착)."
    },
    {
      id: "col-3",
      name: "정훈 부장",
      role: "솔루션영업 / PM (Senior Manager)",
      phone: "+82 10-3456-7890",
      roomNumber: "137 Milton St (룸 2)",
      status: "부스 탐방 중",
      kakaoOrSlack: "slack: @hoon_jung",
      notes: "프로젝트 관리 및 글로벌 ISV 솔루션 데모 참관."
    },
    {
      id: "col-4",
      name: "배광진 팀장",
      role: "기술 컨설팅 / 아키텍트 (Team Leader)",
      phone: "+82 10-4567-8901",
      roomNumber: "137 Milton St (룸 3)",
      status: "세션 참석 중",
      kakaoOrSlack: "slack: @gjbae",
      notes: "세일즈포스 Agentforce & Data Cloud 기술 세션 및 핸즈온 랩 집중 참관."
    }
  ],
  businessCards: [
    {
      id: "bc-1",
      name: "David Miller",
      company: "CloudScale AI Inc.",
      role: "VP of Product Strategy",
      email: "david.m@cloudscale.ai",
      linkedin: "https://linkedin.com/in/david-miller-example",
      tags: ["Agentforce", "DataCloud", "파트너십"],
      keyDiscussion: "한국 시장 진출 관련 현지화 연동 API 협력 가능성 논의. 다음 주 화요일 온라인 줌 미팅 제안함.",
      followUpTodo: "DK BMC 회사 소개 영문 브로셔 PDF 이메일 발송 (9/22 이전)",
      createdAt: "2026-09-14 15:30"
    }
  ],
  places: [
    {
      id: "place-target",
      name: "타깃 (Target - Moscone/SoMa)",
      nameEn: "Target (789 Mission St)",
      category: "mart_shopping",
      rating: 4.0,
      ratingText: "4.0 · 미국 대형 할인점 (비회원제)",
      address: "789 Mission St, San Francisco, CA 94103",
      locationTag: "Moscone 도보 5분",
      phone: "(415) 343-6272",
      hours: "매일 08:00 - 21:00",
      googleMapsQuery: "Target 789 Mission St San Francisco",
      lat: 37.7854,
      lng: -122.4042,
      recommendedTime: "9/15~17 Dreamforce 행사 종료 후 1시간",
      themeTags: ["대형마트", "비회원제", "미국과자", "생활용품", "굿즈가방"],
      description: "Moscone Center에서 도보 5분 거리의 미국 대표 대형 할인점입니다. 행사 종료 후 별도 이동 없이 미국 과자, 시리얼, 커피, 비타민, 그리고 Dreamforce 행사장에서 받은 수많은 굿즈를 담아갈 보조 가방/쇼퍼백을 쇼핑하기에 최적입니다.",
      shoppingTips: [
        "미국 시리얼 & Ghirardelli 초콜릿",
        "행사 굿즈 담을 가성비 폴더블 가방",
        "비타민 & 타이레놀 등 영양제",
        "미국 한정 스낵 & 단백질바"
      ],
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-rainbow",
      name: "레인보우 식료품점 (Rainbow Grocery)",
      nameEn: "Rainbow Grocery Cooperative",
      category: "mart_shopping",
      rating: 4.6,
      ratingText: "4.6 · SF 로컬 대형 식료품점 (비회원제)",
      address: "1745 Folsom St, San Francisco, CA 94103",
      locationTag: "Mission 인근",
      phone: "(415) 863-0620",
      hours: "매일 09:00 - 21:00",
      googleMapsQuery: "Rainbow Grocery Cooperative 1745 Folsom St San Francisco",
      lat: 37.7694,
      lng: -122.4146,
      recommendedTime: "9/13(일) 첫날 미션 디스트릭트 관광 연계",
      themeTags: ["SF식문화", "유기농마켓", "비건/벌크", "로컬특산품", "치즈/소스"],
      description: "일반 대형 체인마트와 완전히 다른 샌프란시스코만의 독특한 식문화가 살아있는 대형 협동조합 슈퍼마켓입니다(비회원제). 수백 종의 벌크 견과류, 향신료, 치즈, 유기농 티, 로컬 소스, 비건 스낵 등 '미국 현지인들의 진짜 식생활'을 관찰하고 쇼핑하기에 가장 흥미로운 장소입니다.",
      shoppingTips: [
        "캘리포니아 로컬 꿀 & 유기농 잼",
        "벌크 견과류 & 오가닉 허브티",
        "특이한 핫소스 & 바베큐 소스",
        "친환경 비누 & 립밤"
      ],
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-safeway",
      name: "세이프웨이 (Safeway - Diamond Heights)",
      nameEn: "Safeway (Diamond Heights)",
      category: "mart_shopping",
      rating: 4.0,
      ratingText: "4.0 · 24시간 미국 대형 슈퍼마켓 (비회원제)",
      address: "5290 Diamond Heights Blvd, San Francisco, CA 94131",
      locationTag: "137 Milton 숙소 인근 (차량 5분)",
      phone: "(415) 824-7744",
      hours: "매일 05:00 - 24:00 (새벽~심야)",
      googleMapsQuery: "Safeway 5290 Diamond Heights Blvd San Francisco",
      lat: 37.7437,
      lng: -122.4429,
      recommendedTime: "9/13(일) 체크인 직후 또는 밤 숙소 귀가 전",
      themeTags: ["숙소근처", "미국슈퍼마켓", "생수/과일", "심야영업", "비회원제"],
      description: "숙소(137 Milton St)에서 가장 가까운 전형적인 미국 대형 슈퍼마켓입니다. 코스트코와 달리 회원권이 전혀 필요 없으며, 아침 5시부터 밤 12시까지 운영합니다. 출장 기간 팀원들과 마실 대용량 생수, 신선한 과일, 요거트, 베이글, 간식을 넉넉히 장보기에 최고입니다.",
      shoppingTips: [
        "팀 숙소용 대용량 생수 & 탄산수",
        "미국 체리 & 블루베리 & 포도",
        "아침용 그릭 요거트 & 베이글",
        "캘리포니아 나파밸리 와인 & 맥주"
      ],
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-trader-joes",
      name: "트레이더 조 (Trader Joe's)",
      nameEn: "Trader Joe's (North Beach / Bay St)",
      category: "mart_shopping",
      rating: 4.7,
      ratingText: "4.7 · 미국 1위 PB 식료품점 (비회원제)",
      address: "401 Bay St, San Francisco, CA 94133",
      locationTag: "North Beach / 다운타운",
      phone: "(415) 674-1215",
      hours: "매일 08:00 - 21:00",
      googleMapsQuery: "Trader Joe's Bay St San Francisco",
      lat: 37.8055,
      lng: -122.4145,
      recommendedTime: "9/16(수) 노스비치/서점 탐방 시 연계",
      themeTags: ["기념품성지", "트조에코백", "베이글시즈닝", "PB스낵", "가성비최고"],
      description: "미국 여행객들의 필수 기념품 쇼핑 성지! 회원제 없이 누구나 합리적인 가격에 독창적인 PB(자체 브랜드) 상품을 구매할 수 있습니다. 유명한 트레이더 조 캔버스 에코백, 에브리띵 베이글 시즈닝, 다크초콜릿 피넛버터컵, 핸드크림 등 선물용 아이템이 가득합니다.",
      shoppingTips: [
        "트레이더 조 캔버스 에코백 ($2.99, 선물 1순위)",
        "Everything but the Bagel 시즈닝",
        "다크 초콜릿 피넛버터 컵",
        "울트라 모이스처라이징 핸드크림",
        "드라이 망고 & 스위트 칠리 소스"
      ],
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-city-lights",
      name: "시티 라이츠 서점 (City Lights Booksellers)",
      nameEn: "City Lights Booksellers & Publishers",
      category: "bookstore",
      rating: 4.7,
      ratingText: "4.7 · SF 문화의 상징적 역사 서점",
      address: "261 Columbus Ave, San Francisco, CA 94133",
      locationTag: "North Beach / 차이나타운 경계",
      phone: "(415) 362-8193",
      hours: "매일 10:00 - 22:00",
      googleMapsQuery: "City Lights Booksellers 261 Columbus Ave San Francisco",
      lat: 37.7976,
      lng: -122.4065,
      recommendedTime: "9/16(수) 18:30~19:30 (차이나타운 후 노스비치 산책)",
      themeTags: ["역사적서점", "비트세대", "앨런긴즈버그", "서점굿즈", "SF문화상징"],
      description: "1953년 시인 로렌스 펄링게티가 설립한 샌프란시스코의 심장이자 문화사적 랜드마크입니다. 앨런 긴즈버그의 대표작 《Howl》을 출판하며 비트 세대(Beat Generation) 문학 운동을 이끈 역사적인 서점입니다. 3개 층에 걸친 서가와 소장 가치 높은 로고 에코백, 엽서, 북마크 굿즈가 유명합니다.",
      shoppingTips: [
        "City Lights 공식 로고 캔버스 토트백",
        "시티 라이츠 출판 시집 & 명언 엽서",
        "문학 북마크 & 스티커 세트",
        "샌프란시스코 도시 역사 서적"
      ],
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-green-apple",
      name: "그린 애플 북스 (Green Apple Books)",
      nameEn: "Green Apple Books (Clement St)",
      category: "bookstore",
      rating: 4.7,
      ratingText: "4.7 · 16만 권 대형 독립서점",
      address: "506 Clement St, San Francisco, CA 94118",
      locationTag: "Inner Richmond",
      phone: "(415) 387-2272",
      hours: "매일 10:00 - 21:00",
      googleMapsQuery: "Green Apple Books 506 Clement St San Francisco",
      lat: 37.7832,
      lng: -122.4641,
      recommendedTime: "자유 일정 시 (미국 대형 독립서점 탐방)",
      themeTags: ["대형서점", "중고서적", "레코드/음반", "서점구경", "보물찾기"],
      description: "약 8,000 sq ft 규모에 10만 권 이상의 중고책과 6만 권의 신간이 미로처럼 빽빽하게 진열된 샌프란시스코 최대 규모의 독립 서점입니다. 서가 사이를 거닐며 희귀한 옛날 판본, 아트북, 빈티지 레코드판(LP), 서점 기념품을 발굴하는 즐거움이 있습니다.",
      shoppingTips: [
        "Green Apple 오리지널 티셔츠 & 에코백",
        "빈티지 아트북 & 사진집",
        "SF 일러스트 북마크",
        "LP 바이닐 레코드"
      ],
      priority: "recommended",
      visited: false
    },
    {
      id: "place-glen-canyon",
      name: "글렌 캐니언 공원 & 빌리지 (Glen Canyon Park)",
      nameEn: "Glen Canyon Park & Glen Park Village",
      category: "near_lodging",
      rating: 4.6,
      ratingText: "4.6 · 도심 속 66에이커 자연공원",
      address: "Elk St & Chenery St, San Francisco, CA 94131",
      locationTag: "137 Milton 숙소 도보 5~10분",
      hours: "매일 06:00 - 22:00",
      googleMapsQuery: "Glen Canyon Park San Francisco",
      lat: 37.7388,
      lng: -122.4419,
      recommendedTime: "9/13(일) 아침/저녁 1~2시간 가벼운 산책",
      themeTags: ["숙소바로앞", "로컬SF", "도심계곡", "산책로", "TimeOut선정"],
      description: "관광지 피셔맨스 워프와는 완전히 다른, '샌프란시스코 현지인들의 일상'을 느끼기 가장 좋은 곳입니다. 도심 한가운데 66에이커(약 8만 평) 규모의 계곡과 산책로가 펼쳐집니다. Time Out '세계에서 가장 쿨한 동네'로 선정된 Glen Park Village와 Greenway를 함께 걸을 수 있습니다.",
      recommendedCourse: "137 Milton St 숙소 → Glen Park Village → Diamond St 로컬 상점 → Glen Park Greenway → Glen Canyon Park 계곡 트레일",
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-yerba-buena",
      name: "예르바 부에나 가든스 (Yerba Buena Gardens)",
      nameEn: "Yerba Buena Gardens",
      category: "near_moscone",
      rating: 4.6,
      ratingText: "4.6 · 도심 속 문화 정원",
      address: "750 Howard St, San Francisco, CA 94103",
      locationTag: "Moscone Center 바로 맞은편",
      phone: "(415) 651-3684",
      hours: "매일 06:00 - 22:00",
      googleMapsQuery: "Yerba Buena Gardens 750 Howard St San Francisco",
      lat: 37.7858,
      lng: -122.4026,
      recommendedTime: "9/15~17 Dreamforce 행사 중간/종료 후 산책",
      themeTags: ["모스콘바로옆", "인공폭포", "마틴루터킹기념비", "도심휴식", "SFMOMA인접"],
      description: "Moscone Center 바로 맞은편에 조성된 도심 속 오아시스입니다. 마틴 루터 킹 기념 폭포벽(Waterfall Memorial), 넓은 잔디밭, 조각 정원이 있어 컨퍼런스 세션 사이사이나 행사 종료 후 30분 동안 머리를 식히며 산책하기에 가장 이상적인 장소입니다.",
      recommendedCourse: "Moscone Center → 폭포수 분수대 → SFMOMA 외관 정원 → Target(789 Mission)",
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-salesforce-park",
      name: "세일즈포스 파크 (Salesforce Park)",
      nameEn: "Salesforce Park (Transbay Transit Center)",
      category: "near_moscone",
      rating: 4.7,
      ratingText: "4.7 · 4층 높이 공중 옥상공원",
      address: "425 Mission St, San Francisco, CA 94105",
      locationTag: "Moscone 도보 7~10분",
      hours: "매일 06:00 - 20:00",
      googleMapsQuery: "Salesforce Park 425 Mission St San Francisco",
      lat: 37.7897,
      lng: -122.3972,
      recommendedTime: "9/14(월) 오후 또는 9/17(목) 한국 랩업 세션 전후",
      themeTags: ["세일즈포스타워", "공중정원", "분수분사쇼", "도심스카이라인", "Dreamforce성지"],
      description: "세일즈포스 타워와 연결된 트랜스베이 터미널 옥상(4층 높이)에 조성된 5.4에이커 규모의 최첨단 공중 공원입니다. 13개의 세계 각국 식물 테마 정원, 버스가 지나갈 때마다 물을 뿜는 분수 산책로, 마천루 뷰를 한눈에 즐길 수 있어 Dreamforce 참가자 필수 방문 코스입니다.",
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-dolores-park",
      name: "미션 디스트릭트 & 돌로레스 파크 (Mission & Dolores Park)",
      nameEn: "Mission Dolores Park & Balmy Alley",
      category: "mission",
      rating: 4.7,
      ratingText: "4.7 · SF 로컬 문화 & 시내 뷰",
      address: "Dolores St & 19th St, San Francisco, CA 94114",
      locationTag: "숙소와 Moscone 사이",
      hours: "매일 06:00 - 22:00",
      googleMapsQuery: "Mission Dolores Park San Francisco",
      lat: 37.7596,
      lng: -122.4269,
      recommendedTime: "9/13(일) 17:30~19:00 일몰 직전",
      themeTags: ["로컬명소", "언덕시내전망", "라틴문화", "발미앨리벽화", "잔디밭휴식"],
      description: "숙소(Glen Park)에서 모스콘으로 이어지는 길목에 위치한 샌프란시스코의 가장 역동적인 동네입니다. 발미 앨리(Balmy Alley)의 강렬한 벽화 예술, 멕시코/라틴 문화, 그리고 돌로레스 파크 언덕 잔디밭에서 내려다보는 샌프란시스코 시내 스카이라인이 환상적입니다.",
      recommendedCourse: "24th St 역 → Balmy Alley 벽화 → Valencia St 독립상점 → Rainbow Grocery → Dolores Park 언덕 전망",
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-twin-peaks",
      name: "트윈 픽스 (Twin Peaks)",
      nameEn: "Twin Peaks",
      category: "viewpoint",
      rating: 4.7,
      ratingText: "4.7 · 샌프란시스코 360도 최고봉 전망대",
      address: "501 Twin Peaks Blvd, San Francisco, CA 94114",
      locationTag: "숙소에서 Uber로 10분",
      hours: "24시간 개방 (일몰/야경 추천)",
      googleMapsQuery: "Twin Peaks San Francisco 501 Twin Peaks Blvd",
      lat: 37.7544,
      lng: -122.4477,
      recommendedTime: "17:30~19:30 (해질녘 골든아워 & 환상적인 야경)",
      themeTags: ["360도전망", "일몰명소", "야경스팟", "숙소근처", "인생샷"],
      description: "숙소(137 Milton St) 위치의 압도적인 장점을 극대화할 수 있는 대표 전망대입니다. 도심 한가운데 솟은 두 개의 봉우리에서 샌프란시스코 만, 다운타운 마천루, 베이브릿지, 금문교 실루엣까지 360도 파노라마로 내려다볼 수 있습니다. 이동 시간이 짧고 뷰 만족도가 극대화되는 최고 효율의 스팟입니다.",
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-chinatown",
      name: "차이나타운 & 드래곤 게이트 (Chinatown)",
      nameEn: "Chinatown & Dragon Gate",
      category: "landmark",
      rating: 4.3,
      ratingText: "4.3 · 북미 최고(最古)의 차이나타운",
      address: "Grant Ave & Bush St, San Francisco, CA 94108",
      locationTag: "Moscone 도보 15분",
      hours: "상시 개방",
      googleMapsQuery: "Dragon Gate Bush St Grant Ave San Francisco",
      lat: 37.7907,
      lng: -122.4058,
      recommendedTime: "9/16(수) 17:30~18:30 (Moscone 종료 후)",
      themeTags: ["역사거리", "드래곤게이트", "붉은홍등", "포춘쿠키", "이국적풍경"],
      description: "북미에서 가장 오래되고 아시아 외 지역에서 가장 큰 규모를 자랑하는 역사적 거리입니다. Bush St의 상징적인 드래곤 게이트에서 시작해 그랜트 애비뉴(Grant Ave)의 붉은 홍등 거리와 포츠머스 스퀘어를 지나며 노스비치로 자연스럽게 연결됩니다.",
      recommendedCourse: "Dragon Gate → Grant Avenue 홍등 거리 → Stockton Street 로컬 시장 → Portsmouth Square → City Lights 서점",
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-coit-tower",
      name: "코이트 타워 (Coit Tower)",
      nameEn: "Coit Tower (Telegraph Hill)",
      category: "viewpoint",
      rating: 4.6,
      ratingText: "4.6 · SF 스카이라인 & 언덕 전망",
      address: "1 Telegraph Hill Blvd, San Francisco, CA 94133",
      locationTag: "North Beach 상단 언덕",
      phone: "(415) 249-0995",
      hours: "매일 10:00 - 17:00 (전망 언덕 상시)",
      googleMapsQuery: "Coit Tower 1 Telegraph Hill Blvd San Francisco",
      lat: 37.8024,
      lng: -122.4058,
      recommendedTime: "9/16(수) 저녁 20:00 전후 야경",
      themeTags: ["언덕전망", "역사벽화", "노스비치야경", "알카트라즈조망", "SF랜드마크"],
      description: "텔레그래프 힐 꼭대기에 우뚝 솟은 64m 높이의 콘크리트 탑으로, 1930년대 소방관들을 기리기 위해 지어졌습니다. 타워 꼭대기뿐 아니라 타워 주변 광장에서 내려다보는 샌프란시스코 베이, 피셔맨스 워프, 도심 마천루의 야경이 일품입니다.",
      priority: "recommended",
      visited: false
    },
    {
      id: "place-ferry-building",
      name: "페리 빌딩 & 엠바카데로 (Ferry Building)",
      nameEn: "Ferry Building & The Embarcadero",
      category: "landmark",
      rating: 4.7,
      ratingText: "4.7 · 베이브릿지 & 해변 산책로",
      address: "1 Ferry Building, San Francisco, CA 94111",
      locationTag: "Moscone에서 Muni/Uber 10분",
      hours: "상점가 매일 07:00 - 20:00 (산책로 상시)",
      googleMapsQuery: "Ferry Building San Francisco",
      lat: 37.7955,
      lng: -122.3937,
      recommendedTime: "9/17(목) 17:00~18:30 (드림포스 마지막 날 저녁)",
      themeTags: ["베이브릿지뷰", "해안산책로", "치안안전구역", "파머스마켓", "마지막밤산책"],
      description: "1898년에 지어진 시계탑 랜드마크이자 샌프란시스코에서 가장 안전하고 아름다운 워터프론트 산책로입니다. 베이브릿지의 웅장한 조명과 푸른 바다를 바라보며 천천히 걷기 좋으며, 건물 내부에는 로컬 올리브오일, 초콜릿, 커피 숍이 모여 있습니다.",
      recommendedCourse: "Ferry Building → Pier 1 → Embarcadero 해안 산책로 → Bay Bridge 조망",
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-lombard",
      name: "롬바드 스트리트 (Lombard Street)",
      nameEn: "Lombard Street (Crooked Street)",
      category: "landmark",
      rating: 4.6,
      ratingText: "4.6 · 8개 급커브 수국 꽃길 언덕",
      address: "1070 Lombard St, San Francisco, CA 94109",
      locationTag: "Russian Hill (노스비치 인근)",
      hours: "24시간 개방",
      googleMapsQuery: "1070 Lombard St San Francisco",
      lat: 37.8021,
      lng: -122.4187,
      recommendedTime: "9/16(수) 노스비치/서점 일정 후 야간 산책 (15분 소요)",
      themeTags: ["곡선언덕", "꽃길", "러시안힐", "케이블카교차로", "기념사진"],
      description: "경사 27도의 가파른 언덕을 안전하게 내려가기 위해 8개의 급커브 지그재그 도로로 설계된 샌프란시스코의 명물입니다. 화려한 수국 꽃과 빅토리아풍 주택이 어우러져 있으며, 언덕 꼭대기에서 코이트 타워와 베이가 시원하게 조망됩니다.",
      priority: "recommended",
      visited: false
    },
    {
      id: "place-doubtfire-house",
      name: "영화 성지: 힐리어드 가족의 집 (Mrs. Doubtfire House)",
      nameEn: "Mrs. Doubtfire - Hillard House",
      category: "cinema_tour",
      rating: 4.8,
      ratingText: "4.8 · 명작 영화 실제 촬영지",
      address: "2640 Steiner St, San Francisco, CA 94115",
      locationTag: "Pacific Heights (모스콘 차량 15분)",
      hours: "외관 관람 (사유지이므로 도로/인도에서 조용히 관람)",
      googleMapsQuery: "2640 Steiner St San Francisco CA 94115",
      lat: 37.7942,
      lng: -122.4363,
      recommendedTime: "9/14(월) 오후 13:00~13:30 (배지 수령 전)",
      themeTags: ["영화촬영지", "미세스다웃파이어", "로빈윌리엄스", "빅토리아주택", "퍼시픽하이츠"],
      description: "로빈 윌리엄스 주연의 전설적인 코미디 가족 영화 《미세스 다웃파이어(1993)》에서 Hillard 가족이 살던 실제 빅토리아 양식 주택입니다. 샌프란시스코의 최고급 주택가인 퍼시픽 하이츠에 위치하며, 영화 팬들이 꽃과 메시지를 남기는 명소입니다.",
      priority: "recommended",
      visited: false
    },
    {
      id: "place-doubtfire-apt",
      name: "영화 성지: 다니엘의 아파트 (Daniel's Apartment)",
      nameEn: "Mrs. Doubtfire - Daniel's Apartment",
      category: "cinema_tour",
      rating: 4.6,
      ratingText: "4.6 · 노스비치 중심 영화 촬영지",
      address: "520-522 Green St, San Francisco, CA 94133",
      locationTag: "North Beach (City Lights 서점 도보 5분)",
      hours: "외관 관람",
      googleMapsQuery: "520 Green St San Francisco CA 94133",
      lat: 37.7997,
      lng: -122.4074,
      recommendedTime: "9/16(수) 시티 라이츠 서점 및 노스비치 산책 시",
      themeTags: ["영화촬영지", "미세스다웃파이어", "다니엘아파트", "노스비치", "골목산책"],
      description: "영화 속 주인공 다니엘(로빈 윌리엄스)이 이혼 후 홀로 살며 할머니 다웃파이어로 변신 분장을 준비하던 실제 아파트 촬영 건물입니다. 노스비치의 아늑한 주택가 골목에 위치해 시티 라이츠 서점, 워싱턴 스퀘어와 함께 묶어서 도보로 구경하기에 최적입니다.",
      priority: "recommended",
      visited: false
    },
    {
      id: "place-exploratorium",
      name: "익스플로러토리엄 (Exploratorium)",
      nameEn: "Exploratorium (Pier 15)",
      category: "landmark",
      rating: 4.7,
      ratingText: "4.7 · Pier 15 해안 과학/체험관",
      address: "Pier 15, The Embarcadero, San Francisco, CA 94111",
      locationTag: "Embarcadero (페리빌딩 도보 10분)",
      phone: "(415) 528-4444",
      hours: "화~일 10:00 - 17:00 (목 야간 18:00~22:00)",
      googleMapsQuery: "Exploratorium Pier 15 San Francisco",
      lat: 37.8014,
      lng: -122.3975,
      recommendedTime: "9/17(목) 엠바카데로 해안 산책 시 외관 및 피어 조망",
      themeTags: ["피어15", "바다조망", "샌프란시스코만", "체험관", "엠바카데로"],
      description: "물리학자 프랭크 오펜하이머가 설립한 세계적인 인터랙티브 체험 박물관으로 피어 15(Pier 15) 바다 위에 지어져 있습니다. 내부 관람을 하지 않더라도 피어 데크를 걸으며 바라보는 바다와 항구, 베이브릿지의 풍경이 매우 뛰어납니다.",
      priority: "optional",
      visited: false
    }
  ],
  proTips: [
    {
      id: "tip-1",
      stage: "safety_sf",
      urgency: "warning",
      title: "⚠️ 샌프란시스코 텐더로인(Tenderloin) 구역 절대 도보 진입 금지",
      content: "모스콘 센터 서쪽의 'Tenderloin' 구역(Market St 북서쪽 에디/엘리스 스트리트 일대)은 마약 및 치안 취약 지역입니다. 구글 지도 도보 경로가 이쪽을 가리키더라도 절대 가로질러 걷지 말고, 마켓 스트리트(Market St) 대로변으로 우회하거나 무조건 우버(Uber)를 타세요!"
    },
    {
      id: "tip-2",
      stage: "safety_sf",
      urgency: "warning",
      title: "📱 길거리 스마트폰 날치기(Snatch) 및 차 안 물건 방치 금지",
      content: "길거리에서 폰을 보며 멍하니 걷지 마세요. 렌터카나 우버를 탈 때도 가방이나 백팩을 차 안에 1초도 두지 마세요 (창문 파손 절도 빈번). 호텔 금고나 몸에 소지하세요."
    },
    {
      id: "tip-3",
      stage: "immigration",
      urgency: "warning",
      title: "🛂 외교부 여권 7대 안전 수칙 & 분실 시 긴급 대처",
      content: "• 여권 서명: 3페이지 서명란에 신용카드와 동일한 필체로 자필 서명 필수\n• 전자칩 보호: 표지에 내장된 IC칩이 구겨지거나 훼손되지 않도록 주의 (케이스 착용)\n• 여권 분실 시: 즉시 현지 경찰서 또는 재외공관(총영사관)에 신고. 분실 신고된 여권은 즉시 무효화되어 다시 찾아도 절대 재사용 불가!\n• 24시간 긴급 연락: 외교부 영사콜센터 (+82-2-3210-0404, 무료)"
    },
    {
      id: "tip-4",
      stage: "dining_tip",
      urgency: "gold",
      title: "💳 해외 결제 듀얼 카드 전략 (토스뱅크 + KB국민 트래블러스)",
      content: "• 토스뱅크 카드 (메인): 해외 결제 수수료 100% 면제, 부족한 금액 자동 환전 결제, 귀국 후 남은 USD 원화 무료 재환전\n• KB국민 트래블러스 카드 (서브/할인): 해외 결제 수수료 면제(1.25%) + 해외 가맹점 10% 환급 할인(월 최대 1만원) + 해외 ATM 월 10회 수수료 면제\n• 꿀팁: 두 카드를 각각 지갑과 숙소 캐리어에 분산 보관하면 분실/도난 시에도 완벽하게 대비할 수 있습니다."
    },
    {
      id: "tip-5",
      stage: "flight",
      urgency: "gold",
      title: "✈️ 유나이티드 항공 (UA 892 / UA 893) 탑승 & 수하물 꿀팁",
      content: "• 출국(UA 892): 9/13 16:50 ICN 출발, 좌석 47K (10시간 50분 소요)\n• 귀국(UA 893): 9/18 10:25 SFO(터미널 3) 출발, 좌석 52J (12시간 35분 소요, 9/19 15:00 한국 도착)\n• 수하물: 위탁 1번째 가방(23kg/50lbs) 무료, 2번째 추가 시 $120\n• 꿀팁: 비행기 탑승 전 스마트폰에 'United Airlines' 앱을 설치하고 영화/기내 엔터테인먼트를 연동해 두세요."
    },
    {
      id: "tip-6",
      stage: "conference",
      urgency: "gold",
      title: "🇰🇷 Korea Trailblazers Night & Wrap-up Session 꿀팁",
      content: "• 9/14(월) 18:00~21:00 Korea Trailblazers Night: BIX San Francisco(56 Gold St)에서 진행되는 공식 한국 참가자 디너 리셉션입니다.\n• 9/17(목) 15:00~17:00 Korea Wrap-up Session: 세일즈포스 타워 웨스트 3층(C04/05)에서 열리는 핵심 내용 총정리 세션입니다.\n• 팁: 국내 기업 임원 및 세일즈포스 엔지니어들과 인사를 나누고 링크드인 1촌을 맺기 가장 좋은 기회입니다."
    },
    {
      id: "tip-7",
      stage: "pre_trip",
      urgency: "gold",
      title: "🏡 Milton St 단체 숙소 & 모스콘 센터 이동 꿀팁",
      content: "• 숙소 주소: 137 Milton St, San Francisco, CA 94112 (호스트: +1 213-361-1889)\n• 모스콘 센터 이동: 우버/리프트(Uber XL)로 약 15~20분 소요 (팀원 5인 동시 탑승 추천)\n• 대중교통: 인근 Glen Park BART 역 탑승 시 Powell St 역(모스콘 센터)까지 12분 만에 직통 이동 가능\n• ESTA/비자 정보: 미국 내 체류지 주소 및 연락처로 본 숙소 정보를 기재하시면 됩니다."
    },
    {
      id: "tip-8",
      stage: "wellness_jetlag",
      urgency: "gold",
      title: "☀️ 16시간 시차 극복 황금 법칙 (오후 2시 카페인 금지)",
      content: "샌프란시스코는 한국보다 16시간 느립니다. 현지 아침 8시에 꼭 야외로 나가 20분간 햇볕을 쬐세요(생체 시계 리셋). 그리고 오후 2시 이후에는 커피나 에너지 음료를 절대 마시지 마세요. 첫날 밤 10시에 멜라토닌 1알을 먹고 자면 3일 차부터 최상의 컨디션을 유지합니다."
    },
    {
      id: "tip-9",
      stage: "dining_tip",
      urgency: "info",
      title: "💵 미국 팁(Tip) 문화 완벽 정리",
      content: "• 일반 식당(테이블 서빙): 점심 15~18%, 저녁 18~20% (계산서 아래 Tip 칸에 적거나 단말기에서 터치)\n• 스타벅스/패스트푸드: 팁 의무 아님 (No Tip 터치 가능)\n• 우버(Uber): 탑승 완료 후 앱에서 $2~5 또는 15% 선택\n• 숙소 에어비앤비: 별도 팁 의무 없음 (체크아웃 시 쓰레기 분리수거 및 정리 권장)"
    }
  ],
  expenses: [
    {
      id: "exp-1",
      date: "2026-09-13",
      category: "transport",
      amountUSD: 52.50,
      amountKRW: 72712,
      description: "SFO 공항 -> 137 Milton St 숙소 Uber XL 탑승 (팀원 이동)",
      paymentMethod: "법인카드"
    },
    {
      id: "exp-2",
      date: "2026-09-13",
      category: "meals",
      amountUSD: 85.00,
      amountKRW: 117725,
      description: "숙소 인근 저녁 식사 및 마트 생수/간식 팀 구매",
      paymentMethod: "법인카드"
    }
  ],
  customSections: [
    {
      id: "sec-1",
      title: "🎁 샌프란시스코 귀국 추천 선물 & 맛집",
      icon: "Gift",
      description: "귀국 전 동료/가족을 위한 실속 쇼핑 리스트 & 검증된 맛집",
      items: [
        {
          id: "item-1",
          title: "기라델리(Ghirardelli) 스퀘어 초콜릿",
          content: "마켓 스트리트 대형 마트(Target/Walgreens)나 기라델리 스퀘어에서 시솔트 카라멜 대용량 팩 구매 (사내 선물로 최고 인기)",
          tag: "선물"
        },
        {
          id: "item-2",
          title: "블루보틀 민트 플라자점 (모스콘 도보 5분)",
          content: "원조 샌프란시스코 블루보틀의 뉴올리언스 아이스커피(NOLA) & 원두 구매 추천",
          tag: "카페"
        },
        {
          id: "item-3",
          title: "피어39 보딘(Boudin) 사워도우 클램 차우더",
          content: "갓 구운 사워도우 빵 안에 따뜻한 조개 크림 수프. 샌프란시스코 대표 소울 푸드",
          tag: "맛집"
        }
      ]
    }
  ],
  safetyZones: [
    {
      id: "safe-1",
      name: "⚠️ 텐더로인 (Tenderloin) & 시빅센터 일부",
      status: "danger",
      description: "마켓 스트리트 북서쪽, 오패럴/에디/엘리스 스트리트 일대",
      safetyRule: "낮/밤 불문 도보 진입 절대 금지! 이동 시 무조건 우버 탑승."
    },
    {
      id: "safe-2",
      name: "🟡 마켓 스트리트 (Market St) & 파웰역 주변",
      status: "caution",
      description: "케이블카 종점 및 주요 쇼핑몰 일대",
      safetyRule: "유동 인구가 많으나 스마트폰 소매치기 및 노숙인 빈번. 가방 앞으로 메기."
    },
    {
      id: "safe-3",
      name: "🟢 모스콘 센터 (Moscone Center Campus) & 예르바 부에나",
      status: "safe",
      description: "드림포스 보안 요원 및 SFPD 경찰 대거 배치 구역",
      safetyRule: "배지를 착용한 수만 명의 참가자가 있어 안전함. 야간에는 큰길 이용."
    },
    {
      id: "safe-4",
      name: "🟢 Milton St 숙소 주변 & Glen Park 주거 구역",
      status: "safe",
      description: "조용하고 한적한 샌프란시스코 남부 주택가",
      safetyRule: "비교적 안전하나 야간 단독 외출 시 주의, 모스콘 센터 이동 시 우버/BART 활용."
    },
    {
      id: "safe-5",
      name: "🟢 페리 빌딩 (Ferry Building) & 엠바카데로 해변가",
      status: "must_visit",
      description: "바닷바람과 베이브릿지가 보이는 쾌적하고 안전한 산책로",
      safetyRule: "아침 조깅 및 점심 식사로 최고의 안전 구역."
    }
  ]
};
