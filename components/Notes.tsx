'use client';

import { useNotes } from "@/hooks/useNotes";
import { Button } from "./ui/button";
import { useState } from "react";

export const Notes = () => {
  const { notes, fetchNotes, createNote, deleteNote, updateNote, error, loading } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  const handleCreateNote = () => {
    if (!title || !content) return;
    createNote(title, content);
    setTitle("");
    setContent("");
  };

  const moveToTrash = (id: string) => {
    if (!window.confirm("Move this note to Trash?")) return;
    setHiddenIds(prev => [...prev, id]);
  };

  const restoreAll = () => {
    if (!window.confirm("Restore all notes from Trash?")) return;
    setHiddenIds([]);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete permanently?")) return;
    deleteNote(id);
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (loading) return <div>Loading...</div>;

  const visibleNotes = notes.filter(note => !hiddenIds.includes(note.id));

  return (
    <div className="flex flex-col gap-4">

      <Button onClick={fetchNotes}>Fetch Notes</Button>

      <ul className="flex flex-col gap-2">
        {visibleNotes.map(note => (
          <li key={note.id} className="border p-3 rounded">

            {editingId === note.id ? (
              <div className="flex flex-col gap-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-2 rounded"
                />

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="border p-2 rounded"
                />

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      updateNote(note.id, editTitle, editContent);
                      setEditingId(null);
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-bold">{note.title}</h3>
                  <p>{note.content}</p>
                </div>

                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => {
                      setEditingId(note.id);
                      setEditTitle(note.title!);
                      setEditContent(note.content!);
                    }}
                  >
                    Edit
                  </Button>

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
              </>
            )}

          </li>
        ))}
      </ul>

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
