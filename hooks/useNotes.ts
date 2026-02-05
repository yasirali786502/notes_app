'use client';

import { Notes } from "@/types";
import { useState } from "react";

export const useNotes = () => {
    const [notes, setNotes] = useState<Notes[]>([]);

    const fetchNotes = async () => {
        try {
            const response = await fetch("/api/notes");
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    return { notes, fetchNotes };
}