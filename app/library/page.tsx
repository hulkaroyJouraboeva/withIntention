import { getReflections } from '@/services/reflectionService'

export const dynamic = 'force-dynamic'

export default async function LibraryPage() {
    const reflections = await getReflections()
    const categoriesList = ['Academic', 'Entertainment', 'Work', 'Internship', 'Misc'] as const

    const grouped = categoriesList.reduce((acc, cat) => {
        acc[cat] = reflections.filter(r => r.category === cat)
        return acc
    }, {} as Record<string, typeof reflections>)

    // Handle items that might have a category not in the main list
    grouped['Misc'].push(...reflections.filter(r => !categoriesList.includes(r.category as any)))

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8 mt-4">
                <h2 className="text-3xl font-heading font-bold">My Media Reflections</h2>
            </div>

            {reflections.length === 0 ? (
                <div className="glass-panel p-10 text-center rounded-2xl">
                    <p className="text-muted-foreground">No reflections yet. Add one carefully to see it here!</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {categoriesList.map(cat => {
                        const catReflections = grouped[cat]
                        if (catReflections.length === 0) return null

                        return (
                            <div key={cat} className="space-y-6">
                                <h3 className="text-xl font-heading font-semibold text-accent border-b border-border-color pb-2">
                                    {cat}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {catReflections.map(r => (
                                        <div key={r.id} className="glass-panel p-5 rounded-xl flex flex-col gap-3 hover:-translate-y-1 transition-transform">
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>{new Date(r.date_consumed).toLocaleDateString()}</span>
                                                <span>{r.duration_mins} mins</span>
                                            </div>
                                            <h4 className="font-semibold text-lg leading-tight">{r.title}</h4>

                                            <div className="flex gap-2">
                                                <span className="inline-block px-2 py-1 rounded bg-indigo-500/10 text-indigo-500 text-xs font-semibold">
                                                    {r.type}
                                                </span>
                                                <span className="inline-block px-2 py-1 rounded bg-purple-500/10 text-purple-500 text-xs font-semibold truncate max-w-[120px]">
                                                    {r.source}
                                                </span>
                                            </div>

                                            <div className="mt-2 text-sm text-secondary-foreground flex-1">
                                                <p className="font-medium">Action: <span className="text-muted-foreground font-normal">{r.application?.concrete}</span></p>
                                                {r.insights?.terms && (
                                                    <p className="font-medium mt-1">Terms: <span className="text-muted-foreground font-normal">{r.insights.terms}</span></p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
