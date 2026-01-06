import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { callAI } from '@/lib/ai-providers'
import { ChatMessage } from '@/lib/types'

// POST /api/chat - 发送消息并获取 AI 回复
export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json()

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid content' },
        { status: 400 }
      )
    }

    // 保存用户消息
    const userMessage = await prisma.chatMessage.create({
      data: {
        role: 'user',
        content,
        model: 'gemini',
      },
    })

    // 调用 AI
    const replyContent = await callAI('gemini', content)

    // 保存 AI 回复
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        role: 'assistant',
        content: replyContent,
        model: 'gemini',
      },
    })

    return NextResponse.json({
      message: userMessage,
      reply: assistantMessage,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

// GET /api/chat/history - 获取聊天历史
export async function GET() {
  try {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'asc' },
      take: 100, // 限制最近 100 条
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('History API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}

// DELETE /api/chat - 清空聊天历史
export async function DELETE() {
  try {
    await prisma.chatMessage.deleteMany({})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete API error:', error)
    return NextResponse.json(
      { error: 'Failed to clear history' },
      { status: 500 }
    )
  }
}
