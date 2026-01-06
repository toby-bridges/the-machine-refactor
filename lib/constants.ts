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

// 加载状态文本
export const LOADING_TEXT = {
  AI_THINKING: '分析中...',
  SENDING: '发送中...',
  LOADING_HISTORY: '加载历史...',
} as const

// 成功状态文本
export const SUCCESS_TEXT = {
  MESSAGE_SENT: '消息已发送',
  CLEARED: '历史已清空',
  VOTED: '投票成功！',
} as const

// 错误状态文本
export const ERROR_TEXT = {
  API_FAILED: 'AI 服务暂时不可用',
  NETWORK_ERROR: '网络连接失败',
  RATE_LIMIT: '请求过于频繁，请稍后再试',
} as const

// 导航模式
export const NAVIGATION_MODES = {
  ROOT: 'MISSION_CONTROL',
  MONITOR: 'SURVEILLANCE',
  INTEL: 'INTELLIGENCE',
  PREDICT: 'SIMULATION',
  PURGE: 'SHUTDOWN',
} as const
