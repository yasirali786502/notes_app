'use client';

import { useNotes } from "@/hooks/useNotes";
import { Button } from "./ui/button";
import { useState } from "react";

export const Notes = () => {
  const { notes, fetchNotes, createNote, deleteNote, error, loading } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = () => {
    if (!title || !content) return;
    createNote(title, content);
    setTitle("");
    setContent("");
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={fetchNotes}>Fetch Notes</Button>

      <ul>
        {notes.map(note => (
          <li key={note.id} className="border p-2 rounded">
            <div>
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            </div>
            <Button
            variant="destructive"
            onClick={() => deleteNote(note.id)}>
                Delete
            </Button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded"
      />

      <Button onClick={handleCreateNote}>Create Note</Button>
    </div>
  );
};
