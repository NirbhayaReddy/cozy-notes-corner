import { useNoteStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export const PdfViewer = () => {
  const { selectedPdfId, pdfs } = useNoteStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const selectedPdf = pdfs.find((pdf) => pdf.id === selectedPdfId);

  useEffect(() => {
    if (selectedPdf?.file) {
      const url = URL.createObjectURL(selectedPdf.file);
      setPdfUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [selectedPdf]);

  if (!selectedPdf || !pdfUrl) {
    return (
      <div className="flex-1 flex items-center justify-center text-warm-gray-400">
        <p>Select a PDF to view</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <iframe
        src={pdfUrl}
        className="w-full h-full border rounded-lg"
        title={selectedPdf.name}
      />
    </div>
  );
};