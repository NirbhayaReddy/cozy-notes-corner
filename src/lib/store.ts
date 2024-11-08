import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteStore {
  notes: Note[];
  selectedNoteId: string | null;
  searchQuery: string;
  addNote: () => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  selectNote: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  selectedNoteId: null,
  searchQuery: '',
  
  addNote: () => set((state) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return {
      notes: [newNote, ...state.notes],
      selectedNoteId: newNote.id,
    };
  }),

  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id),
    selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId,
  })),

  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ),
  })),

  selectNote: (id) => set({ selectedNoteId: id }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
}));