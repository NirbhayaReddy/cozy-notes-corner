import { Search } from 'lucide-react';
import { useNoteStore } from '@/lib/store';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useNoteStore();

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray-400" />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-warm-gray-50 border border-warm-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
};