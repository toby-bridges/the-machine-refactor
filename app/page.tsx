'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 模拟系统初始化
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const handleEnter = () => {
    router.push('/mission-control')
  }

  return (
    <div className="min-h-screen bg-poi-black flex items-center justify-center relative overflow-hidden">
      {/* 背景扫描效果 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-poi-yellow animate-scan" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-poi-blue animate-scan delay-300" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-poi-red animate-scan delay-700" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-poi-yellow animate-scan delay-1000" />
      </div>

      {/* 主内容 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        {/* Logo / 标题 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-7xl font-bold text-poi-yellow mb-4 tracking-wider">
            THE MACHINE
          </h1>
          <p className="text-poi-blue text-xl tracking-widest">
            ARTIFICIAL INTELLIGENCE SYSTEM
          </p>
        </motion.div>

        {/* 加载进度 */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="w-96 h-1 bg-poi-gray rounded overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-poi-yellow"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-poi-blue mt-4 text-sm font-mono">
              INITIALIZING... {progress}%
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-poi-green mb-8 font-mono">
              ✓ SYSTEM READY
            </p>
          </motion.div>
        )}

        {/* 进入按钮 */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnter}
          disabled={isLoading}
          className="px-12 py-4 bg-transparent border-2 border-poi-yellow text-poi-yellow
                     hover:bg-poi-yellow hover:text-poi-black
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300
                     font-mono text-lg tracking-wider"
        >
          INITIALIZE
        </motion.button>

        {/* 版本信息 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-poi-gray text-sm font-mono"
        >
          VERSION 0.1.0 // THE MACHINE REFACTOR
        </motion.p>
      </motion.div>
    </div>
  )
}
