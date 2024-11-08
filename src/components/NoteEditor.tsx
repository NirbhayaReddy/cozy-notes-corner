import { useNoteStore } from '@/lib/store';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { toast } from "sonner";
import { EditorToolbar } from './EditorToolbar';
import { processWithAI } from '@/utils/aiUtils';

export const NoteEditor = () => {
  const { notes, selectedNoteId, updateNote, pdfs, selectedPdfId } = useNoteStore();
  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  const selectedPdf = pdfs.find((pdf) => pdf.id === selectedPdfId);

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

  const handleAI = async () => {
    if (!selectedNote?.content) {
      toast.error("Please write some text in your note first");
      return;
    }

    toast.info("AI Assistant is analyzing your content...");

    try {
      const aiResponse = await processWithAI(selectedNote.content, selectedPdf?.file);
      if (aiResponse) {
        updateNote(selectedNote.id, { 
          content: selectedNote.content + "\n\nAI Response:\n" + aiResponse 
        });
        toast.success("AI response added to your note!");
      }
    } catch (error) {
      toast.error("Failed to get AI response. Please try again.");
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
    const shareableLink = `${window.location.origin}/note/${selectedNote.id}`;
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
      <EditorToolbar 
        editor={editor}
        onAI={handleAI}
        onDownload={handleDownload}
        onShare={handleShare}
      />
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