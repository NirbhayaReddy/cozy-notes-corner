import { Sidebar } from '@/components/Sidebar';
import { NoteEditor } from '@/components/NoteEditor';
import { PdfViewer } from '@/components/PdfViewer';
import { useNoteStore } from '@/lib/store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { selectedPdfId } = useNoteStore();

  return (
    <div className="flex h-screen bg-paper">
      <div className="flex-1">
        <Tabs defaultValue="notes" className="h-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="pdfs">PDFs</TabsTrigger>
          </TabsList>
          <TabsContent value="notes" className="h-[calc(100%-40px)]">
            <div className="flex h-full">
              <Sidebar />
              <div className="flex-1">
                <NoteEditor />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pdfs" className="h-[calc(100%-40px)]">
            <div className="flex h-full">
              <div className="flex-1">
                <PdfViewer />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;