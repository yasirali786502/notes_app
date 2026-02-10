'use client';

import { useNotes } from "@/hooks/useNotes";
import { Button } from "./ui/button";

export const Notes = () => {
    const { notes, fetchNotes, error, loading } = useNotes();

    if(error) {
        return <div className="text-red">{error}</div>
    }

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="flex items-center">
            <Button onClick={fetchNotes} className="flex items-center gap-4 px-2">Fetch Notes</Button>
            <ul>
                {notes.map(note => (
                    <li className="text-bold justify-center" key={note.id}>
                        <h3>{note.text}</h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}