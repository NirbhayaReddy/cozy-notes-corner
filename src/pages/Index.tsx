import { Sidebar } from '@/components/Sidebar';
import { NoteEditor } from '@/components/NoteEditor';
import { PdfViewer } from '@/components/PdfViewer';
import { useNoteStore } from '@/lib/store';

const Index = () => {
  const { selectedPdfId } = useNoteStore();

  return (
    <div className="flex h-screen bg-paper">
      <Sidebar />
      {selectedPdfId ? (
        <div className="flex flex-1">
          <div className="w-1/2 border-r border-warm-gray-200">
            <NoteEditor />
          </div>
          <div className="w-1/2">
            <PdfViewer />
          </div>
        </div>
      ) : (
        <NoteEditor />
      )}
    </div>
  );
};

export default Index;