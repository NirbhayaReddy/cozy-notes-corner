import { FileUp, User } from 'lucide-react';
import { useNoteStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

export const Sidebar = () => {
  const { addPdf } = useNoteStore();

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

  return (
    <div className="w-64 h-screen border-r border-warm-gray-200 bg-paper flex flex-col">
      <div className="p-4 space-y-4">
        <label className="w-full">
          <Button className="w-full flex items-center justify-center gap-2" variant="outline">
            <FileUp className="h-5 w-5" />
            Upload PDF File
          </Button>
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="hidden"
          />
        </label>
        
        <Button className="w-full flex items-center justify-center gap-2" variant="outline">
          <User className="h-5 w-5" />
          John Doe's Workspace
        </Button>
      </div>
    </div>
  );
};