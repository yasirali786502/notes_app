'use client';

import { Notes } from "@/types";
import { useState } from "react";

export const useNotes = () => {
    const [notes, setNotes] = useState<Notes[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("/api/notes");
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            setError(`Failed to fetch notes: ${error instanceof Error ? error.message : String(error)}`);
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false);
        }
    };

    return { notes, fetchNotes, loading, error };
}