'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { POI_COLORS } from '@/lib/constants'
import type { FeatureType, VoteStats } from '@/lib/types'

interface FeaturePlaceholderProps {
  feature: FeatureType
  title: string
  description: string
  targetVersion: string
  icon?: string
}

export default function FeaturePlaceholder({
  feature,
  title,
  description,
  targetVersion,
}: FeaturePlaceholderProps) {
  const router = useRouter()
  const [votes, setVotes] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  useEffect(() => {
    loadVoteStats()
    checkIfVoted()
  }, [feature])

  const loadVoteStats = async () => {
    try {
      const response = await fetch(`/api/votes/${feature}`)
      if (response.ok) {
        const data: VoteStats = await response.json()
        setVotes(data.count)
      }
    } catch (error) {
      console.error('Failed to load votes:', error)
    }
  }

  const checkIfVoted = () => {
    const voted = localStorage.getItem(`voted_${feature}`)
    setHasVoted(!!voted)
  }

  const handleVote = async () => {
    if (hasVoted || isVoting) return

    setIsVoting(true)

    try {
      const response = await fetch(`/api/votes/${feature}`, {
        method: 'POST',
      })

      if (response.ok) {
        setVotes(prev => prev + 1)
        setHasVoted(true)
        localStorage.setItem(`voted_${feature}`, 'true')
      }
    } catch (error) {
      console.error('Failed to vote:', error)
      alert('投票失败，请重试')
    } finally {
      setIsVoting(false)
    }
  }

  const getVoteProgress = () => {
    const targets: Record<FeatureType, number> = {
      surveillance: 20,
      simulation: 15,
      intelligence: 10,
    }
    const target = targets[feature] || 20
    return Math.min((votes / target) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-poi-black flex flex-col p-8">
      {/* 顶部导航 */}
      <nav className="border-b border-poi-gray p-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-poi-yellow font-mono">{title.toUpperCase()}</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border border-poi-gray text-poi-gray
                           hover:bg-poi-gray hover:text-poi-black
                           transition-colors font-mono text-sm"
          >
            RETURN
          </button>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          {/* 占位卡片 */}
          <div className="border-2 border-poi-gray bg-poi-black p-8">
            {/* 状态标签 */}
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-poi-orange text-poi-black text-xs font-mono font-bold">
                COMING SOON
              </span>
              <span className="text-poi-gray text-sm font-mono">{targetVersion}</span>
            </div>

            {/* 标题 */}
            <h2 className="text-4xl font-bold text-poi-white mb-4">{title}</h2>

            {/* 描述 */}
            <p className="text-poi-gray text-lg mb-8">{description}</p>

            {/* 投票进度 */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-mono text-poi-blue mb-2">
                <span>VOTES: {votes}</span>
                <span>{getVoteProgress().toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-poi-gray rounded overflow-hidden">
                <motion.div
                  className="h-full bg-poi-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: `${getVoteProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* 投票按钮 */}
            <button
              onClick={handleVote}
              disabled={hasVoted || isVoting}
              className={`w-full px-6 py-3 font-mono text-sm font-bold transition-all ${
                hasVoted
                  ? 'bg-poi-green text-poi-black cursor-not-allowed'
                  : 'bg-poi-yellow text-poi-black hover:bg-poi-yellow/80'
              }`}
            >
              {hasVoted ? '✓ VOTED' : isVoting ? 'VOTING...' : '👍 VOTE FOR THIS FEATURE'}
            </button>

            {/* 说明文字 */}
            {hasVoted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-poi-green text-sm font-mono mt-4 text-center"
              >
                Thank you for your vote!
              </motion.p>
            )}
          </div>

          {/* 底部提示 */}
          <p className="text-poi-gray text-sm font-mono mt-6 text-center">
            This feature is currently in development. Vote to prioritize its development.
          </p>
        </motion.div>
      </div>

      {/* 底部状态栏 */}
      <footer className="border-t border-poi-gray px-4 py-2 mt-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-mono text-poi-gray">
          <span>NODES: {Math.floor(Math.random() * 1000) + 5000} ONLINE</span>
          <span className="text-poi-green">● OPERATIONAL</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </footer>
    </div>
  )
}
