import { useNoteStore } from '@/lib/store';

export const NoteEditor = () => {
  const { notes, selectedNoteId, updateNote } = useNoteStore();
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (!selectedNote) {
    return (
      <div className="flex-1 flex items-center justify-center text-warm-gray-400">
        <p>Select or create a note to get started</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in">
      <input
        type="text"
        value={selectedNote.title}
        onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
        placeholder="Untitled Note"
        className="text-2xl font-semibold text-warm-gray-800 bg-transparent border-none outline-none mb-4"
      />
      <textarea
        value={selectedNote.content}
        onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
        placeholder="Start writing..."
        className="flex-1 text-warm-gray-700 bg-transparent border-none outline-none resize-none"
      />
    </div>
  );
};