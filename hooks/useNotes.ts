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

    const createNote = async (title: string, content: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            })
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNotes(prev => [...prev, data]);
        } catch(error) {
            setError(`Failed to create note: ${error instanceof Error ? error.message : String(error)}`);
            console.error("Error creating note:", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteNote = async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
            setNotes(prev => prev.filter(note => note.id !== id));
        } catch(error) { 
            setError(`Failed to delete note: ${error instanceof Error ? error.message : String(error)}`); 
            console.error("Error deleting note:", error); 
        } finally {
            setLoading(false);
        }
    }

    const updateNote = async (id: string, title: string, content: string) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/notes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })
            });

            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const updatedNote = await res.json();

            setNotes(prev => prev.map(note => note.id === id ? updatedNote : note ))
        } catch(err) {
            setError(`Failed to update note: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setLoading(false);
        }
    }

    return { notes, fetchNotes, createNote, deleteNote, updateNote,loading, error };
}