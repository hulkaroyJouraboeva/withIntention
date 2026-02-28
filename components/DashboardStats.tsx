export function DashboardStats({ stats = { sessions: 0, totalDuration: 0, categoriesTracked: 0, actionCompletion: 0 } }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 font-sans">Mindful Sessions</h3>
                <div className="text-4xl font-bold font-heading mb-1">{stats.sessions}</div>
                <div className="text-sm font-medium text-emerald-500">↑ 12% this week</div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 font-sans">Total Duration</h3>
                <div className="text-4xl font-bold font-heading mb-1">{stats.totalDuration}</div>
                <div className="text-sm font-medium text-muted-foreground">mins</div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 font-sans">Categories Tracked</h3>
                <div className="text-4xl font-bold font-heading mb-1">{stats.categoriesTracked}</div>
                <div className="text-sm font-medium text-emerald-500">Explore more!</div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 font-sans">Action Completion</h3>
                <div className="text-4xl font-bold font-heading mb-1">{stats.actionCompletion}%</div>
                <div className="text-sm font-medium text-emerald-500">Keep it up!</div>
            </div>
        </div>
    )
}
