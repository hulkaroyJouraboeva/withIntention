"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveReflection } from '@/services/reflectionService'
import type { MediaCategory, MediaType, ActionStatus } from '@/types'

export function ReflectionForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const fd = new FormData(e.currentTarget)

        // Explicit type casting
        const category = fd.get('category') as MediaCategory
        const type = fd.get('type') as MediaType
        const actionStatus = fd.get('action_status') as ActionStatus

        const newReflection = {
            title: fd.get('title') as string,
            category,
            type,
            source: fd.get('source') as string,
            date_consumed: fd.get('date_consumed') as string,
            duration_mins: parseInt(fd.get('duration_mins') as string, 10),
            insights: {
                claims: fd.get('claims') as string,
                evidence: fd.get('evidence') as string,
                personal: fd.get('personal') as string,
                terms: fd.get('terms') as string
            },
            application: {
                useful: fd.get('useful') as string,
                thinking: fd.get('thinking') as string,
                concrete: fd.get('concrete') as string,
                when: fd.get('when') as string,
                status: actionStatus,
                habit: fd.get('habit') === 'on',
                reminder: fd.get('reminder') === 'on'
            }
        }

        await saveReflection(newReflection)
        setLoading(false)
        router.push('/')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-xl font-heading font-semibold mb-4">1. Basic Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Media Title</label>
                        <input name="title" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select name="category" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                                <option value="Academic">Academic</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Work">Work</option>
                                <option value="Internship">Internship</option>
                                <option value="Misc">Misc</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Media Type</label>
                            <select name="type" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                                <option value="Podcast">Podcast</option>
                                <option value="YouTube">YouTube</option>
                                <option value="Book">Book</option>
                                <option value="Article">Article</option>
                                <option value="Social Post">Social Post</option>
                                <option value="Documentary">Documentary</option>
                                <option value="Course">Course</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Source (Platform + Creator)</label>
                        <input name="source" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date Consumed</label>
                            <input type="date" name="date_consumed" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                            <input type="number" name="duration_mins" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-xl font-heading font-semibold mb-4">2. Takeaways & Insights</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">A. Key Claims</label>
                        <p className="text-xs text-muted-foreground mb-1">What is the media arguing or teaching?</p>
                        <textarea name="claims" rows={3} required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">B. Supporting Evidence / Reasoning</label>
                        <textarea name="evidence" rows={3} required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">C. Personal Insight</label>
                        <textarea name="personal" rows={3} required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">D. Key Terms</label>
                        <input name="terms" className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                    </div>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <h3 className="text-xl font-heading font-semibold mb-4">3. Application & Action</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Why is this useful?</label>
                        <textarea name="useful" rows={2} required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">How does this change my thinking?</label>
                        <textarea name="thinking" rows={2} required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">What concrete action can I take?</label>
                        <input name="concrete" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">When will I implement it?</label>
                            <input type="date" name="when" required className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Implementation Status</label>
                            <select name="action_status" className="w-full px-4 py-2.5 bg-background/50 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                                <option value="No">No</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-6 mt-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input type="checkbox" name="habit" className="w-4 h-4 rounded text-indigo-500" />
                            Integrate into daily habits
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input type="checkbox" name="reminder" className="w-4 h-4 rounded text-indigo-500" />
                            Set reminder for review
                        </label>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-70"
            >
                {loading ? 'Saving...' : 'Save Reflection in Second Brain'}
            </button>
        </form>
    )
}
