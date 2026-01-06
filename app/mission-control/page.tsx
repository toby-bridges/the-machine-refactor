'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { POI_COLORS, LOADING_TEXT, ERROR_TEXT, QUOTES } from '@/lib/constants'
import type { ChatMessage } from '@/lib/types'
import Navigation from '@/components/Navigation'

export default function MissionControlPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [displayedReply, setDisplayedReply] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 加载聊天历史
  useEffect(() => {
    loadHistory()
  }, [])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, displayedReply])

  const loadHistory = async () => {
    try {
      const response = await fetch('/api/chat/history')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Failed to load history:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    try {
      // 发送消息到 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMessage }),
      })

      if (!response.ok) {
        throw new Error(ERROR_TEXT.API_FAILED)
      }

      const data = await response.json()

      // 添加用户消息和 AI 回复到列表
      setMessages(prev => [...prev, data.message, data.reply])

      // 打字机效果显示 AI 回复
      typewriterEffect(data.reply.content)
    } catch (error) {
      console.error('Error:', error)
      alert(ERROR_TEXT.API_FAILED)
    } finally {
      setIsLoading(false)
    }
  }

  const typewriterEffect = (text: string) => {
    let index = 0
    setDisplayedReply('')

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedReply(prev => prev + text[index])
        index++
      } else {
        clearInterval(interval)
        setDisplayedReply('') // 清除，使用 messages 中的内容
      }
    }, 30)

    return () => clearInterval(interval)
  }

  return (
    <div className="min-h-screen bg-poi-black flex flex-col">
      {/* 统一导航栏 */}
      <Navigation />

      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-poi-gray mt-20"
            >
              <p className="text-poi-yellow text-lg font-mono mb-4">
                {QUOTES.ADMIN}
              </p>
              <p className="text-sm font-mono mb-2">SYSTEM READY. AWAITING INPUT.</p>
              <p className="text-xs mt-2 text-poi-blue">
                "{QUOTES.MACHINE_INTRO}"
              </p>
            </motion.div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-poi-blue text-poi-black'
                      : 'bg-poi-gray text-poi-white'
                  }`}
                >
                  <p className="text-sm font-mono whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))
          )}

          {/* 显示正在输入的回复（打字机效果） */}
          {displayedReply && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="max-w-2xl px-4 py-2 bg-poi-gray text-poi-white">
                <p className="text-sm font-mono whitespace-pre-wrap">{displayedReply}</p>
              </div>
            </motion.div>
          )}

          {/* 加载中提示 */}
          {isLoading && !displayedReply && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-poi-gray text-poi-blue px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-poi-yellow"
                  />
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-poi-yellow"
                  />
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-poi-yellow"
                  />
                </div>
                <p className="text-sm font-mono">{LOADING_TEXT.AI_THINKING}</p>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入框区域 */}
      <div className="border-t border-poi-gray p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your query, Admin..."
              disabled={isLoading}
              className="flex-1 bg-poi-black border border-poi-gray text-poi-white
                       px-4 py-2 font-mono text-sm
                       focus:outline-none focus:border-poi-yellow
                       disabled:opacity-50
                       placeholder:text-poi-gray"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-poi-yellow text-poi-black
                       hover:bg-poi-yellow/80
                       disabled:opacity-50 disabled:cursor-not-allowed
                       font-mono text-sm font-bold
                       transition-colors"
            >
              {isLoading ? 'TRANSMITTING...' : 'SEND'}
            </button>
          </div>
        </form>
      </div>

      {/* 底部状态栏 */}
      <footer className="border-t border-poi-gray px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-mono text-poi-gray">
          <span>NODES: {Math.floor(Math.random() * 1000) + 5000} ONLINE</span>
          <span className="text-poi-green">● OPERATIONAL</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </footer>
    </div>
  )
}
