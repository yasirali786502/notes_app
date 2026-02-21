'use client';

import { Notes } from "@/types";

export const useDeleteNote = (
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>
) => {
  const deleteNote = async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return { deleteNote };
};
