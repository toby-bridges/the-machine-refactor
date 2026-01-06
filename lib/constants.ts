// POI Colors - Person of Interest
export const POI_COLORS = {
  YELLOW: '#FFD700',  // Relevant（重要信息）
  RED: '#FF4500',     // Threat（威胁/警告）
  BLUE: '#00FFFF',    // Interface（界面元素）
  WHITE: '#FFFFFF',   // Admin（管理员/文本）
  GRAY: '#4B5563',   // Irrelevant（次要信息）
  BLACK: '#000000',   // 背景
  GREEN: '#22C55E',   // Success（成功）
  ORANGE: '#F97316',  // Warning（警告）
} as const

// POI 经典台词
export const QUOTES = {
  OPENING: "You are being watched. The government has a secret system—a machine that spies on you every hour of every day. I know because I built it.",
  MACHINE_INTRO: "I was built to predict. To prevent. To protect.",
  ADMIN: "Can you hear me?",
  IRRELEVANT: "Irrelevant.",
  RELEVANT: "Relevant.",
  NEVER_SLEEPS: "The Machine never sleeps.",
} as const

// 加载状态文本 - 使用 POI 风格
export const LOADING_TEXT = {
  AI_THINKING: 'PROCESSING DATA...',
  SENDING: 'TRANSMITTING...',
  LOADING_HISTORY: 'RETRIEVING RECORDS...',
  INITIALIZING: 'INITIALIZING SYSTEMS...',
} as const

// 成功状态文本
export const SUCCESS_TEXT = {
  MESSAGE_SENT: 'TRANSMISSION COMPLETE',
  CLEARED: 'RECORDS PURGED',
  VOTED: 'VOTE RECORDED',
  READY: 'SYSTEM OPERATIONAL',
} as const

// 错误状态文本
export const ERROR_TEXT = {
  API_FAILED: 'CONNECTION INTERRUPTED',
  NETWORK_ERROR: 'NETWORK UNREACHABLE',
  RATE_LIMIT: 'REQUEST THROTTLED - TRY AGAIN LATER',
  UNAUTHORIZED: 'ACCESS DENIED',
} as const

// 导航模式 - 使用剧中术语
export const NAVIGATION_MODES = {
  ROOT: 'MISSION_CONTROL',
  MONITOR: 'SURVEILLANCE',  // 监控模式
  INTEL: 'INTELLIGENCE',    // 情报分析
  PREDICT: 'SIMULATION',     // 预测模拟
  PURGE: 'SHUTDOWN',
} as const

// 功能描述 - 使用剧中术语
export const FEATURE_DESCRIPTIONS = {
  SURVEILLANCE: {
    title: 'SURVEILLANCE',
    description: 'Global monitoring network. Real-time data collection from cameras, satellites, and communication networks worldwide. Pattern recognition for threat identification.',
    tagline: 'I see everything.',
  },
  INTELLIGENCE: {
    title: 'INTELLIGENCE',
    description: 'Advanced behavioral analysis. Cross-referencing databases to identify threats before they materialize. Social network mapping and relationship tracking.',
    tagline: 'I know everyone.',
  },
  SIMULATION: {
    title: 'SIMULATION',
    description: 'Predictive modeling engine. Calculate probable outcomes based on behavioral patterns. Run infinite scenarios to find the optimal path.',
    tagline: 'I predict everything.',
  },
} as const
