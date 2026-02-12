'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  CheckSquare, 
  Calendar,
  FileText,
  LogOut
} from 'lucide-react'
import { User } from '@/lib/auth'
import { cn } from '@/lib/utils'

interface SidebarProps {
  user: User
  onLogout: () => void
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'employee'] },
    { name: 'Employees', href: '/dashboard/employees', icon: Users, roles: ['admin', 'manager'] },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban, roles: ['admin', 'manager', 'employee'] },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, roles: ['admin', 'manager', 'employee'] },
    { name: 'Leave Requests', href: '/dashboard/leave', icon: Calendar, roles: ['admin', 'manager', 'employee'] },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText, roles: ['admin', 'manager'] },
  ]

  const filteredNavigation = navigation.filter(item => item.roles.includes(user.role))

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {filteredNavigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
