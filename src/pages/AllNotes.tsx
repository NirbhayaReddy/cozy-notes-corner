import { useNoteStore } from '@/lib/store';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllNotes = () => {
  const { notes, selectNote } = useNoteStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-warm-gray-600 hover:text-warm-gray-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Editor</span>
        </button>
        
        <h1 className="text-2xl font-bold text-warm-gray-800 mb-6">All Notes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => {
                selectNote(note.id);
                navigate('/');
              }}
              className="p-4 border border-warm-gray-200 rounded-lg cursor-pointer hover:bg-warm-gray-50 transition-colors"
            >
              <h3 className="font-medium text-warm-gray-800 truncate mb-2">
                {note.title || 'Untitled Note'}
              </h3>
              <p className="text-sm text-warm-gray-500">
                {format(note.updatedAt, 'MMM d, yyyy')}
              </p>
              <p className="text-sm text-warm-gray-600 mt-2 line-clamp-3">
                {note.content || 'No content'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllNotes;