import { Notes } from "@/types";
import { useState } from "react";

export const useCreateNote = (
    setNotes: React.Dispatch<React.SetStateAction<Notes[]>>) => {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const createNote = async (title: string, content: string) => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/api/notes', {
                    method: "Post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, content }) })

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const newNote = await res.json();
                setNotes(prev => [...prev, newNote]);
            } catch(error) {
                setError(`Failed to fetch notes: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                setLoading(false);
            } 
        }
}