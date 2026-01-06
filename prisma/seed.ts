import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 清空现有数据
  await prisma.chatMessage.deleteMany()
  await prisma.featureVote.deleteMany()

  // 插入测试聊天消息
  await prisma.chatMessage.createMany({
    data: [
      {
        role: 'user',
        content: 'Hello, Machine!',
        model: 'gemini',
      },
      {
        role: 'assistant',
        content: 'I am here. How can I help you today?',
        model: 'gemini',
      },
      {
        role: 'user',
        content: 'What is your mission?',
        model: 'gemini',
      },
      {
        role: 'assistant',
        content: 'To protect and serve. I monitor, analyze, and provide intelligence to assist you.',
        model: 'gemini',
      },
    ],
  })

  // 插入测试投票数据
  const features = ['surveillance', 'simulation', 'intelligence'] as const

  for (const feature of features) {
    await prisma.featureVote.createMany({
      data: Array.from({ length: 5 }, (_, i) => ({
        feature,
        voterIp: `192.168.1.${i + 1}`, // 模拟 IP
      })),
    })
  }

  console.log('✅ Seed complete:')
  console.log('  - 4 chat messages')
  console.log('  - 15 votes (5 per feature)')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
