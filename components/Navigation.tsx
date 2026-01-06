'use client'

import { useRouter, usePathname } from 'next/navigation'
import { POI_COLORS } from '@/lib/constants'

interface NavItem {
  path: string
  label: string
  color: string
}

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { path: '/', label: 'HOME', color: 'text-poi-yellow' },
    { path: '/mission-control', label: 'CHAT', color: 'text-poi-yellow' },
    { path: '/surveillance', label: 'SURVEILLANCE', color: 'text-poi-yellow' },
    { path: '/intelligence', label: 'INTELLIGENCE', color: 'text-poi-yellow' },
    { path: '/simulation', label: 'SIMULATION', color: 'text-poi-yellow' },
  ]

  // 首页不显示导航
  if (pathname === '/') {
    return null
  }

  return (
    <nav className="border-b border-poi-gray bg-poi-black">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 group"
          >
            <div className="w-2 h-2 bg-poi-yellow rounded-full animate-pulse" />
            <h1 className="text-xl font-bold text-poi-yellow font-mono group-hover:opacity-80 transition-opacity">
              THE MACHINE
            </h1>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`px-3 py-1.5 font-mono text-xs border transition-all ${
                    isActive
                      ? 'border-poi-yellow text-poi-yellow bg-poi-yellow/10'
                      : 'border-poi-gray text-poi-gray hover:border-poi-gray hover:text-poi-white hover:bg-poi-gray/10'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-2 h-2 bg-poi-green rounded-full animate-pulse" />
            <span className="text-poi-green">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
