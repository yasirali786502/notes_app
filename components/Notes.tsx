'use client';

import { useNotes } from "@/hooks/useNotes";
import { Button } from "./ui/button";
import { useState } from "react";

export const Notes = () => {
  const { notes, fetchNotes, createNote, deleteNote, error, loading } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // store ids of hidden (trashed) notes
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  const handleCreateNote = () => {
    if (!title || !content) return;
    createNote(title, content);
    setTitle("");
    setContent("");
  };

  // hide note (move to trash)
  const moveToTrash = (id: string) => {
    const ok = window.confirm("Move this note to Trash?");
    if (!ok) return;

    setHiddenIds(prev => [...prev, id]);
  };

  // restore all hidden notes
  const restoreAll = () => {
    const ok = window.confirm("Restore all notes from Trash?");
    if (!ok) return;

    setHiddenIds([]);
  };

  // permanent delete
  const handleDelete = (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this note permanently?");
    if (!ok) return;

    deleteNote(id);
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (loading) return <div>Loading...</div>;

  // show only notes that are NOT hidden
  const visibleNotes = notes.filter(note => !hiddenIds.includes(note.id));

  return (
    <div className="flex flex-col gap-4">

      <Button onClick={fetchNotes}>Fetch Notes</Button>

      <ul>
        {visibleNotes.map(note => (
          <li key={note.id} className="border p-2 rounded">
            <div>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.content}</p>
            </div>

            <div className="flex gap-2 mt-2">
              <Button
                variant="destructive"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </Button>

              <Button
                variant="outline"
                onClick={() => moveToTrash(note.id)}
              >
                Move to Trash
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Restore All button (only show if something is hidden) */}
      {hiddenIds.length > 0 && (
        <Button variant="secondary" onClick={restoreAll}>
          Restore All from Trash
        </Button>
      )}

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
