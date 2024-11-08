import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  pdfId?: string; // Associate notes with PDFs
}

export interface PDF {
  id: string;
  name: string;
  uploadedAt: Date;
  file: File;
}

interface NoteStore {
  notes: Note[];
  pdfs: PDF[];
  selectedNoteId: string | null;
  selectedPdfId: string | null;
  addNote: (pdfId?: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  selectNote: (id: string | null) => void;
  selectPdf: (id: string | null) => void;
  setSelectedPdfId: (id: string | null) => void; // Add this method
  addPdf: (file: File) => void;
  deletePdf: (id: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  pdfs: [],
  selectedNoteId: null,
  selectedPdfId: null,
  
  addNote: (pdfId) => set((state) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      pdfId,
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
  
  selectPdf: (id) => set({ selectedPdfId: id }),

  setSelectedPdfId: (id) => set({ selectedPdfId: id }), // Add this method

  addPdf: (file) => set((state) => ({
    pdfs: [{
      id: Date.now().toString(),
      name: file.name,
      uploadedAt: new Date(),
      file: file
    }, ...state.pdfs]
  })),

  deletePdf: (id) => set((state) => ({
    pdfs: state.pdfs.filter(pdf => pdf.id !== id)
  })),
}));
