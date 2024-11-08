import { Sidebar } from '@/components/Sidebar';
import { NoteEditor } from '@/components/NoteEditor';
import { PdfViewer } from '@/components/PdfViewer';
import { useNoteStore } from '@/lib/store';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

const Index = () => {
  const { selectedPdfId, pdfs, deletePdf, selectPdf, addNote } = useNoteStore();

  const handlePdfClick = (pdfId: string) => {
    selectPdf(pdfId);
    addNote(pdfId);
  };

  return (
    <div className="flex h-screen bg-paper">
      {!selectedPdfId && <Sidebar />}
      {selectedPdfId ? (
        <div className="flex flex-1">
          <div className="w-1/2 border-r border-warm-gray-200">
            <NoteEditor />
          </div>
          <div className="w-1/2 h-screen">
            <PdfViewer />
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-warm-gray-800 mb-6">Workspace</h1>
            <div className="grid grid-cols-3 gap-4">
              {pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="p-4 border border-warm-gray-200 rounded-lg hover:border-warm-gray-300 cursor-pointer group"
                  onClick={() => handlePdfClick(pdf.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-warm-gray-800 truncate">
                      {pdf.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePdf(pdf.id);
                      }}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-warm-gray-100 rounded-md transition-all"
                      aria-label="Delete PDF"
                    >
                      <Trash2 className="h-4 w-4 text-warm-gray-500" />
                    </button>
                  </div>
                  <p className="text-sm text-warm-gray-500">
                    {format(pdf.uploadedAt, 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;