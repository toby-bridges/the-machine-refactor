// 聊天相关类型
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  model?: string
  createdAt: Date
}

export interface SendMessageRequest {
  content: string
}

export interface SendMessageResponse {
  message: ChatMessage
  reply: ChatMessage
}

// 投票相关类型
export type FeatureType = 'surveillance' | 'simulation' | 'intelligence'

export interface FeatureVote {
  id: string
  feature: FeatureType
  voterIp?: string
  createdAt: Date
}

export interface VoteStats {
  feature: FeatureType
  count: number
}

// UI 相关类型
export interface NavigationMode {
  key: string
  label: string
  icon?: string
}
