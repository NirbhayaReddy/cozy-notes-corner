import { NotebookText, Plus, Trash2, FileUp } from 'lucide-react';
import { useNoteStore } from '@/lib/store';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { ScrollArea } from '@/components/ui/scroll-area';

export const Sidebar = () => {
  const { notes, addNote, deleteNote, selectNote, selectedNoteId } = useNoteStore();
  const navigate = useNavigate();

  const handleNewNote = () => {
    addNote();
    toast.success('New note created!');
  };

  return (
    <div className="w-64 h-screen border-r border-warm-gray-200 bg-paper flex flex-col">
      <div className="p-4 border-b border-warm-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <NotebookText className="h-6 w-6 text-warm-gray-600" />
            <h1 className="font-semibold text-warm-gray-800">Notes</h1>
          </div>
          <button
            onClick={handleNewNote}
            className="p-1 hover:bg-warm-gray-100 rounded-md transition-colors"
            aria-label="Create new note"
          >
            <Plus className="h-5 w-5 text-warm-gray-600" />
          </button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-lg cursor-pointer ${
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
                    toast.success('Note deleted');
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
      </ScrollArea>
    </div>
  );
};