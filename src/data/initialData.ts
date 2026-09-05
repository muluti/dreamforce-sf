import { AppData } from "../types";

export const initialAppData: AppData = {
  pin: "9990",
  userName: "김진수",
  exchangeRate: 1385,
  timelineEvents: [
    {
      id: "ev-1a",
      date: "2026-09-13",
      time: "11:30 - 13:30",
      title: "집에서 출발 & 최종 패킹 점검 (여권 / 휴대폰 / ESTA)",
      category: "flight",
      location: "자택 -> 인천국제공항 이동",
      description: "여행의 첫날, 공항에 늦지 않게 14:00 도착을 목표로 여유롭게 출발. 여권, 휴대폰 충전, 지갑/카드, ESTA 승인 여부, 항공권 확인",
      proTip: "★ 절대 주의: 여권은 절대로 캐리어(위탁수하물)에 넣지 마세요! 항상 기내에 들고 탈 작은 가방이나 몸에 소지해야 합니다. 휴대폰 배터리는 완충해 두세요.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-1b",
      date: "2026-09-13",
      time: "14:00 - 15:00",
      title: "인천공항 도착 (14:00) & 전광판 확인 -> UA 체크인 / 수하물 위탁",
      category: "flight",
      location: "인천공항 제1여객터미널 (United Airlines 카운터)",
      description: "★ 공항 도착 후 제일 먼저 할 일: 전광판에서 'UA892 / San Francisco (SFO) / 16:50' 항공편의 체크인 카운터 위치 확인! 확인된 United 카운터로 이동하여 여권 제시 후 'San Francisco'라고 말하고 23kg 위탁수하물 1개 위탁 (정창열 이사님은 T2 대한항공 KE033 수속)",
      proTip: "★ 결정적 꿀팁: 수하물을 맡긴 후 받은 태그에 최종 목적지 'SFO'가 정확히 찍혀 있는지 반드시 눈으로 확인하세요! (공항에 일찍 도착해도 당황하지 말고 카운터 오픈 대기)",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-1c",
      date: "2026-09-13",
      time: "15:00 - 16:00",
      title: "보안검색 & 대한민국 출국심사 통과 -> 면세구역 진입",
      category: "flight",
      location: "인천공항 제1여객터미널 출국장",
      description: "안내 표지판의 '출국장 / 보안검색'을 따라 이동. 기내 가방 및 신체 보안검색 (노트북/액체류 분리 안내 준수) 후 출국심사 진행. 대한민국 출국 절차이므로 미국 입국심사가 아닙니다 (미국 입국심사는 SFO 도착 후 진행)",
      proTip: "보안검색대를 통과하면 면세구역으로 진입하며, 다시 일반구역으로 되돌아올 수 없습니다. 액체류(음료수)는 보안검색 전에 마시거나 폐기하세요.",
      completed: false
    },
    {
      id: "ev-1d",
      date: "2026-09-13",
      time: "16:00 - 16:20",
      title: "★ [쇼핑 전 필수] 탑승구(Gate) 위치 먼저 확인 & 16:20 Gate 도착",
      category: "flight",
      location: "면세구역 -> UA892 지정 탑승구(Gate)",
      description: "면세점 쇼핑 전에 전광판에서 UA892의 탑승구(Gate) 번호를 먼저 찾으세요! 인천공항은 탑승동까지 셔틀트레인으로 이동해야 할 수도 있으므로, Gate 위치를 먼저 확인하고 이동한 뒤 그 근처에서 화장실/음료구입/면세점 구경을 하세요. 16:20(출발 30분 전)까지 탑승구 도착 필수",
      proTip: "초보자 황금 공식: '면세점 구경 후 탑승구 찾기'가 아니라 '탑승구 위치 확인 및 이동 후 그 주변 구경하기'가 마음이 가장 편합니다!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-2",
      date: "2026-09-13",
      time: "16:20 - 16:50 (KST)",
      title: "UA 892 탑승 (좌석 47K) & 기내 휴대폰 완충 & SFO로 이륙",
      category: "flight",
      location: "유나이티드 항공 UA 892 (Boeing 787-9 Dreamliner) / 탑승구",
      description: "16:20 Gate 도착 (손에 실물 여권, 모바일 탑승권, 휴대폰 꺼내두기). 화면 UA892 확인 후 탑승. 47K 좌석 착석 (캐리어는 선반 Overhead Bin, 소형 가방은 앞 좌석 아래). 비행기 모드, 안전벨트 착용. ★ 기내 USB 포트로 휴대폰 100% 완충 필수! (도착 직후 지도/Uber/연락 집중 사용). 기내식 물 요청: 'Could I have some water, please?'",
      proTip: "★ 장거리 비행 후 SFO에 도착하자마자 지도/Uber/연락에 배터리를 집중 사용하므로 기내에서 100% 충전하세요! 착륙 1시간 전: 여권 꺼내기, 배터리 확인, CBP 3문장 머릿속 연습.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-3",
      date: "2026-09-13",
      time: "11:40 - 13:30 (PDT)",
      title: "SFO 공항 착륙 (11:40) & 미국 입국 8단계 완벽 통과",
      category: "flight",
      location: "San Francisco International Airport (SFO)",
      description: "① 표지판 'Arrivals / Immigration / Passport Control' 따라 이동 -> ② CBP 입국심사: 단문 답변 ('For a conference and tourism', 'Five days', '137 Milton St') -> ③ 'Baggage Claim' 이동 -> ④ 전광판 UA892 확인 후 23kg 수하물 벨트 대기 -> ⑤ 인천에서 받은 수하물 태그 번호 대조 필수! -> ⑥ Customs(세관) 통과 -> ⑦ ★ 초특급 주의: 환승길(Connecting Flights) 가지 말고 'San Francisco' 출구로 나오기!",
      proTip: "★ 'Connecting Flights(환승)'는 다른 도시로 갈아타는 사람용 통로입니다! 우리는 SFO가 최종 목적지이므로 반드시 'San Francisco' 출구로 나와야 로비로 이어집니다.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-4",
      date: "2026-09-13",
      time: "13:30 - 15:00",
      title: "SFO 공항 -> Milton St 숙소 이동 (Uber/Taxi) & 체크인 & 객실 5대 점검",
      category: "hotel",
      location: "137 Milton St, San Francisco, CA 94112",
      description: "Ride App Pickup 구역에서 Uber 호출. 탑승 전 차종, 번호판, 기사 대조 ('Are you here for JS?'). 택시 이용 시 Taxi 표지판 -> 줄서기 -> 137 Milton St 주소 제시. 숙소 도착 후 프런트 'Hi, I have a reservation under Jinsoo Kim.' (말이 빠르면 'Could you speak a little more slowly, please?'). 방 입장 즉시 5대 점검 (여권, 지갑/카드, 폰 충전, 캐리어 잠금, 호텔키)!",
      proTip: "★ 방에 들어가자마자 짐부터 풀지 마세요! [여권 / 지갑카드 / 휴대폰 충전 / 캐리어 잠금 / 호텔키 보관] 5대 필수 점검을 마친 후 휴식을 취하세요.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-5",
      date: "2026-09-13",
      time: "16:00 - 18:30",
      title: "숙소 인근 장보기 (Safeway) & 첫날 저녁 식사 / 시차 적응",
      category: "sightseeing",
      location: "Safeway Diamond Heights & 숙소 인근",
      description: "차량 5분 거리 Safeway에서 팀 생수, 과일, 간식 장보기 후 든든한 저녁 식사 및 22:00 이전 조기 취침(멜라토닌 복용)",
      proTip: "첫날 16시간 시차 극복을 위해 오후 2시 이후 카페인을 피하고 밤 10시에 취침하세요.",
      completed: false
    },
    {
      id: "ev-6",
      date: "2026-09-14",
      time: "10:00 - 12:30",
      title: "★ [필수] 드림포스 사전 배지(Badge) 수령 & 모스콘 캠퍼스 답사",
      category: "keynote",
      location: "Moscone West L1 (Registration) / Yerba Buena Gardens",
      description: "★ 월요일 사전 배지 수령 필수! Moscone West 1층 등록 센터에서 실물 여권과 사전등록 바코드를 제시하고 목걸이 배지 및 웰컴 키트 수령",
      proTip: "⚠️ 화요일 개막 당일 아침에는 배지 수령 줄이 30~60분 이상 길어집니다! 9/14(월)에 미리 받아두면 화요일 일정이 여유롭습니다. 실물 여권 지참 필수(사진 불가)!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-6b",
      date: "2026-09-14",
      time: "13:30 - 16:30",
      title: "드림포스 캠퍼스 16개 구역 동선 확인 & 팀 미팅 (※ 와인투어 미해당)",
      category: "session",
      location: "Moscone Campus (North / South / West / City View)",
      description: "모스콘 센터 및 내일 키노트 홀(South LL), 인터내셔널 라운지(City View 2번) 위치 사전 답사 (※ KR Winery Tour 08:20~18:00는 고객사 전용 프로그램으로 선착순 마감됨)",
      proTip: "내일 메인 키노트 입장 동선과 2번 City View 인터내셔널 라운지(KR/JP/TW 전용 무료 커피/음료) 위치를 미리 익혀두세요.",
      completed: false
    },
    {
      id: "ev-7",
      date: "2026-09-14",
      time: "18:00 - 21:00",
      title: "🌉 🇰🇷 Korea Trailblazers Night (한국 참가자 공식 디너 & 네트워킹)",
      category: "party",
      location: "BIX SAN FRANCISCO (56 Gold St, San Francisco)",
      description: "세일즈포스 코리아 주최 공식 한국 참가자 네트워킹 디너 리셉션. 역사적인 재즈바에서 최고급 핑거푸드와 주류가 무제한 제공되며, 국내 디지털 혁신 리더들과 교류",
      proTip: "★ BIX SF는 차이나타운 인근 골목에 위치합니다. 안전을 위해 모스콘이나 숙소에서 우버/택시를 타고 이동하세요! 영문 명함과 스마트폰 링크드인 QR 필수 지참.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-8",
      date: "2026-09-15",
      time: "09:00 - 11:30",
      title: "🌟 메인 오프닝 키노트 (Marc Benioff & Special Guests)",
      category: "keynote",
      location: "Moscone South - Main Keynote Hall (Level LL)",
      description: "드림포스 2026의 서막! 세일즈포스 Agentforce 3.0 및 차세대 자율 AI 에이전트, Anthropic Claude 협력 로드맵 발표",
      proTip: "좋은 자리를 잡으려면 최소 45분 전(08:15)까지 입장하세요. 배지를 미리 수령했으므로 바로 키노트 홀로 입장 가능!",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-cityview-15",
      date: "2026-09-15",
      time: "11:45 - 13:00",
      title: "☕ 2번 City View International Lounge (KR / JP / TW 라운지) 휴식 & 커피",
      category: "custom",
      location: "City View (Metreon 인근, 캠퍼스 맵 2번 구역)",
      description: "한국(KR), 일본(JP), 대만(TW) 참가자 전용 라운지 방문. 무료 바리스타 오더 커피 및 프리미엄 음료를 마시며 키노트 내용 정리 및 휴식",
      proTip: "외부 비싼 카페를 찾을 필요 없이 2번 City View 라운지를 적극 활용하세요! 사전 예약 가능한 비즈니스 미팅룸도 구비되어 있습니다.",
      completed: false
    },
    {
      id: "ev-9",
      date: "2026-09-15",
      time: "13:00 - 16:30",
      title: "Campground (전시 부스) 탐방 & Agentic Enterprise 솔루션 시연",
      category: "session",
      location: "Moscone North LL & South LL",
      description: "글로벌 파트너/ISV 솔루션 부스 방문, 차세대 자율 AI 에이전트 라이브 데모 관람, 스와그(굿즈) 수집",
      proTip: "부스 스태프에게 'Could you give me a quick 2-minute demo?'로 질문하고 명함을 교환하세요.",
      completed: false
    },
    {
      id: "ev-exec-dinner",
      date: "2026-09-15",
      time: "18:30 - 21:00",
      title: "🍽️ KR Exec Summit Dinner (한국 참가사 임원 서밋 디너)",
      category: "meeting",
      location: "San Francisco 시내 (지정 레스토랑)",
      description: "한국 세일즈포스 고객사 및 파트너 임원진과의 프라이빗 디너 네트워킹",
      completed: false
    },
    {
      id: "ev-10",
      date: "2026-09-16",
      time: "09:00 - 11:30",
      title: "🤖 Agentforce Keynote & Anthropic Claude 협력 발표 (Claude Force)",
      category: "keynote",
      location: "Moscone South / West",
      description: "Agentforce 핵심 기술 키노트 및 Anthropic 최고경영진 특별 세션. 세일즈포스 전 제품군에 통합되는 'Claude Force' 혁신 세부 사항 공개",
      proTip: "현장 좌석이 빠르게 마감될 수 있으니 미리 착석하거나 Salesforce+ 앱 라이브 스트리밍을 병행하세요.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-ohana-tour",
      date: "2026-09-16",
      time: "13:40 - 14:40",
      title: "🏢 🇰🇷 [Group A 확정] Ohana Floor Tour (세일즈포스 타워 61층 오하나 플로어 투어)",
      category: "party",
      location: "Salesforce Tower (1층 Salesforce Plaza Tent 집결 -> 61층 Ohana Floor)",
      description: "★ [DKBMC 2명 Group A 배정!] 13:40까지 세일즈포스 플라자(1층 광장) 텐트 도착 후 체크인 완료! 실물 여권(사진 불가)과 24시간 전 수신된 QR코드를 보여주고 주황색 뱃지/손목밴드 수령. 세일즈포스 코리아 얼라이언스팀(전선아 님, 조영보 상무님)과 조인하여 전용 줄을 서서 61층으로 동행 입장 (총 11명: DKBMC 2명, DaeU AIon 6명, Discussion 3명). 61층에서 샌프란시스코 360도 파노라마 뷰 감상, 최고급 핑거푸드/음료, 기념 촬영",
      proTip: "⚠️ [필수 주의사항]\n1. 13:40 정시 도착 필수 (드림포스 기간 대기 30~60분 소요 가능)\n2. 24시간 전 수신된 'Guest Pre-registration' 이메일로 사전 신청 & NDA 서명 후 QR코드 발급 필수 (스팸함 확인!)\n3. 실물 여권 필수 지참 (스마트폰 여권 사진/사본 절대 입장 불가!)\n4. 모든 게스트는 세일즈포스 코리아 직원과 동행하여 엘리베이터 탑승",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-11",
      date: "2026-09-16",
      time: "18:00 - 22:30",
      title: "🎸 Dreamfest 2026 자선 콘서트 (Usher & Gwen Stefani 라이브)",
      category: "party",
      location: "Oracle Park (San Francisco Giants 야구장)",
      description: "드림포스 공식 최대 야외 축제! 세계적인 팝 슈퍼스타 Usher(어셔) & Gwen Stefani(그웬 스테파니) 라이브 공연. 모스콘 센터에서 도보 15~20분 거리(셔틀 미운행). 경기장 내 푸드/맥주/와인/음료 무제한 무료 제공",
      proTip: "⚠️ [초특급 주의: 가방 규정]\n• 대형 백팩 및 노트북 가방은 절대 반입 불가 (입구에서 차단됨)!\n• 소형 클러치백이나 힙색만 허용됩니다. 백팩은 숙소나 Moscone West 락커에 미리 보관하세요.\n• 드림포스 배지 필수 지참! 바닷바람이 매우 쌀쌀하니 두꺼운 외투나 패딩을 꼭 챙기세요.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-12",
      date: "2026-09-17",
      time: "10:00 - 12:30",
      title: "Customer Success Keynote & Dreampitch: AI for Good",
      category: "keynote",
      location: "Moscone South / West",
      description: "고객 성공 사례 키노트, Dreampitch AI 스타트업 피칭 및 글로벌 리더 파이어사이드 챗",
      completed: false
    },
    {
      id: "ev-13",
      date: "2026-09-17",
      time: "14:40 - 17:00",
      title: "👨‍💻 🇰🇷 Korea Wrap-up Session (한국 참가자 공식 랩업 세션)",
      category: "session",
      location: "Salesforce Tower West 3F - C04/05",
      description: "★ 3일간의 드림포스 핵심 발표와 세일즈포스 최신 AI 전략을 한국 SE 전문가들이 한국어로 명쾌하게 요약 정리해 드리는 필수 세션. 14:40까지 세일즈포스 타워에 도착하여 1층 체크인 프로세스 진행",
      proTip: "세일즈포스 타워 입장 시 실물 여권 지참 필수! 14:40까지 미리 도착하세요. 귀국 후 사내 보고서 작성에 필요한 핵심 장표와 로드맵 인사이트를 얻을 수 있습니다.",
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
      description: "컨퍼런스 공식 일정 종료 후 DK BMC 팀원들과 기념 촬영, 기라델리 초콜릿 선물 구매 및 보딘 사워도우 클램 차우더 저녁 회식",
      proTip: "내일(9/18) 귀국 비행기 탑승이 있으므로 기념품 쇼핑과 시내 관광은 오늘 저녁에 완료하세요!",
      completed: false
    },
    {
      id: "ev-15",
      date: "2026-09-18",
      time: "07:30 - 09:30",
      title: "숙소 체크아웃 & SFO 공항 이동 (UA: T3 / KE: T1)",
      category: "hotel",
      location: "137 Milton St -> SFO 공항 터미널 1 & 3",
      description: "숙소 얼리 체크아웃 후 Uber XL로 SFO 공항 이동. 김진수 님은 터미널 3(UA893, 10:25 출발), 정창열 이사님은 터미널 1(KE034, 12:50 출발) 하차",
      proTip: "국제선 출국 3시간 전 공항 도착 필수. 탑승구 앞 면세점에서 샌프란시스코 로컬 기념품 구매 가능.",
      isImportant: true,
      completed: false
    },
    {
      id: "ev-16",
      date: "2026-09-18",
      time: "10:25 / 12:50 (PDT) -> 9/19 15:00 / 17:20 (KST)",
      title: "샌프란시스코(SFO) -> 인천(ICN) 귀국 비행 & 도착",
      category: "flight",
      location: "유나이티드 UA 893 (10:25 출발 -> 9/19 15:00 ICN T1 도착) / 대한항공 KE 034 (12:50 출발 -> 9/19 17:20 ICN T2 도착)",
      description: "태평양 횡단 비행 후 9월 19일(토) 오후 인천국제공항 안전 귀국. 수하물 수령 후 귀가",
      proTip: "인천공항 도착 후 남은 미국 달러는 토스뱅크 외화통장에서 수수료 0원으로 원화 무료 재환전 가능!",
      isImportant: true,
      completed: false
    }
  ],
  travelDocuments: [
    {
      id: "doc-icn-sfo-guide",
      category: "custom",
      title: "🛫 [초보자 필독] 비행기 탑승 ~ SFO 입국 ~ 호텔 체크인 20단계 실전 가이드",
      subtitle: "김진수 님(UA892) 탑승부터 객실 5대 점검까지 완벽 시뮬레이터",
      fields: [
        { label: "1. 16:20 Gate 탑승 준비", value: "실물 여권, 모바일 탑승권, 휴대폰 손에 꺼내두기 (화면 UA892 확인)" },
        { label: "2. 좌석 47K & 짐정리", value: "기내 캐리어는 선반(Overhead Bin), 소형 가방은 앞 좌석 밑" },
        { label: "3. ★ 기내 휴대폰 충전", value: "비행 중 좌석 USB 포트로 100% 완충 필수! (도착 즉시 지도/Uber/연락 사용)" },
        { label: "4. 기내 필수 소지 서류", value: "여권, 숙소 바우처(137 Milton St), 일정표, 귀국티켓, ESTA" },
        { label: "5. 기내식 물 요청 영어", value: "'Could I have some water, please?'" },
        { label: "6. 착륙 1시간 전 4대 체크", value: "여권 꺼내기, 배터리 확인, 주소 확인, CBP 답변 머릿속 연습" },
        { label: "7. SFO 착륙 (11:40)", value: "표지판 'Arrivals / Immigration / Passport Control' 이동" },
        { label: "8. ★ CBP 입국심사 답변", value: "'For a conference and tourism' / 'Five days' (단문 답변)" },
        { label: "9. 입국심사 통과 후", value: "여권 돌려받고 'Baggage Claim' 표지판 따라 이동" },
        { label: "10. 수하물(23kg) 찾기", value: "전광판 UA892 확인 -> 컨베이어 번호 벨트에서 캐리어 대기" },
        { label: "11. ★ 내 가방 확인(태그)", value: "인천공항 위탁 시 받은 수하물 태그 번호와 캐리어 태그 대조 필수" },
        { label: "12. 세관(Customs)", value: "신고 물품 없으면 직진 통과" },
        { label: "13. ★ 공항 밖 출구 주의", value: "'Connecting Flights(환승)' 절대 X! 'San Francisco' 출구로 진출" },
        { label: "14. 숙소 이동 (Uber/Lyft)", value: "목적지 사전입력, 요금 사전확정, 자동 카드결제로 추천" },
        { label: "15. ★ Uber 탑승 전 3대 확인", value: "차종, 번호판, 기사 대조 후 기사에게 'Are you here for JS?'" },
        { label: "16. 택시(Taxi) 이용 시", value: "Taxi 표지판 -> 승차장 줄서기 -> 기사에게 137 Milton St 주소 제시" },
        { label: "17. 차 안에서 행동 요령", value: "Google Maps로 실시간 경로 확인, 현금 꺼내지 않기" },
        { label: "18. 호텔 프런트 데스크", value: "'Hi, I have a reservation. It\\'s under Jinsoo Kim.'" },
        { label: "19. 말이 빠를 때 만능 영어", value: "'Could you speak a little more slowly, please?'" },
        { label: "20. ★ 방 입실 직후 5대 점검", value: "짐 풀기 전 [여권 / 지갑카드 / 폰충전 / 캐리어잠금 / 호텔키] 즉시 확인" }
      ],
      notes: "★ [초보자를 위한 SFO 도착 7단계 핵심 동선]\n① Immigration (CBP 입국심사: 'For conference and tourism')\n② Baggage Claim (UA892 벨트에서 23kg 수하물 태그 대조)\n③ Customs (세관 통과)\n④ 'San Francisco' 출구 (★ Connecting Flights 환승길 절대 가지 말기!)\n⑤ Uber / Lyft / Taxi (번호판 확인 & 137 Milton St)\n⑥ Hotel 도착 ('Reservation under Jinsoo Kim')\n⑦ Check-in & 객실 입실 (짐 풀기 전 5대 필수 점검!)\n\n※ 이번 여행은 SFO가 최종 목적지이므로 국내선 환승 절차가 없어 생각보다 매우 단순합니다. 상단의 '20단계 전체 가이드북'을 터치하여 상세 매뉴얼을 확인하세요!"
    },
    {
      id: "doc-1",
      category: "passport_esta",
      title: "여권 및 미국 ESTA 승인 정보",
      subtitle: "외교부 7대 수칙 & ESTA 체류 정보",
      fields: [
        { label: "성명 (Name)", value: "KIM JINSOO (김진수)" },
        { label: "여권 유효기간", value: "2027년 이후 만료 (입국 기준 6개월 이상 잔여 확인)" },
        { label: "여권 서명 확인", value: "3페이지 자필 서명 완료 (카드/출입국 서류와 일치)" },
        { label: "실물 여권 필수", value: "타워 입장 및 배지 수령 시 실물 여권만 인정 (사진 불가)" },
        { label: "여권 보관 원칙", value: "절대 위탁수하물에 넣지 말 것! 항상 기내 가방에 소지" },
        { label: "ESTA 신청 번호", value: "ESTA-2026-KR-99824" },
        { label: "미국 내 체류 주소", value: "137 Milton St, San Francisco, CA 94112" },
        { label: "미국 내 연락처 (Host)", value: "+1 213-361-1889" },
        { label: "체류 목적", value: "Business Conference (Dreamforce 2026 - DK BMC)" }
      ],
      notes: "[ESTA/입국 필수 정보] 비자/ESTA 신청 시 기재한 미국 내 체류지 주소는 '137 Milton St, San Francisco, CA 94112'이며 연락처는 호스트 전화번호 '+1 213-361-1889'입니다.",
      emergencyContact: "외교부 24시간 영사콜센터: +82-2-3210-0404 / 샌프란시스코 총영사관: +1-415-921-2251"
    },
    {
      id: "doc-flight-ke",
      category: "flight",
      title: "대한항공 (Korean Air) E-Ticket (정창열 이사)",
      subtitle: "예약번호: D3TQAV / 2119N (하나투어)",
      fields: [
        { label: "승객명", value: "JEONG / CHAN GYEOL MR (정창열)" },
        { label: "항공권 번호", value: "1804623421481" },
        { label: "항공사 예약번호", value: "D3TQAV" },
        { label: "여행사 예약번호", value: "2119N / 1G (하나투어)" },
        { label: "출국편 (ICN -> SFO)", value: "KE 033 (9/13 16:00 ICN T2 -> 9/13 10:40 SFO T1) | 일반석(K)" },
        { label: "귀국편 (SFO -> ICN)", value: "KE 034 (9/18 12:50 SFO T1 -> 9/19 17:20 ICN T2) | 일반석(Q)" },
        { label: "무료 위탁 수하물", value: "2 Piece(s) 무료 위탁 포함" },
        { label: "총 결제 금액", value: "₩1,610,400 (항공운임 ₩1,229,000 + 제세공과금 ₩381,400)" }
      ],
      notes: "대한항공 KE 033/034편은 인천국제공항 제2여객터미널(T2)에서 출도착합니다. 하나투어 예약번호 2119N 또는 항공사 예약번호 D3TQAV로 모바일 탑승권 발급 가능합니다.",
      emergencyContact: "대한항공 고객센터: 1588-2001 / 하나투어 고객센터: 1577-1233",
      media: [
        {
          id: "m-ticket-ke",
          type: "image",
          url: "/ticket_ke_jcy.jpg",
          name: "대한항공 E-티켓 및 여정 영수증"
        }
      ]
    },
    {
      id: "doc-2",
      category: "flight",
      title: "유나이티드 항공 (United Airlines) E-Ticket (김진수)",
      subtitle: "예약 번호: NVV8JR (김진수)",
      fields: [
        { label: "United 예약 번호", value: "NVV8JR" },
        { label: "승객명 / 이메일", value: "Jinsoo Kim / jinsoo****@gmail.com" },
        { label: "총 결제 금액", value: "₩1,276,600 (운임 ₩874,000 + 유류 ₩242,600 + 세금/수수료 ₩160,000)" },
        { label: "출국편 (ICN -> SFO)", value: "UA 892 (9/13 16:50 KST -> 9/13 11:40 PDT) | 좌석 47K (T1)" },
        { label: "귀국편 (SFO -> ICN)", value: "UA 893 (9/18 10:25 PDT -> 9/19 15:00 KST) | 좌석 52J (T3)" },
        { label: "운항 기종 / 클래스", value: "Boeing 787-9 Dreamliner | 베이직 이코노미(K/G)" },
        { label: "수하물 규정", value: "1st Bag(위탁 23kg 1개) 무료 포함 / 2nd Bag USD $120" },
        { label: "기내 수하물", value: "기내 휴대 가방 1개 + 개인 소지품 1개 반입 가능" }
      ],
      notes: "유나이티드 앱에서 모바일 체크인 및 좌석 확인 가능. 인천공항 제1여객터미널(T1) 출발, SFO 터미널 3 출도착.",
      emergencyContact: "유나이티드 항공 고객센터: +82-2-751-0300 (한국) / +1-800-864-8331 (미국)"
    },
    {
      id: "doc-5",
      category: "dreamforce_badge",
      title: "드림포스 2026 등록 & 한국 프로그램 완벽 안내",
      subtitle: "오하나 투어 Group A & 코리아 프로그램",
      fields: [
        { label: "소속 / 등록사", value: "DK BMC (디케이비엠씨) / 정창열 이사, 김진수 외" },
        { label: "★ 오하나 투어 배정", value: "Group A 확정 (9/16 수 14:00~14:40) @ 타워 61F" },
        { label: "오하나 투어 집결", value: "9/16(수) 13:40까지 Salesforce Plaza Tent 도착" },
        { label: "오하나 필수 준비", value: "실물 여권(사진 불가) + 24시간 전 메일 QR코드" },
        { label: "Korea Night", value: "9/14(월) 18:00~21:00 @ BIX SF (56 Gold St)" },
        { label: "Korea Wrap-up Session", value: "9/17(목) 15:00~17:00 @ Salesforce Tower West 3F" },
        { label: "배지 사전 수령", value: "9/14(월) Moscone West L1 (실물 여권 지참 필수)" },
        { label: "전용 인터내셔널 라운지", value: "2번 City View (KR/JP/TW 무료 커피 & 미팅룸)" },
        { label: "Dreamfest 가방 규정", value: "오라클 파크 백팩 반입 절대 불가 (소형 힙색만 허용)" }
      ],
      notes: "★ [오하나 플로어 투어 체크인 5단계]\n1. 24~48시간 전 'Guest Pre-registration' 이메일 수신 후 NDA 서명 및 QR코드 발급\n2. 9/16(수) 13:40까지 Salesforce Plaza(타워 1층 광장) 텐트 도착\n3. QR코드 및 실물 여권(사진 불가) 제시\n4. 주황색 뱃지 또는 손목밴드 착용\n5. Tent에서 세일즈포스 코리아 직원(전선아/조영보)과 조인하여 61층 동행 입장",
      media: [
        {
          id: "m-campus-map",
          type: "image",
          url: "/df2026_campus_map.png",
          name: "드림포스 2026 캠퍼스 상세 맵 (16개 핵심 구역)"
        },
        {
          id: "m-agenda-kr",
          type: "image",
          url: "/df2026_agenda_kr.png",
          name: "드림포스 2026 KR 프로그램 포함 전체 일정표"
        }
      ]
    },
    {
      id: "doc-slack-guide",
      category: "custom",
      title: "세일즈포스 코리아 파트너 슬랙 & 현장 지원 연락망",
      subtitle: "현장 운영팀 직통 채널 & 비상 지원",
      fields: [
        { label: "파트너 슬랙 채널", value: "Salesforce Korea Partner Slack (9/8 초대 메일 발송)" },
        { label: "현장 동행 지원", value: "세일즈포스 얼라이언스팀 전선아 님, 조영보 상무님" },
        { label: "주요 소통 내용", value: "오하나 투어 집결 확인, 랩업 세션 등록, 실시간 공지" },
        { label: "세일즈포스 플러스", value: "Salesforce+ 앱 (미참석/중복 세션 라이브 & 다시보기)" },
        { label: "공식 이벤트 앱", value: "Salesforce Events 모바일 앱 (아젠다 싱크)" },
        { label: "긴급 상황 신고", value: "현장 위험/의심 상황 발견 시 얼라이언스팀 비상 문자" }
      ],
      notes: "작년 카카오톡 대신 올해는 슬랙(Slack)을 통해 공식 현장 공지가 전달됩니다. 월요일 초대 메일을 수락하여 모바일 슬랙 앱 알림을 켜두세요."
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
    { id: "chk-passport-carry", category: "documents", text: "여권은 위탁수하물(캐리어)에 넣지 말고 '기내 가방'에 휴대", checked: true, proTip: "★ 절대 위탁수하물 금지! 공항 카운터 및 보안검색대에서 여권을 바로 제시해야 합니다." },
    { id: "chk-icn-screen", category: "documents", text: "인천공항 도착 즉시 '전광판'에서 UA892 체크인 카운터 확인", checked: false, proTip: "공항 도착 후 곧바로 카운터를 찾아 헤매지 말고 전광판에서 카운터 알파벳(A~N)을 먼저 찾으세요." },
    { id: "chk-tag-sfo", category: "documents", text: "수하물 위탁 후 태그의 최종 목적지 'SFO' 확인", checked: false, proTip: "수하물 분실 및 오배송 방지를 위해 태그에 SFO가 정확히 인쇄되었는지 눈으로 확인하세요." },
    { id: "chk-gate-first", category: "documents", text: "면세구역 진입 후 쇼핑 전에 탑승구(Gate) 위치 먼저 확인/이동", checked: false, proTip: "탑승동 셔틀트레인 이동 시간이 걸릴 수 있으므로 Gate 위치를 먼저 확인한 후 주변에서 구경하세요." },
    { id: "chk-gate-time", category: "documents", text: "16:20(출발 30분 전)까지 탑승구(Gate) 도착 대기", checked: false, proTip: "16:50 출발이므로 30분 전인 16:20까지 Gate 앞에서 대기해야 탑승에 지장이 없습니다." },
    { id: "chk-ohana-qr", category: "documents", text: "오하나 플로어 투어(Group A) 사전등록 메일 확인 & QR코드 발급", checked: false, proTip: "투어 24~48시간 전 Guest Pre-registration 메일에서 NDA 서명 및 QR코드 발급 필수 (스팸함 확인!)" },
    { id: "chk-physical-passport", category: "documents", text: "타워 출입 & 배지 수령용 '실물 여권(Passport)' 상시 휴대", checked: true, proTip: "⚠️ 스마트폰 사진이나 사본은 세일즈포스 타워 및 배지 수령 시 절대 불인정됩니다! 실물 여권 필수 지참" },
    { id: "chk-dreamfest-bag", category: "clothing", text: "드림페스트 콘서트용 소형 가방/힙색 준비 (대형 백팩 반입 절대 금지)", checked: false, proTip: "오라클 파크는 백팩/노트북 가방 반입이 절대 불가합니다. 모스콘 웨스트 락커나 숙소에 미리 보관하세요." },
    { id: "chk-sf-events-app", category: "business", text: "스마트폰 'Salesforce Events' 공식 앱 설치 & 아젠다 싱크", checked: false, proTip: "에이전트포스로 빌드한 관심 세션을 모바일 앱과 캘린더에 연동해 현장 알림을 받으세요." },
    { id: "chk-partner-slack", category: "business", text: "세일즈포스 코리아 파트너 전용 슬랙(Slack) 초대 수락 및 알림 ON", checked: false, proTip: "올해는 카톡 대신 슬랙으로 현장 비상 공지 및 투어 집결이 이뤄집니다." },
    { id: "chk-sf-plus", category: "business", text: "세일즈포스 플러스(Salesforce+) 계정 로그인 확인 (동시 세션 커버)", checked: false, proTip: "놓친 세션이나 겹치는 키노트를 실시간 스트리밍 또는 온디맨드로 시청 가능합니다." },
    { id: "chk-1", category: "documents", text: "여권 3페이지 서명 완료 (신용카드 서명과 동일 필체)", checked: true, proTip: "외교부 지침: 수령 직후 3페이지 서명란에 자필 서명 필수!" },
    { id: "chk-2", category: "documents", text: "여권 유효기간 6개월 이상 잔여 확인 (2027년 이후)", checked: true, proTip: "미국 및 대부분 국가 입국 시 최소 6개월 이상 유효기간 요구" },
    { id: "chk-3", category: "documents", text: "여권 뒷면 비상연락처 연필 기재", checked: true, proTip: "국내 및 현지 연락처를 변경 가능하도록 연필로 기재 권장" },
    { id: "chk-4", category: "documents", text: "전자여권 보호 케이스 (IC칩 구김/훼손 방지)", checked: false, proTip: "전자칩 및 안테나 손상 시 공항 판독기 오류 발생 주의" },
    { id: "chk-5", category: "documents", text: "ESTA 신청 & 체류지 확인 (137 Milton St / +1 213-361-1889)", checked: true, proTip: "미국 비자/ESTA 신청 시 숙소 주소와 호스트 연락처 기재 필수" },
    { id: "chk-6", category: "documents", text: "해외 결제 카드 2종 챙기기 (토스뱅크 + KB국민 트래블러스)", checked: true, proTip: "토스뱅크(수수료0원/자동환전) + KB 트래블러스(수수료면제/해외10%할인/ATM월10회무료). 분실 대비 분산 소지!" },
    { id: "chk-7", category: "documents", text: "항공사 앱(United / 대한항공) 설치 & 모바일 탑승권", checked: false, proTip: "김진수 님: UA 앱(NVV8JR), 정창열 이사님: 대한항공 앱(D3TQAV)" },
    { id: "chk-8", category: "clothing", text: "수하물 규정 확인 (UA: 23kg 1개 / KE: 23kg 2개 무료)", checked: false, proTip: "대한항공 일반석은 2개 무료, 유나이티드는 1개 무료 포함" },
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
      notes: "숙소 예약 및 현지 일정 총괄, 대한항공 KE033/034 탑승, 9/16 오하나 플로어 투어(Group A) 참여."
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
      id: "place-cityview",
      name: "시티 뷰 인터내셔널 라운지 (City View 2번)",
      nameEn: "City View - International Lounge (EMEA, JP+KR+TW, LATAM)",
      category: "near_moscone",
      rating: 4.9,
      ratingText: "4.9 · 한국 파트너 전용 프라이빗 라운지 & 무료 바",
      address: "135 4th St (Metreon 4F), San Francisco, CA 94103",
      locationTag: "Moscone 도보 2분 (캠퍼스 맵 2번)",
      hours: "행사 기간 08:00 - 17:00",
      googleMapsQuery: "City View at Metreon 135 4th St San Francisco",
      lat: 37.7845,
      lng: -122.4030,
      recommendedTime: "세션 사이 휴식, 충전, 비즈니스 미팅",
      themeTags: ["한국전용공간", "무료커피", "음료제공", "소파휴식", "미팅룸예약"],
      description: "드림포스 캠퍼스 맵 2번에 위치한 공식 인터내셔널 라운지입니다. 한국(KR), 일본(JP), 대만(TW) 참가자를 위한 전용 프라이빗 공간이 마련되어 있으며, 바리스타가 직접 내려주는 커피와 고급 음료가 무료로 무제한 제공됩니다. 개별 미팅룸(사전 예약 가능)도 구비되어 있어 바깥 카페를 찾지 않고 쾌적하게 미팅을 진행할 수 있습니다.",
      shoppingTips: [
        "바리스타 오더형 스페셜티 커피 (무료)",
        "프리미엄 탄산수 및 에너지 음료",
        "조용한 개별 미팅룸 예약 활용"
      ],
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-salesforce-tower",
      name: "세일즈포스 타워 (Salesforce Tower)",
      nameEn: "Salesforce Tower (Ohana Floor 61F & West 3F)",
      category: "landmark",
      rating: 4.9,
      ratingText: "4.9 · SF 최고층 빌딩 (오하나 플로어 61층)",
      address: "415 Mission St, San Francisco, CA 94105",
      locationTag: "Mission St (Moscone 도보 7~10분)",
      hours: "9/16(수) 14:00 오하나 투어 / 9/17(목) 15:00 랩업 세션",
      googleMapsQuery: "Salesforce Tower 415 Mission St San Francisco",
      lat: 37.7897,
      lng: -122.3969,
      recommendedTime: "9/16 13:40 타워 플라자 텐트 집결 / 9/17 14:40 랩업 세션",
      themeTags: ["오하나플로어", "61층전망", "타워투어", "한국랩업세션", "랜드마크"],
      description: "샌프란시스코에서 가장 높은 랜드마크 마천루입니다. 9/16(수) 14:00에는 DKBMC 2명이 배정된 61층 Ohana Floor Tour(Group A)가 진행되며, 9/17(목) 15:00에는 West 3층 C04/05에서 Korea Wrap-up Session이 진행됩니다. 타워 입장 시 1층 플라자 텐트에서 실물 여권과 QR코드 체크인이 필수입니다.",
      shoppingTips: [
        "61층 360도 샌프란시스코 파노라마 뷰 사진 촬영",
        "오하나 플로어 무료 핑거푸드 & 다과",
        "1층 플라자 주황색 뱃지/손목밴드 챙기기"
      ],
      priority: "must_visit",
      visited: false
    },
    {
      id: "place-oracle-park",
      name: "오라클 파크 (Oracle Park - Dreamfest)",
      nameEn: "Oracle Park (San Francisco Giants Stadium)",
      category: "landmark",
      rating: 4.8,
      ratingText: "4.8 · Dreamfest 자선 콘서트 야외 경기장",
      address: "24 Willie Mays Plaza, San Francisco, CA 94107",
      locationTag: "South Beach (Moscone 도보 15~20분)",
      hours: "9/16(수) 18:00 입장 시작 (Usher & Gwen Stefani)",
      googleMapsQuery: "Oracle Park 24 Willie Mays Plaza San Francisco",
      lat: 37.7786,
      lng: -122.3893,
      recommendedTime: "9/16(수) 18:00 Dreamfest 콘서트",
      themeTags: ["드림페스트", "어셔", "그웬스테파니", "무료음식주류", "백팩반입금지"],
      description: "샌프란시스코 자이언츠의 홈구장으로, 9/16(수) 저녁 Usher와 Gwen Stefani가 출연하는 드림포스 공식 최대 야외 자선 콘서트 'Dreamfest 2026'이 개최됩니다. 경기장 내 피자, 핫도그, 맥주, 와인이 무제한 무료로 제공됩니다. 모스콘에서 도보 15~20분 소요됩니다.",
      shoppingTips: [
        "⚠️ 대형 백팩 및 노트북 가방 절대 반입 금지 (소형 힙색만 허용)",
        "두꺼운 방한 패딩/바람막이 필수 지참 (바닷바람 극심)",
        "드림포스 배지 필수 착용"
      ],
      priority: "must_visit",
      visited: false
    },
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
        "아침 식사용 베이글 & 크림치즈",
        "스타벅스 RTD 커피 & 우유"
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
      description: "샌프란시스코만의 독특한 식문화가 살아있는 대형 협동조합 슈퍼마켓입니다. 수백 종의 벌크 견과류, 향신료, 치즈, 유기농 티, 로컬 소스, 비건 스낵 등 현지 식생활을 관찰하고 쇼핑하기에 좋습니다.",
      shoppingTips: [
        "캘리포니아 로컬 꿀 & 유기농 잼",
        "벌크 견과류 & 오가닉 허브티",
        "특이한 핫소스 & 바베큐 소스"
      ],
      priority: "recommended",
      visited: false
    }
  ],
  proTips: [
    {
      id: "tip-icn-first-thing",
      stage: "pre_trip",
      urgency: "gold",
      title: "🛫 [첫 출장 필독] 인천공항 도착 직후 1순위: '전광판 확인!' (카운터 바로 가지 마세요)",
      content: "• 샌프란시스코 여행/출장 시 인천공항에 도착해서 가장 먼저 할 일은 항공편 출발 터미널과 체크인 카운터를 '전광판'에서 확인하는 것입니다!\n• 공항에 도착했다고 무작정 카운터를 찾아가지 마세요. 전광판에서 'United Airlines / UA892 / San Francisco (SFO) / 16:50'을 찾아 표시된 체크인 카운터 알파벳(A~N)을 확인하는 것이 첫 번째 미션입니다.\n• 일찍 도착했더라도 당황하지 마세요. 체크인 카운터가 아직 열리지 않았을 수도 있습니다."
    },
    {
      id: "tip-gate-first-rule",
      stage: "flight",
      urgency: "gold",
      title: "🛍️ 면세점 구경 전 황금률: 'Gate(탑승구) 위치 먼저 확인/이동' 후 구경하기",
      content: "• 보안검색과 대한민국 출국심사를 마치고 면세구역으로 들어왔다면, 쇼핑보다 먼저 전광판에서 'UA892 탑승구(Gate 번호)'를 확인하세요.\n• 인천공항은 탑승동까지 셔틀트레인으로 이동해야 하는 경우가 있어 생각보다 이동 시간이 오래 걸립니다.\n• 초보자 추천 동선: [면세점 구경 → 허둥지둥 탑승구 찾기] (X) → [탑승구 위치 확인 및 이동 → 탑승구 근처에서 화장실/음료구입/면세점 여유 즐기기] (O)\n• 16:20(출발 30분 전)까지는 탑승구 앞에 반드시 도착해 있어야 합니다!"
    },
    {
      id: "tip-baggage-tag-sfo",
      stage: "flight",
      urgency: "warning",
      title: "🧳 수하물 위탁 시 결정적 체크: 수하물 태그에 'SFO' 확인!",
      content: "• United 체크인 카운터에서 여권을 보여주며 'San Francisco'라고 말하고 23kg 위탁수하물 1개를 부칩니다 (무료 포함).\n• 짐을 맡긴 뒤 직원에게 수하물 태그(Baggage Tag)를 받을 때, 태그에 최종 목적지 'SFO'가 찍혀 있는지 반드시 눈으로 확인하세요!\n• 가방이 최종 목적지인 샌프란시스코(SFO)까지 연결되는지 확인하는 가장 확실한 방법입니다."
    },
    {
      id: "tip-icn-to-sfo-flow",
      stage: "immigration",
      urgency: "gold",
      title: "✈️ 머릿속에 딱 하나만 기억할 공항 6단계 행동 순서",
      content: "공항에서 '지금 뭘 해야 하지?' 복잡하게 생각하지 마시고 다음 단계만 따라가세요:\n① 전광판 (UA892 카운터 찾기)\n② United 체크인 & 수하물 위탁 (태그 SFO 확인)\n③ 보안검색 (기내 가방/노트북 분리)\n④ 대한민국 출국심사 (미국 입국심사 아님!)\n⑤ Gate 확인 및 탑승구로 이동\n⑥ 탑승구 주변 면세구역에서 여유 (16:20까지 Gate 대기)"
    },
    {
      id: "tip-charge-in-flight",
      stage: "immigration",
      urgency: "gold",
      title: "🔋 [기내 핵심] 비행기 안에서 휴대폰 100% 완충하기!",
      content: "• 좌석(47K) 모니터 하단 USB 포트나 충전기를 연결해 비행 중 배터리를 100% 채워두세요.\n• 11시간 비행 후 SFO에 내리자마자 Google Maps 내비, Uber/Lyft 호출, 팀원 연락, 입국 바우처 확인에 배터리가 대량 소모됩니다.\n• 휴대폰이 꺼지면 공항 밖에서 이동이 매우 난감해지므로 충전은 필수입니다!"
    },
    {
      id: "tip-cbp-short-answers",
      stage: "immigration",
      urgency: "gold",
      title: "🛃 [미국 입국심사] 절대 길게 말하지 마세요! 단문 3문장 원칙",
      content: "• CBP 심사관의 질문에는 절대 미사여구를 붙이지 말고 단문으로만 답하세요:\n  - 목적: 'I'm here for a conference and tourism.'\n  - 체류기간: 'Five days.'\n  - 숙소: '137 Milton St, San Francisco.' (예약 바우처 화면 제시)\n• 쓸데없이 길게 말하면 오히려 꼬투리를 잡힐 수 있습니다. 단문으로 말하면 30초 만에 통과합니다."
    },
    {
      id: "tip-sfo-exit-rule",
      stage: "immigration",
      urgency: "warning",
      title: "🚪 [SFO 출구 주의] 'Connecting Flights' 환승길 절대 금지! 오직 'San Francisco' 출구!",
      content: "• 세관 통과 후 나오는 출구 표지판에서 절대 환승객용 'Connecting Flights'를 따라가지 마세요!\n• 우리는 SFO가 최종 목적지이므로 반드시 'San Francisco'라고 적힌 출구로 나가야 International Arrivals Meeting Area(로비)로 연결됩니다."
    },
    {
      id: "tip-uber-verification",
      stage: "immigration",
      urgency: "gold",
      title: "🚗 [Uber/Lyft 탑승] 아무 차나 타지 마세요! 번호판 확인 & 'Are you here for JS?'",
      content: "• 차가 도착하면 문을 열기 전 다음 3가지를 확인하세요: ① 차량 종류/색상 ② 번호판 일치 여부 ③ 기사 이름.\n• 창문 너머로 'Are you here for JS?'라고 물어보고 기사가 맞다고 하면 탑승하세요.\n• 일반 택시를 탈 경우엔 Taxi 표지판을 따라 승차장으로 가서 줄을 서고, 기사에게 휴대폰으로 '137 Milton St, San Francisco, CA 94112' 영문 주소를 보여주면 됩니다."
    },
    {
      id: "tip-room-check-5",
      stage: "immigration",
      urgency: "gold",
      title: "🏨 [호텔 방 입실 직후] 짐 풀기 전 5대 필수 즉시 점검!",
      content: "• 방에 들어가자마자 침대에 눕거나 짐부터 풀지 마세요! 다음 5가지를 먼저 확인하세요:\n  ① 실물 여권 소지 확인\n  ② 지갑 및 신용카드 확인\n  ③ 휴대폰 110V 어댑터로 즉시 충전 연결\n  ④ 캐리어 잠금 상태 유지\n  ⑤ 호텔 키 카드 안전한 곳(지갑/폰케이스) 보관\n• 말이 빠를 땐 프런트에 'Could you speak a little more slowly, please?'라고 하시면 친절히 도와줍니다."
    },
    {
      id: "tip-ohana",
      stage: "conference",
      urgency: "gold",
      title: "🏢 세일즈포스 타워 61층 오하나 플로어 투어 (Group A) 완벽 가이드",
      content: "• 배정 확인: 우리 DKBMC 출장팀은 9/16(수) 오후 2시~2시 40분 [Group A]에 배정되었습니다 (DKBMC 2명 확정).\n• 집결 시각: 9/16(수) 오후 1시 40분까지 Salesforce Plaza (Salesforce Tower 1층 야외 광장) 도착 필수!\n• 필수 준비물:\n  1) 24시간 전 수신된 'Guest Pre-registration' 이메일로 사전 신청 & NDA 서명 후 발급된 QR코드 (스팸함 확인 필수!)\n  2) 실물 여권 (Passport) - 스마트폰 사진/사본은 절대 입장 불가!\n• 입장 절차: Plaza 텐트(Tent) 체크인 데스크에서 QR코드와 여권 제시 → 주황색 뱃지 또는 손목밴드 수령 → Tent에서 세일즈포스 코리아 직원(전선아 님, 조영보 상무님)과 조인 → 전용 줄을 서서 61층으로 동행 엘리베이터 탑승\n• 투어 내용: 61층 오하나 플로어에서 샌프란시스코 360도 파노라마 뷰 감상, 최고급 핑거푸드/음료, 기념 촬영 (약 40분 소요)"
    },
    {
      id: "tip-dreamfest",
      stage: "conference",
      urgency: "warning",
      title: "🎸 Dreamfest 2026 (Oracle Park) 가방 규정 & 방한 꿀팁",
      content: "• 헤드라이너: Usher(어셔) & Gwen Stefani(그웬 스테파니) 라이브 공연!\n• 일시/장소: 9/16(수) 18:00 입장 시작 @ Oracle Park (San Francisco Giants 홈구장)\n• 이동: 모스콘 센터에서 도보 15~20분 거리 (공식 셔틀 없음, 18:00 전 도보 이동 추천)\n• ⚠️ [가방 반입 절대 금지]: 대형 백팩, 노트북 가방, 비즈니스 서류가방은 입구에서 엄격히 차단됩니다! 소형 클러치백이나 힙색만 허용됩니다. 가방은 숙소나 Moscone West 락커에 미리 보관하세요.\n• 드림포스 배지 필수 지참: 배지 미착용 시 야구장 입장 불가\n• 방한 외투 필수: 바닷가 야외 경기장이므로 저녁 바닷바람이 매우 춥습니다. 두꺼운 패딩이나 방풍 자켓 필수 지참!\n• 경기장 내 푸드/맥주/와인/음료 무료 무제한 제공"
    },
    {
      id: "tip-international-lounge",
      stage: "conference",
      urgency: "gold",
      title: "☕ 2번 City View 인터내셔널 라운지 (한국 파트너 전용 프라이빗 존)",
      content: "• 위치: 모스콘 캠퍼스 2번 구역 (City View 4층, Metreon 인근)\n• 전용 공간: 대한민국(KR), 일본(JP), 대만(TW) 참가자를 위한 전용 휴게 라운지 운영\n• 무료 바리스타 커피: 바리스타가 직접 내려주는 스페셜티 커피 및 프리미엄 탄산수/음료 무료 제공\n• 프라이빗 미팅룸: 방해받지 않고 비즈니스 미팅을 할 수 있는 개별 룸 구비 (현장 세일즈포스 직원 통해 예약 가능)\n• 꿀팁: 외부 비싼 카페를 찾지 말고 2번 City View 라운지에서 다리도 쉬고 스마트폰도 충전하세요!"
    },
    {
      id: "tip-badge-pickup",
      stage: "conference",
      urgency: "gold",
      title: "🎫 9/14(월) 모스콘 웨스트에서 배지 사전 수령 필수 (화요일 1시간 절약)",
      content: "• 배지 등록처: Moscone West 1층 (L1 Registration Desk)\n• 수령 추천일: 9/14(월) 10:00 ~ 17:00 사이 사전 수령 강력 권장\n• 필수 지참: 실물 여권 (Passport) + 사전 등록 확인 바코드\n• 효과: 화요일(9/15) 개막 당일 아침에는 등록 대기 줄이 30~60분 이상 발생합니다. 월요일에 미리 받아두면 화요일 08:15 오프닝 키노트 홀로 즉시 직행할 수 있습니다!"
    },
    {
      id: "tip-sf-plus-agentforce",
      stage: "conference",
      urgency: "info",
      title: "💻 Salesforce+ & 에이전트포스(Agentforce) 아젠다 빌더 활용법",
      content: "• 에이전트포스 아젠다 빌더: 드림포스 공식 사이트에서 Agentforce와 대화하며 관심 분야(AI Agents, Claude Force, Data Cloud)를 입력하면 최적의 맞춤형 세션을 추천하고 원클릭으로 내 캘린더에 예약해 줍니다.\n• Salesforce+ 적극 활용: 꼭 듣고 싶은 세션이 겹치거나 만석일 때 스마트폰으로 실시간 라이브 스트리밍 시청 가능!\n• 귀국 후 한 달 뒤 열리는 'Dreamforce to You'까지 기다리지 마시고 현지에서 Salesforce+를 통해 최신 발표를 바로 확인하세요."
    },
    {
      id: "tip-slack-support",
      stage: "conference",
      urgency: "info",
      title: "💬 세일즈포스 코리아 파트너 전용 슬랙 채널 & 현장 긴급 지원",
      content: "• 올해는 카카오톡 대신 '세일즈포스 코리아 파트너 슬랙(Slack)' 채널을 통해 현장 공지와 투어 집결이 이뤄집니다.\n• 세일즈포스 코리아 얼라이언스팀(전선아 님, 조영보 상무님)이 현장에 동행하며 긴급 지원을 제공합니다.\n• 의심스러운 상황이나 안전 문제 발견 시 즉시 슬랙 채널 또는 현장 비상 연락처로 메시지를 보내세요."
    },
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
      content: "• 여권 서명: 3페이지 서명란에 신용카드와 동일한 필체로 자필 서명 필수\n• 전자칩 보호: 표지에 내장된 IC칩이 구겨지거나 훼손되지 않도록 주의 (케이스 착용)\n• 실물 여권: 세일즈포스 타워 및 배지 수령 시 실물 여권만 인정 (스마트폰 사진 불가)\n• 여권 분실 시: 즉시 현지 경찰서 또는 재외공관(총영사관)에 신고. 분실 신고된 여권은 즉시 무효화되어 다시 찾아도 절대 재사용 불가!\n• 24시간 긴급 연락: 외교부 영사콜센터 (+82-2-3210-0404, 무료)"
    },
    {
      id: "tip-4",
      stage: "dining_tip",
      urgency: "gold",
      title: "💳 해외 결제 듀얼 카드 전략 (토스뱅크 + KB국민 트래블러스)",
      content: "• 토스뱅크 카드 (메인): 해외 결제 수수료 100% 면제, 부족한 금액 자동 환전 결제, 귀국 후 남은 USD 원화 무료 재환전\n• KB국민 트래블러스 카드 (서브/할인): 해외 결제 수수료 면제(1.25%) + 해외 가맹점 10% 환급 할인(월 최대 1만원) + 해외 ATM 월 10회 수수료 면제\n• 꿀팁: 두 카드를 각각 지갑과 숙소 캐리어에 분산 보관하면 분실/도난 시에도 완벽하게 대비할 수 있습니다."
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
