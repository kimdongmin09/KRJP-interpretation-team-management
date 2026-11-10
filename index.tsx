import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  BarChart3, 
  Send, 
  FileCheck, 
  UserCheck, 
  MapPin, 
  Video, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Sparkles, 
  ExternalLink,
  Code,
  Check,
  X,
  AlertTriangle,
  Briefcase,
  HelpCircle,
  TrendingUp,
  Award,
  Repeat,
  User,
  LayoutGrid,
  ShieldAlert,
  Layers
} from 'lucide-react';

// --- TEAM DEFINITIONS WITH ASSIGNED DEPARTMENTS & COLOR SCHEMES ---
const TEAMS_CONFIG = {
  team1: {
    id: 'team1',
    name: '고정 정례1',
    count: 9,
    description: '글로벌비즈니스 / IP사업부 / 글로벌콘텐츠 기획 총괄',
    departments: ['글로벌콘텐츠실', 'IP비즈니스팀', '웹툰/웹소설사업부', '글로벌서비스기획팀'],
    theme: {
      name: '퍼플 (Purple)',
      cardBg: 'bg-[#F3EDF9]',
      cardBorder: 'border-[#D8C7EB]',
      cardHover: 'hover:border-purple-400',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-900',
      tagBg: 'bg-purple-200/70',
      textAccent: 'text-purple-950',
      indicator: 'bg-purple-500',
      subtleBorder: 'border-purple-200/70',
      chip: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  },
  team2: {
    id: 'team2',
    name: '고정 정례2',
    count: 4,
    description: '플랫폼엔지니어링 / 클라우드 인프라 / 데이터 & AI 기술 본부',
    departments: ['플랫폼개발본부', '데이터엔지니어링실', '핀테크&ML사업본부'],
    theme: {
      name: '스카이블루 (Sky)',
      cardBg: 'bg-[#EBF5FB]',
      cardBorder: 'border-[#BDDDF4]',
      cardHover: 'hover:border-sky-400',
      badgeBg: 'bg-sky-100',
      badgeText: 'text-sky-900',
      tagBg: 'bg-sky-200/70',
      textAccent: 'text-sky-950',
      indicator: 'bg-sky-500',
      subtleBorder: 'border-sky-200/70',
      chip: 'bg-sky-50 text-sky-700 border-sky-200'
    }
  },
  team3: {
    id: 'team3',
    name: '긴급',
    count: 7,
    description: '전사 긴급 이슈 / 경영진 직속 의전 / 돌발 IR·PR / 인사채용 긴급 면접',
    departments: ['경영지원본부', '인사채용팀', '일본법인사업추진실', '신소재개발센터', '콘텐츠TF'],
    theme: {
      name: '코랄/앰버 (Amber)',
      cardBg: 'bg-[#FEF5EA]',
      cardBorder: 'border-[#FAD8B1]',
      cardHover: 'hover:border-amber-400',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
      tagBg: 'bg-amber-200/70',
      textAccent: 'text-amber-950',
      indicator: 'bg-amber-500',
      subtleBorder: 'border-amber-200/70',
      chip: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  }
};

// --- INITIAL MOCK DATA (Divided into 9, 4, 7 interpreters across 3 teams) ---
const INITIAL_INTERPRETERS = [
  // 1. 고정 정례1 (9명: int-13, 14, 15, 16, 17, 18, 19, 20, 8)
  { id: 'int-13', teamId: 'team1', code: 'JY', name: '강서준', nameJa: 'カン・ソジュン', native: 'KO', level: 'Junior', status: 'Available', email: 'seojun.k@corp.com', avatar: '👨‍💻', totalHours: 24 },
  { id: 'int-14', teamId: 'team1', code: 'IM', name: '이토 아오이', nameJa: '伊藤 葵', native: 'JA', level: 'Senior', status: 'Available', email: 'aoi.ito@corp.com', avatar: '👩‍🔬', totalHours: 46 },
  { id: 'int-15', teamId: 'team1', code: 'SY', name: '임예진', nameJa: 'イム・イェジン', native: 'KO', level: 'Mid', status: 'Available', email: 'yejin.lim@corp.com', avatar: '👩‍🎨', totalHours: 36 },
  { id: 'int-16', teamId: 'team1', code: 'OH', name: '오카다 리코', nameJa: '岡田 理子', native: 'JA', level: 'Lead', status: 'Available', email: 'riko.okada@corp.com', avatar: '👩‍🏫', totalHours: 50 },
  { id: 'int-17', teamId: 'team1', code: 'YE', name: '한소희', nameJa: 'ハン・ソヒ', native: 'KO', level: 'Senior', status: 'Available', email: 'sohee.han@corp.com', avatar: '👩‍⚖️', totalHours: 41 },
  { id: 'int-18', teamId: 'team1', code: 'GH', name: '나카무라 타쿠', nameJa: '中村 拓', native: 'JA', level: 'Mid', status: 'Available', email: 'taku.n@corp.com', avatar: '👨‍💼', totalHours: 32 },
  { id: 'int-19', teamId: 'team1', code: 'SU', name: '송지훈', nameJa: 'ソン・ジフン', native: 'KO', level: 'Mid', status: 'Available', email: 'jihoon.s@corp.com', avatar: '👨‍🔬', totalHours: 34 },
  { id: 'int-20', teamId: 'team1', code: 'DM', name: '다카하시 마유', nameJa: '高橋 真由', native: 'JA', level: 'Mid', status: 'Available', email: 'mayu.t@corp.com', avatar: '👩‍💼', totalHours: 30 },
  { id: 'int-8', teamId: 'team1', code: 'DS', name: '스즈키 다이스케', nameJa: '鈴木 大介', native: 'JA', level: 'Senior', status: 'Available', email: 'daisuke.s@corp.com', avatar: '👨‍💼', totalHours: 44 },

  // 2. 고정 정례2 (4명: int-1, 2, 3, 4)
  { id: 'int-1', teamId: 'team2', code: 'HN', name: '김하늘', nameJa: 'キム・ハヌル', native: 'KO', level: 'Senior', status: 'Available', email: 'sky.kim@corp.com', avatar: '👩‍💼', totalHours: 42 },
  { id: 'int-2', teamId: 'team2', code: 'KT', name: '사토 켄타', nameJa: '佐藤 健太', native: 'JA', level: 'Senior', status: 'Busy', email: 'kenta.sato@corp.com', avatar: '👨‍💼', totalHours: 48 },
  { id: 'int-3', teamId: 'team2', code: 'SJ', name: '이수진', nameJa: 'イ・スジン', native: 'KO', level: 'Senior', status: 'Available', email: 'sujin.lee@corp.com', avatar: '👩‍💻', totalHours: 39 },
  { id: 'int-4', teamId: 'team2', code: 'YK', name: '타나카 유키', nameJa: '田中 由紀', native: 'JA', level: 'Lead', status: 'Available', email: 'yuki.tanaka@corp.com', avatar: '👩‍🔬', totalHours: 52 },

  // 3. 긴급 (7명: int-5, 6, 7, 9, 10, 11, 12)
  { id: 'int-5', teamId: 'team3', code: 'MW', name: '박민우', nameJa: 'パク・ミヌ', native: 'KO', level: 'Mid', status: 'Available', email: 'minwoo.park@corp.com', avatar: '👨‍🎓', totalHours: 35 },
  { id: 'int-6', teamId: 'team3', code: 'RN', name: '야마모토 렌', nameJa: '山本 蓮', native: 'JA', level: 'Mid', status: 'On Leave', email: 'ren.yamamoto@corp.com', avatar: '👨‍🎨', totalHours: 20 },
  { id: 'int-7', teamId: 'team3', code: 'YR', name: '정유라', nameJa: 'チョン・ユラ', native: 'KO', level: 'Junior', status: 'Available', email: 'yura.jung@corp.com', avatar: '👩‍🏫', totalHours: 28 },
  { id: 'int-9', teamId: 'team3', code: 'JW', name: '최지우', nameJa: 'チェ・ジウ', native: 'KO', level: 'Mid', status: 'Busy', email: 'jiwoo.choi@corp.com', avatar: '👩‍⚕️', totalHours: 33 },
  { id: 'int-10', teamId: 'team3', code: 'MI', name: '코바야시 마이', nameJa: '小林 舞', native: 'JA', level: 'Junior', status: 'Available', email: 'mai.k@corp.com', avatar: '👩‍💼', totalHours: 25 },
  { id: 'int-11', teamId: 'team3', code: 'DH', name: '윤도현', nameJa: 'ユン・ドヒョン', native: 'KO', level: 'Lead', status: 'Available', email: 'dohyun.y@corp.com', avatar: '👨‍💼', totalHours: 49 },
  { id: 'int-12', teamId: 'team3', code: 'NW', name: '와타나베 나오', nameJa: '渡辺 奈緒', native: 'JA', level: 'Mid', status: 'Available', email: 'nao.w@corp.com', avatar: '👩‍💻', totalHours: 31 }
];

// Rich mock data with assigned team identifier
const INITIAL_MEETINGS = [
  // 13:00 Slot
  {
    id: 'meet-1301',
    teamId: 'team1',
    titleKo: 'ys/ 【JY+IM】 [온오프] Short Animation Bi-weekly',
    titleJa: 'ys/ 【JY+IM】 [オンオフ] Short Animation Bi-weekly',
    dept: '글로벌콘텐츠실',
    date: '2026-11-10',
    startTime: '13:00',
    endTime: '14:00',
    mode: 'Simultaneous',
    locationType: 'Hybrid',
    tagPrefix: '[온오프]',
    isRecurring: true,
    locationDetails: '본사 12F 회의실 & Google Meet',
    assignedInterpreters: ['int-13', 'int-14'], // JY, IM (Team 1)
    status: 'In-progress',
    urgent: false,
    workflowRef: 'WF-2026-8801'
  },
  {
    id: 'meet-1302',
    teamId: 'team2',
    titleKo: '【HN+KT】 WEB홈개선 Phase2의 정례MTG',
    titleJa: '【HN+KT】 WEBホーム改善 Phase2の定例MTG',
    dept: '플랫폼개발본부',
    date: '2026-11-10',
    startTime: '13:00',
    endTime: '14:00',
    mode: 'Consecutive',
    locationType: 'Online',
    tagPrefix: 'WEB홈개선',
    isRecurring: true,
    locationDetails: 'Zoom Room #2',
    assignedInterpreters: ['int-1', 'int-2'], // HN, KT (Team 2)
    status: 'In-progress',
    urgent: false,
    workflowRef: 'WF-2026-8802'
  },

  // 14:00 Slot (Parallel across teams)
  {
    id: 'meet-1401',
    teamId: 'team1',
    titleKo: '【OH】 Monthly-MTG) NW-LDF_IPbiz...',
    titleJa: '【OH】 Monthly-MTG) NW-LDF_IPbiz...',
    dept: 'IP비즈니스팀',
    date: '2026-11-10',
    startTime: '14:00',
    endTime: '15:00',
    mode: 'Consecutive',
    locationType: 'Online',
    isRecurring: true,
    locationDetails: 'Zoom ID: 881-2231-1099',
    assignedInterpreters: ['int-16'], // OH (Team 1)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8810'
  },
  {
    id: 'meet-1402',
    teamId: 'team1',
    titleKo: '【YE+SY】 정근-san, mino-san MTG',
    titleJa: '【YE+SY】 チョングン-san, mino-san MTG',
    dept: '글로벌콘텐츠실',
    date: '2026-11-10',
    startTime: '14:00',
    endTime: '15:00',
    mode: 'Simultaneous',
    locationType: 'Online',
    isRecurring: true,
    locationDetails: 'Google Meet',
    assignedInterpreters: ['int-17', 'int-15'], // YE, SY (Team 1)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8811'
  },
  {
    id: 'meet-1403',
    teamId: 'team1',
    titleKo: '★ハイブリッド 【GH+SU】 LDF공유MTG',
    titleJa: '★ハイブリッド 【GH+SU】 LDF共有MTG',
    dept: '웹툰/웹소설사업부',
    date: '2026-11-10',
    startTime: '14:00',
    endTime: '15:00',
    mode: 'Simultaneous',
    locationType: 'Hybrid',
    tagPrefix: '★ハイブリッド',
    isRecurring: true,
    locationDetails: '8층 B회의실 & Zoom',
    assignedInterpreters: ['int-18', 'int-19'], // GH, SU (Team 1)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8812'
  },
  {
    id: 'meet-1404',
    teamId: 'team2',
    titleKo: '【SJ+YK】 [ML Core] AI 인프라 최적화 정례회 / Year-End Spec',
    titleJa: '【SJ+YK】 [ML Core] AIインフラ最適化定例 / Year-End Spec',
    dept: '핀테크&ML사업본부',
    date: '2026-11-10',
    startTime: '14:00',
    endTime: '15:00',
    mode: 'Consecutive',
    locationType: 'Online',
    isRecurring: true,
    locationDetails: 'Microsoft Teams Room 11',
    assignedInterpreters: ['int-3', 'int-4'], // SJ, YK (Team 2)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8813'
  },

  // 15:00 Slot
  {
    id: 'meet-1501',
    teamId: 'team1',
    titleKo: '【DM+DS】 【LM】 Echo Weekly',
    titleJa: '【DM+DS】 【LM】 Echo Weekly',
    dept: '글로벌서비스기획팀',
    date: '2026-11-10',
    startTime: '15:00',
    endTime: '16:00',
    mode: 'Simultaneous',
    locationType: 'Online',
    isRecurring: true,
    locationDetails: 'Zoom ID: 772-9182',
    assignedInterpreters: ['int-20', 'int-8'], // DM, DS (Team 1)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8820'
  },
  {
    id: 'meet-1502',
    teamId: 'team2',
    titleKo: '【HN+SJ】 [Tech] EBJ-NW 데이터 파이프라인 동기화 리뷰',
    titleJa: '【HN+SJ】 [Tech] EBJ-NW データパイプライン同期レビュー',
    dept: '데이터엔지니어링실',
    date: '2026-11-10',
    startTime: '15:00',
    endTime: '16:00',
    mode: 'Simultaneous',
    locationType: 'Online',
    isRecurring: false,
    locationDetails: 'Google Meet rvw-tech',
    assignedInterpreters: ['int-1', 'int-3'], // HN, SJ (Team 2)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8821'
  },
  {
    id: 'meet-1503',
    teamId: 'team3',
    titleKo: '당일긴급 【DH+JW】 긴급 시스템 장애 원인분석 긴급소집',
    titleJa: '当日緊急 【DH+JW】 緊急システム障害 原因分析 緊急招集',
    dept: '경영지원본부',
    date: '2026-11-10',
    startTime: '15:00',
    endTime: '16:00',
    mode: 'Simultaneous',
    locationType: 'Online',
    tagPrefix: '🚨긴급',
    isRecurring: false,
    locationDetails: 'Emergency Zoom Room A',
    assignedInterpreters: ['int-11', 'int-9'], // DH, JW (Team 3)
    status: 'Assigned',
    urgent: true,
    workflowRef: 'WF-2026-8822'
  },

  // 16:00 Slot
  {
    id: 'meet-1601',
    teamId: 'team3',
    titleKo: '★対面 【MW+NW】 도쿄 경영진 돌발 대면접견 및 전략회의',
    titleJa: '★対面 【MW+NW】 東京経営陣 突発対面会談及び戦略会議',
    dept: '경영지원본부',
    date: '2026-11-10',
    startTime: '16:00',
    endTime: '17:00',
    mode: 'Consecutive',
    locationType: 'Offline',
    tagPrefix: '★対面',
    isRecurring: false,
    locationDetails: '본관 16층 접견실 3',
    assignedInterpreters: ['int-5', 'int-12'], // MW, NW (Team 3)
    status: 'Assigned',
    urgent: true,
    workflowRef: 'WF-2026-8830'
  },
  {
    id: 'meet-1602',
    teamId: 'team1',
    titleKo: 'ys/ 【JY+IM】 라망 웹소설 글로벌 판권 검토',
    titleJa: 'ys/ 【JY+IM】 ラマン Web小説 グローバル版権検討',
    dept: '웹툰/웹소설사업부',
    date: '2026-11-10',
    startTime: '16:00',
    endTime: '17:00',
    mode: 'Simultaneous',
    locationType: 'Online',
    isRecurring: false,
    locationDetails: 'Google Meet novel-share',
    assignedInterpreters: ['int-13', 'int-14'], // JY, IM (Team 1)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8831'
  },

  // 17:00 Slot
  {
    id: 'meet-1701',
    teamId: 'team3',
    titleKo: '【YR+MI】 【긴급면접】 일본지사장 후보자 2차 임원면접',
    titleJa: '【YR+MI】 【緊急面接】 日本支社長候補者 2次役員面接',
    dept: '인사채용팀',
    date: '2026-11-10',
    startTime: '17:00',
    endTime: '18:00',
    mode: 'Simultaneous',
    locationType: 'Online',
    tagPrefix: '【긴급면접】',
    isRecurring: false,
    locationDetails: 'Zoom Recruit Room A',
    assignedInterpreters: ['int-7', 'int-10'], // YR, MI (Team 3)
    status: 'Assigned',
    urgent: true,
    workflowRef: 'WF-2026-8840'
  },
  {
    id: 'meet-1702',
    teamId: 'team1',
    titleKo: '【SU+IM】 【Weekly】 EBJ 연간 실적 보고회의',
    titleJa: '【SU+IM】 【Weekly】 EBJ 年間実績 報告会議',
    dept: '글로벌콘텐츠실',
    date: '2026-11-10',
    startTime: '17:00',
    endTime: '18:00',
    mode: 'Simultaneous',
    locationType: 'Hybrid',
    tagPrefix: '【Weekly】',
    isRecurring: true,
    locationDetails: '14층 이사회실 & Zoom',
    assignedInterpreters: ['int-19', 'int-14'], // SU, IM (Team 1)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8841'
  },
  {
    id: 'meet-1703',
    teamId: 'team1',
    titleKo: '【OH+DM】 IP 라이선스 계약 세부협의',
    titleJa: '【OH+DM】 IPライセンス契約 詳細協議',
    dept: 'IP비즈니스팀',
    date: '2026-11-10',
    startTime: '17:00',
    endTime: '18:00',
    mode: 'Consecutive',
    locationType: 'Online',
    isRecurring: true,
    locationDetails: 'Zoom ID: 902-1823',
    assignedInterpreters: ['int-16', 'int-20'], // OH, DM (Team 1)
    status: 'Assigned',
    urgent: false,
    workflowRef: 'WF-2026-8842'
  }
];

// Workflow pending requests from Corporate Groupware
const INITIAL_WORKFLOW_REQUESTS = [
  {
    wfId: 'WF-REQ-2026-9042',
    reqDept: '신소재개발센터 (新素材開発センター)',
    suggestedTeamId: 'team3',
    requester: '최성훈 수석 (崔 専任)',
    titleKo: '차세대 전고체 배터리 소재 평가 돌발 공동 워크숍',
    titleJa: '次世代全固体電池材料評価 突発共同ワークショップ',
    date: '2026-11-10',
    startTime: '14:00',
    endTime: '16:30',
    mode: 'Simultaneous',
    needInterpretersCount: 2,
    locationType: 'Hybrid',
    locationDetails: '연구동 302호 & Zoom Link',
    approvedAt: '2026-11-10 09:15',
    notes: '전문 배터리 화학 용어 사전 공유 예정 / 사전 자료 30페이지 준비됨'
  },
  {
    wfId: 'WF-REQ-2026-9045',
    reqDept: '글로벌콘텐츠실 마케팅기획팀',
    suggestedTeamId: 'team1',
    requester: '미야자키 팀장',
    titleKo: '2027 오사카 엑스포 기업관 전시 기획 보고회',
    titleJa: '2027年大阪万博 企業パビリオン展示企画報告会',
    date: '2026-11-11',
    startTime: '15:30',
    endTime: '17:00',
    mode: 'Consecutive',
    needInterpretersCount: 1,
    locationType: 'Online',
    locationDetails: 'Zoom Room #7',
    approvedAt: '2026-11-10 11:20',
    notes: '슬라이드 일어/한국어 병기 완료'
  }
];

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'interpreters' | 'stats' | 'workflow'
  const [calendarView, setCalendarView] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [currentDate, setCurrentDate] = useState('2026-11-10'); // Default base date

  // Core Data States
  const [interpreters, setInterpreters] = useState(INITIAL_INTERPRETERS);
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [workflowRequests, setWorkflowRequests] = useState(INITIAL_WORKFLOW_REQUESTS);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('ALL'); // ALL, Simultaneous, Consecutive, Whispering
  const [filterTeam, setFilterTeam] = useState('ALL'); // 'ALL' | 'team1' | 'team2' | 'team3'
  const [filterInterpreter, setFilterInterpreter] = useState('ALL'); // 'ALL' or interpreterId (e.g., 'int-13')

  // Modals
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);
  const [isInterpreterModalOpen, setIsInterpreterModalOpen] = useState(false);
  const [isApiSpecModalOpen, setIsApiSpecModalOpen] = useState(false);

  // Active items in modal
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [editingInterpreter, setEditingInterpreter] = useState(null);

  // Success / Alert Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ----------------- CALENDAR HELPERS -----------------
  const handleDateShift = (deltaDays) => {
    const cur = new Date(currentDate);
    cur.setDate(cur.getDate() + deltaDays);
    const yyyy = cur.getFullYear();
    const mm = String(cur.getMonth() + 1).padStart(2, '0');
    const dd = String(cur.getDate()).padStart(2, '0');
    setCurrentDate(`${yyyy}-${mm}-${dd}`);
  };

  const getDayLabel = (dateStr) => {
    const d = new Date(dateStr);
    const dayNamesKo = ['일', '월', '화', '수', '목', '금', '토'];
    const dayNamesJa = ['日', '月', '火', '水', '木', '金', '土'];
    const dayIdx = d.getDay();
    return `${dateStr} (${dayNamesKo[dayIdx]} / ${dayNamesJa[dayIdx]})`;
  };

  // Helper to format assigned interpreters badge like 【JY+IM】
  const getInterpreterTag = (assignedIds) => {
    if (!assignedIds || assignedIds.length === 0) return '【미배정】';
    const codes = assignedIds
      .map(id => {
        const found = interpreters.find(i => i.id === id);
        return found ? found.code : id;
      })
      .join('+');
    return `【${codes}】`;
  };

  // Helper to get team configuration for a meeting
  const getMeetingTeamConfig = (meeting) => {
    if (meeting.teamId && TEAMS_CONFIG[meeting.teamId]) {
      return TEAMS_CONFIG[meeting.teamId];
    }
    // Fallback: infer team from first assigned interpreter
    if (meeting.assignedInterpreters && meeting.assignedInterpreters.length > 0) {
      const firstInter = interpreters.find(i => i.id === meeting.assignedInterpreters[0]);
      if (firstInter && TEAMS_CONFIG[firstInter.teamId]) {
        return TEAMS_CONFIG[firstInter.teamId];
      }
    }
    return TEAMS_CONFIG.team1;
  };

  // Filtered meetings
  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      const matchSearch = 
        m.titleKo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.titleJa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.dept.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchMode = filterMode === 'ALL' || m.mode === filterMode;
      const matchTeam = filterTeam === 'ALL' || m.teamId === filterTeam;
      const matchInterpreter = 
        filterInterpreter === 'ALL' || 
        m.assignedInterpreters.includes(filterInterpreter);

      return matchSearch && matchMode && matchTeam && matchInterpreter;
    });
  }, [meetings, searchQuery, filterMode, filterTeam, filterInterpreter]);

  // Group daily meetings by time slot for side-by-side parallel column display
  const groupedDailySlots = useMemo(() => {
    const dayMeetings = filteredMeetings.filter(m => m.date === currentDate)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const slotMap = {};
    timeSlots.forEach(slot => {
      slotMap[slot] = [];
    });

    dayMeetings.forEach(meeting => {
      const hour = meeting.startTime.split(':')[0] + ':00';
      if (slotMap[hour]) {
        slotMap[hour].push(meeting);
      } else {
        slotMap[meeting.startTime] = [meeting];
      }
    });

    return slotMap;
  }, [filteredMeetings, currentDate]);

  // Time overlap checker for conflict detection
  const checkConflict = (interpreterId, date, startTime, endTime, currentMeetingId = null) => {
    const targetInter = interpreters.find(i => i.id === interpreterId);
    if (!targetInter) return null;
    if (targetInter.status === 'On Leave') {
      return `${targetInter.name}님은 현재 휴가(休暇) 중입니다.`;
    }

    const conflicts = meetings.filter(m => {
      if (m.id === currentMeetingId) return false;
      if (m.date !== date) return false;
      if (!m.assignedInterpreters.includes(interpreterId)) return false;

      return (startTime < m.endTime && endTime > m.startTime);
    });

    if (conflicts.length > 0) {
      return `${targetInter.name} 통역사는 동시간대 회의 [${conflicts[0].titleKo.substring(0, 15)}...]에 이미 배정되어 있습니다!`;
    }
    return null;
  };

  // Quick Action: Approve & auto-schedule workflow request
  const handleApproveWorkflow = (wf) => {
    const newMeeting = {
      id: `meet-wf-${Date.now()}`,
      teamId: wf.suggestedTeamId || 'team1',
      titleKo: wf.titleKo,
      titleJa: wf.titleJa,
      dept: wf.reqDept,
      date: wf.date,
      startTime: wf.startTime,
      endTime: wf.endTime,
      mode: wf.mode,
      locationType: wf.locationType,
      locationDetails: wf.locationDetails,
      assignedInterpreters: [],
      status: 'Pending',
      urgent: wf.suggestedTeamId === 'team3',
      isRecurring: false,
      workflowRef: wf.wfId
    };

    setMeetings(prev => [newMeeting, ...prev]);
    setWorkflowRequests(prev => prev.filter(r => r.wfId !== wf.wfId));
    showToast(`워크플로우 [${wf.wfId}] 승인 완료! ${TEAMS_CONFIG[newMeeting.teamId].name} 캘린더에 자동 등록되었습니다.`);
    setActiveTab('calendar');
    setCurrentDate(wf.date);
  };

  const selectedInterpreterObj = interpreters.find(i => i.id === filterInterpreter);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <span className="font-bold text-lg tracking-tighter">韓日</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg text-slate-900 tracking-tight">InterpreBridge</h1>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded font-mono font-medium">KO-JA Enterprise</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">3개 팀별 맞춤 전담 (고정 정례1·2 & 긴급 대응 20인)</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'calendar' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                캘린더 스케줄
              </button>
              <button
                onClick={() => setActiveTab('workflow')}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'workflow' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                워크플로우 연동
                {workflowRequests.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                    {workflowRequests.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('interpreters')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'interpreters' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                팀 구성 및 Roster (3개 팀 / 20명)
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'stats' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                업무 통계 & 분석
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsNewMeetingModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                새 회의 등록
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FILTER & TEAM / PERSONAL INTERPRETER SELECTOR BAR */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Calendar Navigation & Mode */}
          {activeTab === 'calendar' ? (
            <div className="flex flex-wrap items-center gap-2">
              {/* Date arrows */}
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button
                  onClick={() => handleDateShift(-1)}
                  className="p-1 hover:bg-white rounded text-slate-600 transition"
                  title="이전 날짜"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 px-2 py-0.5 outline-none cursor-pointer"
                />
                <button
                  onClick={() => handleDateShift(1)}
                  className="p-1 hover:bg-white rounded text-slate-600 transition"
                  title="다음 날짜"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setCurrentDate('2026-11-10')}
                className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200"
              >
                오늘
              </button>

              <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                {getDayLabel(currentDate)}
              </span>

              {/* View Switches */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs ml-2">
                <button
                  onClick={() => setCalendarView('daily')}
                  className={`px-3 py-1 font-medium rounded-md transition ${
                    calendarView === 'daily' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  일간 타임라인
                </button>
                <button
                  onClick={() => setCalendarView('weekly')}
                  className={`px-3 py-1 font-medium rounded-md transition ${
                    calendarView === 'weekly' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  주간 매트릭스
                </button>
                <button
                  onClick={() => setCalendarView('monthly')}
                  className={`px-3 py-1 font-medium rounded-md transition ${
                    calendarView === 'monthly' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  월간 달력
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              {activeTab === 'workflow' && '사내 전자결재 연동 및 자동 캘린더 등록 대기열'}
              {activeTab === 'interpreters' && '한일 통역팀 3개 분과 구성 (고정 정례1: 9명, 고정 정례2: 4명, 긴급: 7명)'}
              {activeTab === 'stats' && '팀별 및 개인별 통역 실적 & 균등 배분 통계'}
            </div>
          )}

          {/* RIGHT SIDE: TEAM FILTER & PERSONAL FILTER & SEARCH */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* 🌟 TEAM FILTER */}
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg p-1">
              <Layers className="w-3.5 h-3.5 text-slate-600 ml-1.5" />
              <span className="text-xs font-bold text-slate-700 hidden sm:inline">팀 필터:</span>
              <select
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                className="text-xs bg-white border border-slate-200 text-slate-800 font-semibold rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-400 cursor-pointer"
              >
                <option value="ALL">전체 3개 팀 보기</option>
                <option value="team1">🟣 고정 정례1 (9명 / IP·콘텐츠)</option>
                <option value="team2">🔵 고정 정례2 (4명 / 개발·AI)</option>
                <option value="team3">🟠 긴급 (7명 / 경영·긴급)</option>
              </select>
            </div>

            {/* 🌟 PERSONAL FILTER: SELECT INTERPRETER / MY MEETINGS */}
            <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-lg p-1">
              <User className="w-3.5 h-3.5 text-purple-600 ml-1.5" />
              <span className="text-xs font-bold text-purple-900 hidden sm:inline">통역사 필터:</span>
              <select
                value={filterInterpreter}
                onChange={(e) => setFilterInterpreter(e.target.value)}
                className="text-xs bg-white border border-purple-200 text-purple-900 font-semibold rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer max-w-[170px]"
              >
                <option value="ALL">전체 통역사</option>
                <optgroup label="고정 정례1 (9명)">
                  {interpreters.filter(i => i.teamId === 'team1').map(int => (
                    <option key={int.id} value={int.id}>
                      [{int.code}] {int.name} ({int.native})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="고정 정례2 (4명)">
                  {interpreters.filter(i => i.teamId === 'team2').map(int => (
                    <option key={int.id} value={int.id}>
                      [{int.code}] {int.name} ({int.native})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="긴급 (7명)">
                  {interpreters.filter(i => i.teamId === 'team3').map(int => (
                    <option key={int.id} value={int.id}>
                      [{int.code}] {int.name} ({int.native})
                    </option>
                  ))}
                </optgroup>
              </select>

              {/* Quick Reset to All */}
              {(filterInterpreter !== 'ALL' || filterTeam !== 'ALL') && (
                <button
                  onClick={() => {
                    setFilterInterpreter('ALL');
                    setFilterTeam('ALL');
                  }}
                  className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium transition"
                  title="전체 보기로 복귀"
                >
                  필터 초기화
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="회의명, 부서, 키워드 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-40 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 TEAM COLOR LEGEND BAR (Always visible above calendar) */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span> 팀별 색상 구분:
            </span>

            {/* Team 1 Legend */}
            <div className="flex items-center gap-1.5 bg-[#F3EDF9] border border-[#D8C7EB] px-2.5 py-1 rounded-md">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <span className="font-bold text-purple-950">고정 정례1 (9명)</span>
              <span className="text-[10px] text-purple-700 hidden md:inline">: 글로벌비즈니스 / IP사업부 / 콘텐츠</span>
            </div>

            {/* Team 2 Legend */}
            <div className="flex items-center gap-1.5 bg-[#EBF5FB] border border-[#BDDDF4] px-2.5 py-1 rounded-md">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="font-bold text-sky-950">고정 정례2 (4명)</span>
              <span className="text-[10px] text-sky-700 hidden md:inline">: 플랫폼개발 / 데이터 / AI</span>
            </div>

            {/* Team 3 Legend */}
            <div className="flex items-center gap-1.5 bg-[#FEF5EA] border border-[#FAD8B1] px-2.5 py-1 rounded-md">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="font-bold text-amber-950">긴급 (7명)</span>
              <span className="text-[10px] text-amber-700 hidden md:inline">: 전사 긴급이슈 / 경영진 / IR / 긴급면접</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            총원 <strong>20명</strong> 분과별 전담 체계 가동 중
          </div>
        </div>
      </div>

      {/* ACTIVE FILTER NOTICE BANNER (WHEN FILTERED) */}
      {filterInterpreter !== 'ALL' && selectedInterpreterObj && (
        <div className="bg-purple-700 text-white text-xs px-4 py-2 flex items-center justify-between shadow-xs">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{selectedInterpreterObj.avatar}</span>
              <span>
                현재 <strong>[{selectedInterpreterObj.code}] {selectedInterpreterObj.name} ({selectedInterpreterObj.nameJa})</strong> 통역사 ({TEAMS_CONFIG[selectedInterpreterObj.teamId].name})의 배정 회의만 필터링 중입니다.
              </span>
            </div>
            <button
              onClick={() => setFilterInterpreter('ALL')}
              className="text-xs bg-white text-purple-800 font-bold px-3 py-0.5 rounded-md hover:bg-purple-50 transition"
            >
              전체 회의 보기로 전환 ✕
            </button>
          </div>
        </div>
      )}

      {/* MAIN VIEW */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* 1. CALENDAR VIEW */}
        {activeTab === 'calendar' && (
          <div>
            {/* DAILY VIEW: EXACT SIDE-BY-SIDE PARALLEL GRID WITH TEAM COLOR PALETTES */}
            {calendarView === 'daily' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Header Status Line */}
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <LayoutGrid className="w-4 h-4 text-indigo-600" />
                      당일 시간대별 병렬 타임테이블 (팀별 색상 분할 표시)
                    </span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-500">
                      총 <strong className="text-indigo-700">{filteredMeetings.filter(m => m.date === currentDate).length}</strong>건
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Repeat className="w-3 h-3 text-slate-600" /> 정례 회의
                    </span>
                    <span className="text-slate-400">※ 카드를 클릭하면 통역사 배정 및 팀 변경 모달이 열립니다.</span>
                  </div>
                </div>

                {/* Timeline Grid */}
                <div className="divide-y divide-slate-200">
                  {['13:00', '14:00', '15:00', '16:00', '17:00'].map((timeLabel) => {
                    const slotMeetings = groupedDailySlots[timeLabel] || [];
                    const isNowTime = timeLabel === '14:00'; // Indicating current active red timeline needle

                    return (
                      <div key={timeLabel} className="relative flex group">
                        
                        {/* Red Timeline Needle Indicator */}
                        {isNowTime && (
                          <div className="absolute left-0 right-0 top-0 z-20 flex items-center pointer-events-none">
                            <div className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-rose-500 -ml-1"></div>
                            <div className="w-full border-t-2 border-rose-500 shadow-xs"></div>
                          </div>
                        )}

                        {/* Left: Time Label */}
                        <div className="w-20 shrink-0 py-3.5 pr-3 text-right font-mono text-xs font-bold text-slate-500 select-none bg-slate-50/40 border-r border-slate-100 flex items-start justify-end">
                          <span>{timeLabel}</span>
                        </div>

                        {/* Right: Parallel Horizontal Columns for Concurrent Meetings with Team Themes */}
                        <div className="flex-1 p-2 bg-slate-50/20 min-h-[68px] flex items-stretch">
                          {slotMeetings.length === 0 ? (
                            <div className="flex items-center text-xs text-slate-300 italic pl-3">
                              등록된 회의 없음
                            </div>
                          ) : (
                            <div className="grid w-full gap-2" style={{
                              gridTemplateColumns: `repeat(${slotMeetings.length}, minmax(0, 1fr))`
                            }}>
                              {slotMeetings.map((m) => {
                                const interCodeBadge = getInterpreterTag(m.assignedInterpreters);
                                const isUnassigned = m.assignedInterpreters.length === 0;
                                const teamConfig = getMeetingTeamConfig(m);
                                const { theme } = teamConfig;

                                return (
                                  <div
                                    key={m.id}
                                    onClick={() => {
                                      setSelectedMeeting(m);
                                      setIsAssignModalOpen(true);
                                    }}
                                    className={`relative p-2.5 rounded-lg border text-xs cursor-pointer transition-all hover:shadow-md flex flex-col justify-between ${
                                      isUnassigned
                                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                                        : `${theme.cardBg} ${theme.cardBorder} ${theme.cardHover} text-slate-800`
                                    }`}
                                  >
                                    <div>
                                      {/* Top Row: Team chip, Start time, recurring icon, initials tag */}
                                      <div className="flex items-center gap-1.5 text-slate-800 mb-1 flex-wrap">
                                        {/* Team Tag */}
                                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                                          m.teamId === 'team1' ? 'bg-purple-100/90 text-purple-900 border-purple-200' :
                                          m.teamId === 'team2' ? 'bg-sky-100/90 text-sky-900 border-sky-200' :
                                          'bg-amber-100/90 text-amber-900 border-amber-200'
                                        }`}>
                                          {teamConfig.name}
                                        </span>

                                        <span className={`font-mono text-xs font-extrabold ${theme.textAccent}`}>
                                          {m.startTime}
                                        </span>
                                        
                                        {m.isRecurring && (
                                          <Repeat className="w-3.5 h-3.5 text-slate-500 shrink-0" title="정례 회의 (Recurring)" />
                                        )}
                                        
                                        <span className={`font-extrabold tracking-tight ${theme.textAccent}`}>
                                          {interCodeBadge}
                                        </span>

                                        {m.tagPrefix && (
                                          <span className="text-[11px] font-bold text-slate-700">
                                            {m.tagPrefix}
                                          </span>
                                        )}
                                      </div>

                                      {/* Meeting Title */}
                                      <div className="font-semibold text-slate-900 leading-snug line-clamp-2">
                                        {m.titleKo}
                                      </div>
                                    </div>

                                    {/* Footer Info: Dept & Mode & Location */}
                                    <div className={`mt-2 pt-1.5 border-t ${theme.subtleBorder} flex items-center justify-between text-[11px] text-slate-500`}>
                                      <span className="truncate max-w-[130px] text-slate-600 font-normal">
                                        {m.dept}
                                      </span>
                                      <span className={`shrink-0 font-medium ${theme.textAccent}`}>
                                        {m.mode === 'Simultaneous' ? '동시' : '순차'}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WEEKLY VIEW WITH TEAM COLOR CODING */}
            {calendarView === 'weekly' && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">주간 통역 일정 매트릭스</h3>
                  <span className="text-xs text-slate-500">2026년 11월 2주차 스케줄 현황 (팀별 색상 반영)</span>
                </div>
                <div className="grid grid-cols-5 divide-x divide-slate-200 min-h-[550px]">
                  {['2026-11-09 (월)', '2026-11-10 (화)', '2026-11-11 (수)', '2026-11-12 (목)', '2026-11-13 (금)'].map((dayLabel, idx) => {
                    const dayDate = `2026-11-${String(9 + idx).padStart(2, '0')}`;
                    const dayM = filteredMeetings.filter(m => m.date === dayDate);

                    return (
                      <div key={dayDate} className="p-3 bg-white flex flex-col">
                        <div className={`font-bold text-xs pb-2 mb-2 border-b flex justify-between items-center ${
                          dayDate === currentDate ? 'text-indigo-600 border-indigo-200 bg-indigo-50/40 p-1.5 rounded' : 'text-slate-700 border-slate-200'
                        }`}>
                          <span>{dayLabel}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100">{dayM.length}건</span>
                        </div>

                        <div className="space-y-2 flex-1 overflow-y-auto">
                          {dayM.length === 0 ? (
                            <div className="text-center py-10 text-[11px] text-slate-300">일정 없음</div>
                          ) : (
                            dayM.map(m => {
                              const teamConfig = getMeetingTeamConfig(m);
                              const { theme } = teamConfig;

                              return (
                                <div
                                  key={m.id}
                                  onClick={() => {
                                    setSelectedMeeting(m);
                                    setIsAssignModalOpen(true);
                                  }}
                                  className={`p-2.5 rounded-lg border ${theme.cardBg} ${theme.cardBorder} hover:shadow-xs text-xs cursor-pointer transition`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className={`text-[9px] font-bold px-1 rounded ${theme.badgeBg} ${theme.badgeText}`}>
                                      {teamConfig.name}
                                    </span>
                                    <span className="font-mono text-[10px] font-bold text-slate-600">{m.startTime}</span>
                                  </div>
                                  <div className={`text-[11px] font-bold ${theme.textAccent} mb-0.5`}>
                                    {getInterpreterTag(m.assignedInterpreters)}
                                  </div>
                                  <div className="font-medium text-slate-800 line-clamp-1">{m.titleKo}</div>
                                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                                    <span>{m.mode === 'Simultaneous' ? '🎙️동시' : '🗣️순차'}</span>
                                    <span className="truncate max-w-[80px]">{m.dept}</span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MONTHLY VIEW */}
            {calendarView === 'monthly' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">2026년 11월 회의 캘린더 (Monthly)</h3>
                  <span className="text-xs text-slate-400">월간 총 {filteredMeetings.length}건</span>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500 mb-2">
                  <span className="text-rose-500">SUN (日)</span>
                  <span>MON (月)</span>
                  <span>TUE (火)</span>
                  <span>WED (水)</span>
                  <span>THU (木)</span>
                  <span>FRI (金)</span>
                  <span className="text-blue-500">SAT (土)</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }).map((_, index) => {
                    const dayNumber = index - 0;
                    const isValidDay = dayNumber >= 1 && dayNumber <= 30;
                    const dateFormatted = isValidDay ? `2026-11-${String(dayNumber).padStart(2, '0')}` : null;
                    const dayMeetingsList = isValidDay ? filteredMeetings.filter(m => m.date === dateFormatted) : [];
                    const isSelected = dateFormatted === currentDate;

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (isValidDay) {
                            setCurrentDate(dateFormatted);
                            setCalendarView('daily');
                          }
                        }}
                        className={`min-h-[75px] p-2 rounded-lg border text-left transition ${
                          !isValidDay ? 'bg-slate-50/50 border-transparent text-slate-300' :
                          isSelected ? 'bg-indigo-50 border-indigo-400 font-bold' :
                          'bg-white border-slate-200 hover:border-indigo-300 cursor-pointer'
                        }`}
                      >
                        {isValidDay && (
                          <>
                            <div className="flex justify-between items-center text-xs">
                              <span className={isSelected ? 'text-indigo-700 font-bold' : 'text-slate-700'}>{dayNumber}</span>
                              {dayMeetingsList.length > 0 && (
                                <span className="bg-indigo-100 text-indigo-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                                  {dayMeetingsList.length}건
                                </span>
                              )}
                            </div>
                            {dayMeetingsList.length > 0 && (
                              <div className="mt-1 space-y-1">
                                {dayMeetingsList.slice(0, 2).map(m => {
                                  const teamCfg = getMeetingTeamConfig(m);
                                  return (
                                    <div key={m.id} className={`text-[9px] px-1 py-0.5 rounded truncate ${teamCfg.theme.cardBg} ${teamCfg.theme.textAccent}`}>
                                      {m.startTime} {m.titleKo}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. WORKFLOW INTEGRATION SIMULATOR TAB */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  사내 결재 / 전자결재 워크플로우(Workflow) 자동 연계 시스템
                </div>
                <h2 className="text-xl font-bold mb-2">사내 워크플로우 결재 완료 건 자동 캘린더 등록</h2>
                <p className="text-xs text-indigo-200 leading-relaxed">
                  임직원이 결재 시스템에서 통역 지원 요청서를 승인받으면, 
                  요청 부서의 특성에 맞추어 <strong>고정 정례1 / 고정 정례2 / 긴급</strong> 중 적합한 팀으로 자동 분류되어 등재됩니다.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setIsApiSpecModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition"
                  >
                    <Code className="w-3.5 h-3.5" />
                    API / Webhook 연동 규격서 보기
                  </button>
                </div>
              </div>
            </div>

            {/* Incoming Request List */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">승인 대기열 (Incoming Approved Requests)</h3>
                  <p className="text-xs text-slate-500">결재 라인 통과 후 통역팀 담당자 승인 및 캘린더 인입 대기 중인 항목입니다.</p>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full border border-indigo-200">
                  대기: {workflowRequests.length}건
                </span>
              </div>

              {workflowRequests.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-xl border-slate-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">모든 워크플로우 요청이 처리되었습니다.</p>
                  <p className="text-xs text-slate-400 mt-1">새로운 사내 결재 요청이 발생하면 여기에 표시됩니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workflowRequests.map((req) => {
                    const suggestedTeam = TEAMS_CONFIG[req.suggestedTeamId] || TEAMS_CONFIG.team1;
                    return (
                      <div
                        key={req.wfId}
                        className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {req.wfId}
                            </span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${suggestedTeam.theme.chip}`}>
                              추천 배정: {suggestedTeam.name}
                            </span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ✓ 전자결재 완료 ({req.approvedAt})
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-sm">{req.titleKo}</h4>
                          <p className="text-xs text-slate-500">{req.titleJa}</p>

                          <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                            <span><strong>요청부서:</strong> {req.reqDept} ({req.requester})</span>
                            <span><strong>희망일시:</strong> {req.date} {req.startTime}~{req.endTime}</span>
                            <span><strong>장소:</strong> {req.locationDetails}</span>
                            <span><strong>필요인원:</strong> {req.needInterpretersCount}명</span>
                          </div>

                          {req.notes && (
                            <div className="text-xs bg-amber-50 text-amber-800 p-2 rounded-md border border-amber-200">
                              💬 <strong>의뢰자 특이사항:</strong> {req.notes}
                            </div>
                          )}
                        </div>

                        <div className="flex md:flex-col gap-2 shrink-0">
                          <button
                            onClick={() => handleApproveWorkflow(req)}
                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
                          >
                            <FileCheck className="w-4 h-4" />
                            {suggestedTeam.name} 캘린더 자동 등록
                          </button>
                          <button
                            onClick={() => {
                              setWorkflowRequests(prev => prev.filter(r => r.wfId !== req.wfId));
                              showToast(`요청 [${req.wfId}]이 반려 처리되었습니다.`);
                            }}
                            className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 rounded-lg text-xs font-medium transition"
                          >
                            보류/반려
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. INTERPRETERS ROSTER TAB - ORGANIZED BY 3 TEAMS (9, 4, 7) */}
        {activeTab === 'interpreters' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">한일 통역팀 Roster & 분과 조직도 (20명)</h2>
                <p className="text-xs text-slate-500">
                  고정 정례1 (9명), 고정 정례2 (4명), 긴급 (7명) 분과별 전담 담당 부서 및 가용 인력 현황
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingInterpreter({
                    id: `int-${Date.now()}`,
                    teamId: 'team1',
                    code: 'XX',
                    name: '',
                    nameJa: '',
                    native: 'KO',
                    level: 'Mid',
                    status: 'Available',
                    email: '',
                    avatar: '👤',
                    totalHours: 0
                  });
                  setIsInterpreterModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                새 통역사 등록
              </button>
            </div>

            {/* 3 TEAM SECTIONS */}
            {Object.values(TEAMS_CONFIG).map((team) => {
              const teamMembers = interpreters.filter(i => i.teamId === team.id);

              return (
                <div key={team.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  {/* Team Section Header */}
                  <div className={`p-4 sm:p-5 border-b border-slate-200 ${team.theme.cardBg} flex flex-col md:flex-row md:items-center justify-between gap-3`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${team.theme.indicator}`}></span>
                        <h3 className={`font-bold text-base ${team.theme.textAccent}`}>
                          {team.name} ({teamMembers.length}명 / 정원 {team.count}명)
                        </h3>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${team.theme.chip}`}>
                          {team.theme.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>전담 부서:</strong> {team.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() => {
                          setFilterTeam(team.id);
                          setFilterInterpreter('ALL');
                          setActiveTab('calendar');
                          showToast(`${team.name} 캘린더 일정으로 전환되었습니다.`);
                        }}
                        className={`px-3 py-1.5 rounded-lg font-bold border transition ${team.theme.chip} hover:shadow-xs`}
                      >
                        이 팀의 회의 캘린더 보기 →
                      </button>
                    </div>
                  </div>

                  {/* Members Grid within Team */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {teamMembers.map((int) => {
                      const assignedMeetingsCount = meetings.filter(m => m.assignedInterpreters.includes(int.id)).length;

                      return (
                        <div
                          key={int.id}
                          className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-indigo-300 transition relative flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl p-1 bg-slate-100 rounded-xl">{int.avatar}</span>
                                <div>
                                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1">
                                    <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${team.theme.badgeBg} ${team.theme.badgeText}`}>
                                      【{int.code}】
                                    </span>
                                    {int.name}
                                  </div>
                                  <span className="text-[11px] text-slate-400 block">{int.nameJa}</span>
                                  <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                                    int.native === 'KO' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                  }`}>
                                    {int.native === 'KO' ? '🇰🇷 한국어 모국' : '🇯🇵 日本語母語'}
                                  </span>
                                </div>
                              </div>

                              {/* Status Dropdown */}
                              <select
                                value={int.status}
                                onChange={(e) => {
                                  const updated = interpreters.map(item => item.id === int.id ? { ...item, status: e.target.value } : item);
                                  setInterpreters(updated);
                                  showToast(`${int.name} 상태: ${e.target.value} 변경`);
                                }}
                                className={`text-[10px] font-medium rounded-md px-1.5 py-0.5 outline-none border ${
                                  int.status === 'Available' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                  int.status === 'Busy' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                  'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                <option value="Available">대기중</option>
                                <option value="Busy">회의중</option>
                                <option value="On Leave">휴가</option>
                              </select>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                              <div className="flex justify-between">
                                <span className="text-slate-400">직급/레벨</span>
                                <span className="font-semibold text-slate-700">{int.level}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">누적 통역 시간</span>
                                <span className="font-mono font-bold text-indigo-600">{int.totalHours} 시간</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">배정 회의 수</span>
                                <span className="font-semibold text-slate-800">{assignedMeetingsCount}건</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 flex justify-between items-center border-t border-slate-50">
                            <button
                              onClick={() => {
                                setFilterInterpreter(int.id);
                                setActiveTab('calendar');
                                showToast(`${int.name}님의 배정 회의로 필터링되었습니다.`);
                              }}
                              className={`text-[11px] font-semibold hover:underline ${team.theme.textAccent}`}
                            >
                              배정 회의만 보기 →
                            </button>
                            <button
                              onClick={() => {
                                setEditingInterpreter(int);
                                setIsInterpreterModalOpen(true);
                              }}
                              className="text-[11px] text-slate-400 hover:text-slate-700 font-medium"
                            >
                              수정
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. STATISTICS & ANALYTICS TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">총 통역 지원 회의</span>
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 mt-2">{meetings.length}건</div>
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 전월 대비 14% 증가
                </span>
              </div>

              {/* Team 1 Metric */}
              <div className="bg-[#F3EDF9] p-5 rounded-xl border border-[#D8C7EB] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">고정 정례1 (9명)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                </div>
                <div className="text-2xl font-black text-purple-950 mt-2">
                  {meetings.filter(m => m.teamId === 'team1').length}건
                </div>
                <span className="text-xs text-purple-700 mt-1 block">글로벌비즈니스·IP·콘텐츠 전담</span>
              </div>

              {/* Team 2 Metric */}
              <div className="bg-[#EBF5FB] p-5 rounded-xl border border-[#BDDDF4] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-900">고정 정례2 (4명)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                </div>
                <div className="text-2xl font-black text-sky-950 mt-2">
                  {meetings.filter(m => m.teamId === 'team2').length}건
                </div>
                <span className="text-xs text-sky-700 mt-1 block">플랫폼엔지니어링·AI 전담</span>
              </div>

              {/* Team 3 Metric */}
              <div className="bg-[#FEF5EA] p-5 rounded-xl border border-[#FAD8B1] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">긴급 (7명)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                </div>
                <div className="text-2xl font-black text-amber-950 mt-2">
                  {meetings.filter(m => m.teamId === 'team3').length}건
                </div>
                <span className="text-xs text-amber-700 mt-1 block">전사 돌발이슈·경영진 직속</span>
              </div>
            </div>

            {/* Visual Charts: Workload Distribution Ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-1">통역사별 배정 시간 및 공정 배분 트래커</h3>
                <p className="text-xs text-slate-500 mb-4">소속 팀별 색상 태그 및 누적 가동 시간</p>

                <div className="space-y-3">
                  {[...interpreters]
                    .sort((a, b) => b.totalHours - a.totalHours)
                    .slice(0, 9)
                    .map((item, index) => {
                      const maxVal = 60;
                      const percentage = Math.min(100, Math.round((item.totalHours / maxVal) * 100));
                      const teamInfo = TEAMS_CONFIG[item.teamId] || TEAMS_CONFIG.team1;

                      return (
                        <div key={item.id} className="text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                              <span className="w-4 font-mono text-slate-400">#{index + 1}</span>
                              <span className={`font-mono text-[10px] px-1 rounded ${teamInfo.theme.badgeBg} ${teamInfo.theme.badgeText}`}>
                                【{item.code}】
                              </span>
                              {item.name} ({item.nameJa})
                              <span className={`text-[10px] px-1 rounded ${teamInfo.theme.chip}`}>
                                {teamInfo.name}
                              </span>
                            </span>
                            <span className="font-mono font-bold text-indigo-700">{item.totalHours} 시간</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                item.teamId === 'team1' ? 'bg-purple-500' :
                                item.teamId === 'team2' ? 'bg-sky-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">팀별 담당 부서 & 인력 규모 현황</h3>
                  <p className="text-xs text-slate-500 mb-4">조직별 인원 9명 / 4명 / 7명 분과 가동 체계</p>

                  <div className="space-y-3">
                    {Object.values(TEAMS_CONFIG).map((team) => (
                      <div key={team.id} className={`p-3 rounded-xl border ${team.theme.cardBg} ${team.theme.cardBorder}`}>
                        <div className="flex justify-between items-center text-xs font-bold mb-1">
                          <span className={team.theme.textAccent}>{team.name} ({team.count}명)</span>
                          <span className="text-[11px] text-slate-500">인력 비중 {Math.round((team.count / 20) * 100)}%</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {team.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 mt-4">
                  💡 <strong>팀 간 협업 배정:</strong> 긴급 이슈가 급증하여 긴급 팀(7명) 자원이 부족할 경우, 관리자 배정 모달에서 타 팀(정례1, 정례2) 인원을 유연하게 크로스 배정할 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- MODAL: ASSIGN INTERPRETER & ASSIGN TEAM --- */}
      {isAssignModalOpen && selectedMeeting && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">회의 배정 및 담당 팀 설정</h3>
                <p className="text-xs text-slate-500 font-medium">담당 분과 팀 선택 시 캘린더 색상이 해당 팀 컬러로 동기화됩니다.</p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Meeting Detail Preview Card */}
              {(() => {
                const teamCfg = TEAMS_CONFIG[selectedMeeting.teamId] || TEAMS_CONFIG.team1;
                return (
                  <div className={`${teamCfg.theme.cardBg} rounded-xl p-3.5 border ${teamCfg.theme.cardBorder} text-xs space-y-1`}>
                    <div className="flex gap-2 items-center mb-1 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${teamCfg.theme.chip}`}>
                        {teamCfg.name}
                      </span>
                      <span className={`font-mono text-xs font-bold ${teamCfg.theme.textAccent}`}>
                        {selectedMeeting.startTime} ~ {selectedMeeting.endTime}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${teamCfg.theme.badgeBg} ${teamCfg.theme.badgeText}`}>
                        {getInterpreterTag(selectedMeeting.assignedInterpreters)}
                      </span>
                      {selectedMeeting.tagPrefix && (
                        <span className="bg-white text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
                          {selectedMeeting.tagPrefix}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{selectedMeeting.titleKo}</div>
                    <div className="text-slate-600">{selectedMeeting.titleJa}</div>
                    <div className="text-slate-500 pt-1">📍 {selectedMeeting.locationDetails} ({selectedMeeting.dept})</div>
                  </div>
                );
              })()}

              {/* 🌟 TEAM SELECTION RADIO */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  담당 팀(분과) 선택:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(TEAMS_CONFIG).map((team) => {
                    const isSelected = selectedMeeting.teamId === team.id;
                    return (
                      <button
                        key={team.id}
                        type="button"
                        onClick={() => setSelectedMeeting({ ...selectedMeeting, teamId: team.id })}
                        className={`p-2 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                          isSelected
                            ? `${team.theme.cardBg} ${team.theme.cardBorder} ring-2 ring-indigo-500 font-bold`
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${team.theme.indicator}`}></span>
                          <span className={isSelected ? team.theme.textAccent : 'text-slate-800'}>{team.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">{team.count}명 구성</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interpreter Selection List (Grouped by Team) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    배정할 통역사 선택:
                  </label>
                  <span className="text-[11px] font-bold text-indigo-700">
                    현재 배정: {selectedMeeting.assignedInterpreters.length}명
                  </span>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1.5 border border-slate-200 rounded-xl p-2">
                  {interpreters.map(inter => {
                    const isChecked = selectedMeeting.assignedInterpreters.includes(inter.id);
                    const conflictMsg = checkConflict(
                      inter.id,
                      selectedMeeting.date,
                      selectedMeeting.startTime,
                      selectedMeeting.endTime,
                      selectedMeeting.id
                    );
                    const interTeam = TEAMS_CONFIG[inter.teamId] || TEAMS_CONFIG.team1;
                    const isSameTeam = inter.teamId === selectedMeeting.teamId;

                    return (
                      <div
                        key={inter.id}
                        onClick={() => {
                          let nextAssigned;
                          if (isChecked) {
                            nextAssigned = selectedMeeting.assignedInterpreters.filter(id => id !== inter.id);
                          } else {
                            if (conflictMsg) {
                              showToast(`⚠️ 중복 경고: ${conflictMsg}`);
                            }
                            nextAssigned = [...selectedMeeting.assignedInterpreters, inter.id];
                          }
                          setSelectedMeeting({ ...selectedMeeting, assignedInterpreters: nextAssigned });
                        }}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition ${
                          isChecked ? `${interTeam.theme.cardBg} ${interTeam.theme.cardBorder}` :
                          conflictMsg ? 'bg-rose-50/40 border-rose-100 hover:border-rose-300' :
                          'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="rounded text-indigo-600 focus:ring-0"
                          />
                          <span>{inter.avatar}</span>
                          <div>
                            <span className="font-semibold text-slate-800">
                              <span className={`font-mono text-[10px] font-bold px-1 rounded mr-1 ${interTeam.theme.badgeBg} ${interTeam.theme.badgeText}`}>
                                【{inter.code}】
                              </span>
                              {inter.name} ({inter.nameJa})
                            </span>
                            <span className={`ml-1 text-[9px] px-1 rounded ${interTeam.theme.chip}`}>
                              {interTeam.name}
                            </span>
                            <span className={`ml-1 text-[10px] px-1 rounded ${inter.native === 'KO' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                              {inter.native}
                            </span>
                          </div>
                        </div>

                        <div>
                          {conflictMsg ? (
                            <span className="flex items-center gap-1 text-[10px] text-rose-600 font-medium">
                              <AlertTriangle className="w-3 h-3 text-rose-500" />
                              중복 충돌
                            </span>
                          ) : isSameTeam ? (
                            <span className="text-[10px] text-emerald-600 font-medium">팀 내 배정</span>
                          ) : (
                            <span className="text-[10px] text-slate-400">타팀 지원</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">회의 진행 상태</label>
                <select
                  value={selectedMeeting.status}
                  onChange={(e) => setSelectedMeeting({ ...selectedMeeting, status: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-slate-50"
                >
                  <option value="Pending">대기중 (통역사 미배정)</option>
                  <option value="Assigned">배정완료 (Assigned)</option>
                  <option value="In-progress">진행중 (In-progress)</option>
                  <option value="Completed">완료 (Completed)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setMeetings(prev => prev.map(m => m.id === selectedMeeting.id ? selectedMeeting : m));
                  setIsAssignModalOpen(false);
                  showToast('회의 정보 및 팀 배정이 성공적으로 저장되었습니다.');
                }}
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs transition"
              >
                배정 확정 저장
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE NEW MEETING MANUALLY --- */}
      {isNewMeetingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">새 회의 직접 등록</h3>
              <button onClick={() => setIsNewMeetingModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const selectedTeamId = fd.get('teamId') || 'team1';

                const newM = {
                  id: `meet-manual-${Date.now()}`,
                  teamId: selectedTeamId,
                  titleKo: fd.get('titleKo'),
                  titleJa: fd.get('titleJa'),
                  dept: fd.get('dept'),
                  date: fd.get('date'),
                  startTime: fd.get('startTime'),
                  endTime: fd.get('endTime'),
                  mode: fd.get('mode'),
                  locationType: fd.get('locationType'),
                  locationDetails: fd.get('locationDetails'),
                  tagPrefix: fd.get('tagPrefix') || '',
                  assignedInterpreters: [],
                  status: 'Pending',
                  isRecurring: fd.get('isRecurring') === 'on',
                  urgent: selectedTeamId === 'team3' || fd.get('urgent') === 'on',
                  workflowRef: null
                };

                setMeetings(prev => [newM, ...prev]);
                setIsNewMeetingModalOpen(false);
                showToast(`새 회의가 [${TEAMS_CONFIG[selectedTeamId].name}] 캘린더에 등록되었습니다.`);
              }}
              className="py-4 space-y-3 text-xs"
            >
              {/* Team Assignment in Creation */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">담당 팀 (분과) *</label>
                <select name="teamId" defaultValue="team1" className="w-full border rounded-lg p-2 font-semibold">
                  <option value="team1">🟣 고정 정례1 (9명 / IP·콘텐츠·글로벌비즈니스)</option>
                  <option value="team2">🔵 고정 정례2 (4명 / 개발·인프라·AI)</option>
                  <option value="team3">🟠 긴급 (7명 / 전사 돌발·경영진·IR)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">회의명 (한국어) *</label>
                <input required name="titleKo" placeholder="예: EBJ-NW 데이터 흐름 리뷰" className="w-full border rounded-lg p-2" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">회의명 (일본어)</label>
                <input name="titleJa" placeholder="例: EBJ-NW データフローレビュー" className="w-full border rounded-lg p-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">의뢰 부서 *</label>
                  <input required name="dept" placeholder="예: 글로벌전략기획실" className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">회의 날짜 *</label>
                  <input required type="date" name="date" defaultValue={currentDate} className="w-full border rounded-lg p-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">시작 시간 *</label>
                  <input required type="time" name="startTime" defaultValue="14:00" className="w-full border rounded-lg p-2" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">종료 시간 *</label>
                  <input required type="time" name="endTime" defaultValue="15:00" className="w-full border rounded-lg p-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">통역 형식</label>
                  <select name="mode" className="w-full border rounded-lg p-2">
                    <option value="Simultaneous">동시통역 (同時)</option>
                    <option value="Consecutive">순차통역 (逐次)</option>
                    <option value="Whispering">위스퍼링 (ウィスパ)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">식별 태그 (예: ★ハイブリッド, ★対面)</label>
                  <input name="tagPrefix" placeholder="예: ★対面, [온오프]" className="w-full border rounded-lg p-2" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">장소 / 온라인 접속 링크</label>
                <input name="locationDetails" placeholder="예: Zoom Room #3 / 8F 대회의실" className="w-full border rounded-lg p-2" />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" name="isRecurring" defaultChecked className="rounded text-indigo-600" />
                  <span className="text-slate-700 font-medium">정례 회의 (🔄 표시)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" name="urgent" className="rounded text-indigo-600" />
                  <span className="text-slate-700 font-medium">긴급 VIP 여부</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewMeetingModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: INTERPRETER ADD / EDIT --- */}
      {isInterpreterModalOpen && editingInterpreter && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">통역사 정보 편집</h3>
              <button onClick={() => setIsInterpreterModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">소속 팀 (분과) *</label>
                <select
                  value={editingInterpreter.teamId}
                  onChange={(e) => setEditingInterpreter({ ...editingInterpreter, teamId: e.target.value })}
                  className="w-full border rounded-lg p-2 font-semibold"
                >
                  <option value="team1">🟣 고정 정례1 (IP·콘텐츠 전담 / 9명)</option>
                  <option value="team2">🔵 고정 정례2 (개발·인프라 전담 / 4명)</option>
                  <option value="team3">🟠 긴급 (전사 돌발·경영진 / 7명)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">이니셜 코드 *</label>
                  <input
                    value={editingInterpreter.code}
                    onChange={(e) => setEditingInterpreter({ ...editingInterpreter, code: e.target.value.toUpperCase() })}
                    placeholder="예: JY"
                    maxLength={4}
                    className="w-full border rounded-lg p-2 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">성명 (한국어) *</label>
                  <input
                    value={editingInterpreter.name}
                    onChange={(e) => setEditingInterpreter({ ...editingInterpreter, name: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">성명 (일어 표기) *</label>
                  <input
                    value={editingInterpreter.nameJa}
                    onChange={(e) => setEditingInterpreter({ ...editingInterpreter, nameJa: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">모국어 (Native)</label>
                  <select
                    value={editingInterpreter.native}
                    onChange={(e) => setEditingInterpreter({ ...editingInterpreter, native: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="KO">한국어 (KO)</option>
                    <option value="JA">일본어 (JA)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">숙련도 레벨</label>
                  <select
                    value={editingInterpreter.level}
                    onChange={(e) => setEditingInterpreter({ ...editingInterpreter, level: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="Lead">수석 (Lead)</option>
                    <option value="Senior">책임 (Senior)</option>
                    <option value="Mid">선임 (Mid)</option>
                    <option value="Junior">주임 (Junior)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">이메일</label>
                <input
                  value={editingInterpreter.email}
                  onChange={(e) => setEditingInterpreter({ ...editingInterpreter, email: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">아바타</label>
                <div className="flex gap-2">
                  {['👩‍💼', '👨‍💼', '👩‍💻', '👨‍💻', '👩‍🔬', '👨‍🔬'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setEditingInterpreter({ ...editingInterpreter, avatar: emoji })}
                      className={`text-xl p-2 rounded-lg border ${
                        editingInterpreter.avatar === emoji ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsInterpreterModalOpen(false)}
                className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                취소
              </button>
              <button
                onClick={() => {
                  const exists = interpreters.some(i => i.id === editingInterpreter.id);
                  if (exists) {
                    setInterpreters(prev => prev.map(i => i.id === editingInterpreter.id ? editingInterpreter : i));
                  } else {
                    setInterpreters(prev => [...prev, editingInterpreter]);
                  }
                  setIsInterpreterModalOpen(false);
                  showToast('통역사 정보가 저장되었습니다.');
                }}
                className="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: WORKFLOW WEBHOOK / API SPEC SPECIFICATION --- */}
      {isApiSpecModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">사내 전자결재 연동 Webhook API 규격서</h3>
              </div>
              <button onClick={() => setIsApiSpecModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs font-mono">
              <p className="text-slate-400 font-sans">
                사내 ERP, 그룹웨어 또는 결재 승인 모듈에서 최종 승인(Approved) 이벤트 발생 시 아래 엔드포인트로 JSON 페이로드를 POST 호출하면 즉시 캘린더에 등재됩니다.
              </p>

              <div>
                <span className="text-emerald-400 font-bold">POST</span> <span className="text-white">/api/v1/workflow/schedule-hook</span>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-slate-800 text-[11px] overflow-x-auto text-emerald-300">
                {`{
  "event": "APPROVAL_COMPLETED",
  "workflow_id": "WF-2026-9042",
  "approved_at": "2026-11-10T14:30:00Z",
  "meeting_payload": {
    "team_id": "team3", // "team1" (고정 정례1), "team2" (고정 정례2), "team3" (긴급)
    "title_ko": "차세대 전고체 배터리 소재 평가 공동 워크숍",
    "title_ja": "次世代全固体電池材料評価 共同ワークショップ",
    "request_dept": "신소재개발센터",
    "date": "2026-11-10",
    "start_time": "14:00",
    "end_time": "16:30",
    "mode": "Simultaneous",
    "tag_prefix": "★ハイブリッド",
    "is_recurring": true,
    "location_details": "연구동 302호 & Zoom Link"
  }
}`}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsApiSpecModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-center text-xs text-slate-400">
        InterpreBridge KO-JA Enterprise Edition • 한일 통역 3개 분과 (고정 정례1: 9인, 고정 정례2: 4인, 긴급: 7인) 전담 관리 시스템
      </footer>
    </div>
  );
}