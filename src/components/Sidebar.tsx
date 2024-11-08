import { NotebookText, Plus, Trash2, FileUp } from 'lucide-react';
import { useNoteStore } from '@/lib/store';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export const Sidebar = () => {
  const { pdfs, addPdf, deletePdf, selectPdf, addNote, selectedPdfId } = useNoteStore();
  const navigate = useNavigate();

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        addPdf(file);
        toast.success('PDF uploaded successfully!');
      } else {
        toast.error('Please upload a PDF file');
      }
    }
  };

  const handlePdfClick = (pdfId: string) => {
    selectPdf(pdfId);
    addNote(pdfId);
  };

  return (
    <div className="w-64 h-screen border-r border-warm-gray-200 bg-paper flex flex-col">
      <div className="p-4 border-b border-warm-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <NotebookText className="h-6 w-6 text-warm-gray-600" />
            <h1 className="font-semibold text-warm-gray-800">PDFs</h1>
          </div>
          <div className="flex items-center space-x-2">
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
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className={`p-4 border-b border-warm-gray-200 cursor-pointer ${
              selectedPdfId === pdf.id ? 'bg-warm-gray-100' : 'hover:bg-warm-gray-50'
            }`}
            onClick={() => handlePdfClick(pdf.id)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-warm-gray-800 truncate">
                {pdf.name}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePdf(pdf.id);
                }}
                className="p-1 opacity-0 group-hover:opacity-100 hover:bg-warm-gray-200 rounded-md transition-all"
                aria-label="Delete PDF"
              >
                <Trash2 className="h-4 w-4 text-warm-gray-500" />
              </button>
            </div>
            <p className="text-sm text-warm-gray-500 mt-1">
              {format(pdf.uploadedAt, 'MMM d, yyyy')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};