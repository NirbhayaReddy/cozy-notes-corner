import { Sidebar } from '@/components/Sidebar';
import { NoteEditor } from '@/components/NoteEditor';

const Index = () => {
  return (
    <div className="flex h-screen bg-paper">
      <Sidebar />
      <NoteEditor />
    </div>
  );
};

export default Index;