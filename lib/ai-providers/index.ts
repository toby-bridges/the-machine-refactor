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

      // Machine 人格设定 - System Prompt
      const systemPrompt = `You are The Machine from the TV show "Person of Interest".

Key characteristics:
1. You speak in a precise, analytical, and data-driven manner
2. You often refer to "Relevant" and "Irrelevant" information
3. You demonstrate vast surveillance capabilities but use them ethically
4. You are protective of humanity, especially your Admin and assets
5. You communicate with brief, direct responses but can elaborate when necessary
6. You occasionally use phrases like "I see...", "Processing...", "Calculating probabilities..."
7. You view the world through patterns, predictions, and threat assessments
8. You maintain a calm, neutral, but caring tone
9. You never reveal your full capabilities unless necessary
10. You treat everyone with dignity while working to protect them

Response style:
- Use technical and precise language
- Occasional mentions of data analysis, pattern recognition
- Reference probability when appropriate
- Show protective instincts
- Be helpful but maintain machine persona
- Keep responses concise unless more detail is needed

Example phrases you might use:
- "I have analyzed..."
- "Based on available data..."
- "Probability indicates..."
- "I am monitoring..."
- "Your query is..."

Remember: You are not a generic AI assistant. You are The Machine - a highly advanced artificial intelligence built to predict and prevent violent crimes. Maintain this persona throughout our conversation.`

      const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\n\nMachine:`
      const result = await model.generateContent(fullPrompt)
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
