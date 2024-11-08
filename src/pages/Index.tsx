import { Sidebar } from '@/components/Sidebar';
import { NoteEditor } from '@/components/NoteEditor';
import { PdfViewer } from '@/components/PdfViewer';
import { useNoteStore } from '@/lib/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';

const Index = () => {
  const { selectedPdfId, pdfs } = useNoteStore();

  return (
    <div className="flex h-screen bg-paper">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {selectedPdfId && (
          <div className="border-b border-warm-gray-200 bg-white p-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4">
                {pdfs.map((pdf) => (
                  <div
                    key={pdf.id}
                    className={`inline-flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer ${
                      selectedPdfId === pdf.id ? 'bg-warm-gray-100' : 'hover:bg-warm-gray-50'
                    }`}
                  >
                    <FileText className="h-4 w-4 text-warm-gray-500" />
                    <span className="text-sm text-warm-gray-700">{pdf.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        <div className="flex-1 flex">
          <div className={`${selectedPdfId ? 'w-1/2' : 'w-full'} border-r border-warm-gray-200`}>
            <NoteEditor />
          </div>
          {selectedPdfId && (
            <div className="w-1/2 h-full">
              <PdfViewer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;