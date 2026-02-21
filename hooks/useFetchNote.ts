'use client';
import { Notes } from "@/types";
import { useState } from "react";

export const useFetchNote = () => {
    const [notes, setNotes] = useState<Notes[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            setError(null);
    
            const res = await fetch('/api/notes');
            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const data = await res.json();
            setNotes(data);
        } catch(error) {
            setError(`Failed to fetch notes: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    }

    return { notes, setNotes, loading, error, fetchNotes };
}