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
  Book,
  LogOut
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '@/lib/store';
import { supabase } from '@/integrations/supabase/client';

interface EditorToolbarProps {
  editor: Editor | null;
  onAI: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export const EditorToolbar = ({ editor, onAI, onDownload, onShare }: EditorToolbarProps) => {
  const navigate = useNavigate();
  const { setSelectedPdfId } = useNoteStore();

  const handleHomeClick = () => {
    setSelectedPdfId(null);
    navigate('/');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

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

  return (
    <div className="flex items-center justify-between space-x-2 mb-4 border-b pb-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={handleHomeClick}>
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
        <Button variant="ghost" size="icon" onClick={onAI}>
          <Bot className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};