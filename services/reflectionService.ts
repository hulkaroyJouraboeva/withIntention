"use server"

import { Reflection } from '@/types'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function getReflections(): Promise<Reflection[]> {
    try {
        const supabase = createSupabaseServerClient()
        const { data, error } = await supabase
            .from('reflections')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data as Reflection[] || []
    } catch (error) {
        console.error("Error fetching reflections:", error)
        return []
    }
}

export async function saveReflection(reflection: Omit<Reflection, 'id' | 'created_at'>) {
    try {
        const supabase = createSupabaseServerClient()
        const user = await supabase.auth.getUser()

        // For local dev mockup, do not block
        if (!user.data.user?.id) {
            console.warn("User not logged in, mock save applied")
        }

        const { error } = await supabase
            .from('reflections')
            .insert([{
                ...reflection,
                user_id: user.data.user?.id || '00000000-0000-0000-0000-000000000000',

                // Flatten the nested objects for relational compliance
                key_claims: reflection.insights?.claims,
                supporting_evidence: reflection.insights?.evidence,
                personal_insight: reflection.insights?.personal,
                key_terms: reflection.insights?.terms,

                action_useful: reflection.application?.useful,
                action_thinking: reflection.application?.thinking,
                action_concrete: reflection.application?.concrete,
                action_when: reflection.application?.when,
                action_status: reflection.application?.status,
                action_habit: reflection.application?.habit,
                action_reminder: reflection.application?.reminder
            }])

        if (error) throw error
        return true
    } catch (error) {
        console.error("Error saving reflection:", error)
        return false
    }
}
