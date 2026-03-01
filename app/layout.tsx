import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    title: 'with Intention',
    description: 'Turn media consumption into structured, intentional learning.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className={`${inter.variable} ${outfit.variable} font-sans flex min-h-screen bg-background text-foreground`}>
                <Sidebar />
                <main className="flex-1 ml-0 md:ml-[260px] relative max-w-7xl w-full">
                    <Topbar />
                    <div className="px-6 md:px-10 pb-16 pt-6">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}
