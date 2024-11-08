import { NotebookText, Plus, Trash2 } from 'lucide-react';
import { useNoteStore, type Note } from '@/lib/store';
import { SearchBar } from './SearchBar';
import { format } from 'date-fns';

export const Sidebar = () => {
  const { notes, selectedNoteId, searchQuery, addNote, deleteNote, selectNote } = useNoteStore();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 h-screen border-r border-warm-gray-200 bg-paper flex flex-col">
      <div className="p-4 border-b border-warm-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <NotebookText className="h-6 w-6 text-warm-gray-600" />
            <h1 className="font-semibold text-warm-gray-800">Notes</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => addNote()}
              className="p-1 hover:bg-warm-gray-100 rounded-md transition-colors"
              aria-label="New note"
            >
              <Plus className="h-5 w-5 text-warm-gray-600" />
            </button>
            <button
              className="p-1 hover:bg-warm-gray-100 rounded-md transition-colors"
              aria-label="Add workspace"
            >
              <NotebookText className="h-5 w-5 text-warm-gray-600" />
            </button>
          </div>
        </div>
        <SearchBar />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 border-b border-warm-gray-200 cursor-pointer transition-colors ${
              selectedNoteId === note.id ? 'bg-warm-gray-100' : 'hover:bg-warm-gray-50'
            }`}
            onClick={() => selectNote(note.id)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-warm-gray-800 truncate">
                {note.title || 'Untitled Note'}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="p-1 opacity-0 group-hover:opacity-100 hover:bg-warm-gray-200 rounded-md transition-all"
                aria-label="Delete note"
              >
                <Trash2 className="h-4 w-4 text-warm-gray-500" />
              </button>
            </div>
            <p className="text-sm text-warm-gray-500 mt-1">
              {format(note.updatedAt, 'MMM d, yyyy')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};