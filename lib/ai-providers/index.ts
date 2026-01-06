import { GoogleGenerativeAI } from '@google/generative-ai'

export interface AIProvider {
  name: string
  displayName: string
  isAvailable: boolean
  generate(prompt: string): Promise<string>
}

export class GeminiProvider implements AIProvider {
  name = 'gemini'
  displayName = 'Gemini'
  isAvailable = !!process.env.GEMINI_API_KEY

  private client: GoogleGenerativeAI

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set')
    }
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }

  async generate(prompt: string): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate response')
    }
  }
}

// 统一调用接口
export async function callAI(
  provider: string = 'gemini',
  prompt: string
): Promise<string> {
  const providers: Record<string, AIProvider> = {
    gemini: new GeminiProvider(),
    // 未来可以添加更多 providers
  }

  const ai = providers[provider]
  if (!ai || !ai.isAvailable) {
    throw new Error(`Provider ${provider} is not available`)
  }

  return ai.generate(prompt)
}
