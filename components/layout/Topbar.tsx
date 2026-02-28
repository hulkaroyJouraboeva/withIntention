"use client"
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Topbar() {
    const pathname = usePathname()

    const getPageTitle = () => {
        switch (pathname) {
            case '/': return 'Dashboard'
            case '/reflections/new': return 'New Reflection'
            case '/library': return 'My Library'
            case '/settings': return 'Settings'
            default: return 'with Intention'
        }
    }

    const [timeLeft, setTimeLeft] = useState<number | null>(null)
    const [isRunning, setIsRunning] = useState(false)

    // Timer logic for Scroll Interruption
    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        if (isRunning && timeLeft !== null && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => (t ? t - 1 : 0)), 1000)
        } else if (timeLeft === 0) {
            setIsRunning(false)
            setTimeLeft(null)
            alert("Mindful Interruption: Time to reflect on what you're consuming.")
        }
        return () => clearInterval(interval)
    }, [isRunning, timeLeft])

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0')
        const s = (secs % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    const toggleTimer = () => {
        if (isRunning) {
            setIsRunning(false)
            setTimeLeft(null)
        } else {
            setTimeLeft(15 * 60)
            setIsRunning(true)
        }
    }

    return (
        <header className="flex justify-between items-center py-6 px-4 md:px-0 sticky top-0 bg-background/80 backdrop-blur-md z-20">
            <h2 className="text-2xl font-heading font-semibold">{getPageTitle()}</h2>

            <div className="flex items-center gap-3 bg-panel px-4 py-1.5 rounded-full border border-white/10 shadow-sm text-sm">
                <span className="text-muted-foreground hidden sm:inline">Scroll Interruption:</span>
                <div className="font-heading font-semibold text-accent min-w-[45px] tabular-nums">
                    {timeLeft !== null ? formatTime(timeLeft) : '00:00'}
                </div>
                <button
                    onClick={toggleTimer}
                    className="ml-2 px-3 py-1 rounded-md border border-white/20 hover:bg-white/5 transition-colors text-xs font-medium"
                >
                    {isRunning ? 'Stop Timer' : 'Start 15m'}
                </button>
            </div>
        </header>
    )
}
