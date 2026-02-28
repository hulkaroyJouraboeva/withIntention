"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, BarChart3, PlusCircle, Library, Settings, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { logout } from '@/app/login/actions'
import { useRouter } from 'next/navigation'

export function Sidebar() {
    const pathname = usePathname()
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark')
        setTheme(isDark ? 'dark' : 'light')
    }, [])

    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout()
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark')
    }

    const links = [
        { href: '/', label: 'Dashboard', icon: BarChart3 },
        { href: '/reflections/new', label: 'New Reflection', icon: PlusCircle },
        { href: '/library', label: 'My Library', icon: Library },
        { href: '/settings', label: 'Settings', icon: Settings },
    ]

    return (
        <nav className="hidden md:flex flex-col w-[260px] bg-surface border-r border-border-color fixed h-screen p-6 z-10">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md"></div>
                <h1 className="text-xl font-heading font-bold">with Intention</h1>
            </div>

            <ul className="flex flex-col gap-2 flex-1">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[0.95rem] font-medium transition-colors",
                                    isActive
                                        ? "bg-indigo-500/10 text-indigo-500"
                                        : "text-muted-foreground hover:bg-panel hover:text-foreground"
                                )}
                            >
                                <link.icon className="w-5 h-5 opacity-70" />
                                {link.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <div className="mt-auto pt-4 border-t border-border-color flex flex-col gap-2">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[0.95rem] font-medium text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5 opacity-70" />
                    Logout
                </button>
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[0.95rem] font-medium text-muted-foreground hover:bg-panel hover:text-foreground transition-colors"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5 opacity-70" /> : <Moon className="w-5 h-5 opacity-70" />}
                    Toggle Theme
                </button>
            </div>
        </nav>
    )
}
