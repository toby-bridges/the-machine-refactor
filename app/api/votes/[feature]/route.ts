import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

interface RouteParams {
  params: Promise<{ feature: string }>
}

// GET /api/votes/:feature - 获取功能投票统计
export async function GET(req: NextRequest, { params }: RouteParams) {
  const { feature } = await params

  try {
    const count = await prisma.featureVote.count({
      where: { feature },
    })

    return NextResponse.json({ feature, count })
  } catch (error) {
    console.error('Vote stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vote stats' },
      { status: 500 }
    )
  }
}

// POST /api/votes/:feature - 提交投票
export async function POST(req: NextRequest, { params }: RouteParams) {
  const { feature } = await params

  try {
    // 获取用户 IP（简单方式，实际应用可能需要更复杂的去重）
    const voterIp = req.headers.get('x-forwarded-for') ||
                   req.headers.get('x-real-ip') ||
                   'unknown'

    // 检查是否已经投票过
    const existing = await prisma.featureVote.findUnique({
      where: {
        feature_voterIp: {
          feature,
          voterIp,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'You have already voted for this feature' },
        { status: 400 }
      )
    }

    // 创建新投票
    await prisma.featureVote.create({
      data: {
        feature,
        voterIp,
      },
    })

    // 返回更新后的统计
    const count = await prisma.featureVote.count({
      where: { feature },
    })

    return NextResponse.json({ feature, count })
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    )
  }
}
