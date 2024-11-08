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
  Share2,
  Home,
  Book
} from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export const NoteEditor = () => {
  const { notes, selectedNoteId, updateNote } = useNoteStore();
  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
    ],
    content: selectedNote?.content || '<p>Start typing...</p>',
    onUpdate: ({ editor }) => {
      if (selectedNote) {
        updateNote(selectedNote.id, { content: editor.getHTML() });
      }
    },
  });

  const handleFormat = (format: string) => {
    if (!editor) return;
    
    switch (format) {
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'highlight':
        editor.chain().focus().toggleHighlight().run();
        break;
    }
  };

  const handleAI = async () => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      toast.error("OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment.");
      return;
    }

    if (!selectedNote?.content || !selectedNote?.pdfId) {
      toast.error("Please select a note with associated PDF first");
      return;
    }

    toast.info("AI Assistant is analyzing your note...");

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that answers questions based on the content provided."
          },
          {
            role: "user",
            content: selectedNote.content
          }
        ]
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        updateNote(selectedNote.id, { 
          content: selectedNote.content + "\n\nAI Response:\n" + response 
        });
        toast.success("AI response added to your note!");
      }
    } catch (error) {
      toast.error("Failed to get AI response. Please check your API key and try again.");
    }
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
    if (!selectedNote) return;
    
    // Generate a shareable link
    const shareableLink = `${window.location.origin}/note/${selectedNote.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy link.");
    });
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
      <div className="flex items-center justify-between space-x-2 mb-4 border-b pb-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/all-notes')}>
            <Book className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
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
      </div>

      <input
        type="text"
        value={selectedNote.title}
        onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
        placeholder="Untitled Note"
        className="text-2xl font-semibold text-warm-gray-800 bg-transparent border-none outline-none mb-4"
      />
      <EditorContent 
        editor={editor} 
        className="flex-1 text-warm-gray-700 prose prose-sm max-w-none"
      />
    </div>
  );
};
