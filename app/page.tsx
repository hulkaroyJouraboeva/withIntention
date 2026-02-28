import { DashboardStats } from '@/components/DashboardStats'
import { Charts } from '@/components/Charts'
import { getReflections } from '@/services/reflectionService'

export default async function DashboardPage() {
    const reflections = await getReflections()

    // Basic calculation since we don't have SQL aggregation in place yet
    const totalDuration = reflections.reduce((acc, r) => acc + (r.duration_mins || 0), 0)
    const categories = new Set(reflections.map(r => r.category))
    const completed = reflections.filter(r => r.application?.status === 'Yes').length
    const actionCompletion = reflections.length > 0 ? Math.round((completed / reflections.length) * 100) : 0

    const mediaCounts = reflections.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + (r.duration_mins || 0)
        return acc
    }, {} as Record<string, number>)

    const categoryCounts = reflections.reduce((acc, r) => {
        const cat = r.category || 'Misc'
        acc[cat] = (acc[cat] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DashboardStats
                stats={{
                    sessions: reflections.length,
                    totalDuration,
                    categoriesTracked: categories.size,
                    actionCompletion
                }}
            />

            <Charts mediaCounts={mediaCounts} categoryCounts={categoryCounts} />

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
                <h3 className="text-indigo-500 font-medium mb-2 flex items-center gap-2">
                    <span>🤖</span> Smart Insights
                </h3>
                <p className="text-muted-foreground text-sm">
                    {reflections.length === 0
                        ? "Keep logging reflections to generate insights about your media consumption patterns!"
                        : `You have logged ${reflections.length} mindful sessions across ${categories.size} categories. Excellent intentional tracking!`}
                </p>
            </div>
        </div>
    )
}
