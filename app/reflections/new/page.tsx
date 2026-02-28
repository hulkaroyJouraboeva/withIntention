import { ReflectionForm } from '@/components/reflections/ReflectionForm'

export default function NewReflectionPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
            <div className="text-center mb-10 mt-4">
                <h2 className="text-4xl font-heading font-bold text-gradient mb-2">Media Reflection Card</h2>
                <p className="text-muted-foreground">Turn consumption into structured, intentional learning.</p>
            </div>

            <ReflectionForm />
        </div>
    )
}
