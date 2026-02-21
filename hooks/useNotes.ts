'use client';

import { useCreateNote } from "./useCreateNote";
import { useDeleteNote } from "./useDeleteNote";
import { useFetchNote } from "./useFetchNote"
import { useUpdateNote } from "./useUpdateNote";

export const useNotes = () => {
    const { notes, setNotes, fetchNotes, loading, error } = useFetchNote();
    const { createNote } = useCreateNote(setNotes);
    const { deleteNote } = useDeleteNote(setNotes);
    const { updateNote } = useUpdateNote(setNotes);
    return {
        notes,
        fetchNotes,
        createNote,
        deleteNote,
        updateNote,
        loading,
        error
    }
}