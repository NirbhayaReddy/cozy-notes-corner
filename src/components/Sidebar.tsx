import { NotebookText, Plus, Trash2, FileUp } from 'lucide-react';
import { useNoteStore, type Note } from '@/lib/store';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export const Sidebar = () => {
  const { notes, selectedNoteId, addNote, deleteNote, selectNote } = useNoteStore();
  const navigate = useNavigate();

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        // For now, just show a success toast. We'll implement actual PDF storage later
        toast.success('PDF uploaded successfully!');
      } else {
        toast.error('Please upload a PDF file');
      }
    }
  };

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
              onClick={() => navigate('/all-notes')}
              className="p-1 hover:bg-warm-gray-100 rounded-md transition-colors"
              aria-label="View all notes"
            >
              <NotebookText className="h-5 w-5 text-warm-gray-600" />
            </button>
            <label
              className="p-1 hover:bg-warm-gray-100 rounded-md transition-colors cursor-pointer"
              aria-label="Upload PDF"
            >
              <FileUp className="h-5 w-5 text-warm-gray-600" />
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {notes.map((note) => (
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