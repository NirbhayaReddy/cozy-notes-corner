import { useNoteStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Highlighter, 
  Bot, 
  Download, 
  Share2 
} from 'lucide-react';
import { toast } from "sonner";

export const NoteEditor = () => {
  const { notes, selectedNoteId, updateNote } = useNoteStore();
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleFormat = (format: string) => {
    if (!selectedNote) return;
    
    const textarea = document.querySelector('textarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = selectedNote.content;
    
    let newText = text;
    switch (format) {
      case 'h1':
        newText = text.slice(0, start) + '# ' + text.slice(start);
        break;
      case 'h2':
        newText = text.slice(0, start) + '## ' + text.slice(start);
        break;
      case 'bold':
        newText = text.slice(0, start) + '**' + text.slice(start, end) + '**' + text.slice(end);
        break;
      case 'italic':
        newText = text.slice(0, start) + '_' + text.slice(start, end) + '_' + text.slice(end);
        break;
      case 'highlight':
        newText = text.slice(0, start) + '==' + text.slice(start, end) + '==' + text.slice(end);
        break;
    }
    
    updateNote(selectedNote.id, { content: newText });
  };

  const handleAI = () => {
    toast.info("AI Assistant is being called...");
    // AI functionality to be implemented
  };

  const handleDownload = () => {
    if (!selectedNote) return;
    const blob = new Blob([selectedNote.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedNote.title || 'note'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Note downloaded successfully!");
  };

  const handleShare = () => {
    if (navigator.share && selectedNote) {
      navigator.share({
        title: selectedNote.title,
        text: selectedNote.content,
      }).catch(() => {
        toast.error("Sharing failed. Please try again.");
      });
    } else {
      toast.error("Sharing is not supported on this device/browser.");
    }
  };

  if (!selectedNote) {
    return (
      <div className="flex-1 flex items-center justify-center text-warm-gray-400">
        <p>Select or create a note to get started</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-4 border-b pb-4">
        <Button variant="ghost" size="icon" onClick={() => handleFormat('h1')}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleFormat('h2')}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleFormat('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleFormat('italic')}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleFormat('highlight')}>
          <Highlighter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleAI}>
          <Bot className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

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