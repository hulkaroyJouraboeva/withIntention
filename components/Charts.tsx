"use client"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export function Charts({ mediaCounts = {}, categoryCounts = {} }: { mediaCounts?: Record<string, number>, categoryCounts?: Record<string, number> }) {
    const isDark = typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : true
    const textColor = isDark ? '#f9fafb' : '#111827'

    const doughnutData = {
        labels: Object.keys(mediaCounts).length ? Object.keys(mediaCounts) : ['None'],
        datasets: [
            {
                data: Object.values(mediaCounts).length ? Object.values(mediaCounts) : [1],
                backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316', '#eab308'],
                borderWidth: 0,
            },
        ],
    }

    const barData = {
        labels: Object.keys(categoryCounts).length ? Object.keys(categoryCounts) : ['Academic', 'Entertainment', 'Work', 'Internship', 'Misc'],
        datasets: [
            {
                label: 'Reflections',
                data: Object.values(categoryCounts).length ? Object.values(categoryCounts) : [0, 0, 0, 0, 0],
                backgroundColor: '#818cf8',
                borderRadius: 4,
            },
        ],
    }

    const chartOptions = {
        color: textColor,
        plugins: {
            legend: {
                labels: { color: textColor, font: { family: 'Inter' } }
            }
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-panel p-6 rounded-2xl flex flex-col h-[350px]">
                <h3 className="text-lg font-medium mb-4">Time Spent by Media Type</h3>
                <div className="flex-1 relative flex items-center justify-center">
                    <Doughnut data={doughnutData} options={{ ...chartOptions, maintainAspectRatio: false }} />
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col h-[350px]">
                <h3 className="text-lg font-medium mb-4">Reflections by Category</h3>
                <div className="flex-1 relative flex items-center justify-center">
                    <Bar data={barData} options={{
                        ...chartOptions,
                        maintainAspectRatio: false,
                        scales: {
                            y: { ticks: { stepSize: 1, color: textColor }, grid: { color: 'rgba(255,255,255,0.1)' } },
                            x: { ticks: { color: textColor }, grid: { display: false } }
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}
