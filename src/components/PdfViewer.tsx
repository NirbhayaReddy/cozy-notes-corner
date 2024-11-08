import { useNoteStore } from '@/lib/store';

export const PdfViewer = () => {
  const { selectedPdfId, pdfs } = useNoteStore();
  const selectedPdf = pdfs.find((pdf) => pdf.id === selectedPdfId);

  if (!selectedPdf) {
    return (
      <div className="flex-1 flex items-center justify-center text-warm-gray-400">
        <p>Select a PDF to view</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <iframe
        src={URL.createObjectURL(selectedPdf.file)}
        className="w-full h-full border rounded-lg"
        title={selectedPdf.name}
      />
    </div>
  );
};