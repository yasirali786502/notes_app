'use client';

import { Notes } from "@/types";

export const useUpdateNote = (
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>
) => {
  const updateNote = async (id: string, title: string, content: string) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const updatedNote = await res.json();

    setNotes(prev =>
      prev.map(note => (note.id === id ? updatedNote : note))
    );
  };

  return { updateNote };
};
