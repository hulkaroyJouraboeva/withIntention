import { createSupabaseServerClient } from '@/lib/supabase'

export async function login(email: string, password: string) {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) throw error
    return data
}

export async function signup(email: string, password: string) {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) throw error
    return data
}

export async function logout() {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.signOut()

    if (error) throw error
}
