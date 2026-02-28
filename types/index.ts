export type MediaCategory = 'Academic' | 'Entertainment' | 'Work' | 'Internship' | 'Misc';
export type MediaType = 'Podcast' | 'YouTube' | 'Book' | 'Article' | 'Social Post' | 'Documentary' | 'Course' | 'Other';
export type ActionStatus = 'No' | 'In Progress' | 'Yes';

export interface User {
    id: string;
    email?: string;
}

export interface Insights {
    claims: string;
    evidence: string;
    personal: string;
    terms?: string;
}

export interface Application {
    useful: string;
    thinking: string;
    concrete: string;
    when: string;
    status: ActionStatus;
    habit: boolean;
    reminder: boolean;
}

export interface Reflection {
    id: string;
    user_id?: string;
    created_at?: string;
    title: string;
    category: MediaCategory;
    type: MediaType;
    source: string;
    date_consumed: string;
    duration_mins: number;
    insights: Insights;
    application: Application;
}
