import { getDocumentCall, getOneDocumentCall, patchDocumentCall } from '@/calls/DocumentCalls';
import { FilterOptions, updatedDocument } from '@/db/types';
import { mergeElements, replaceElement } from '@/lib/dataUtils';
import create from 'zustand';

type State = {
  documents: any[];
  setDocuments: (documents: any) => void;
  fetchDocument: (id: any) => void;
  patchDocument: (id: string, record: any) => void;
  createDocument: (record: any) => void;
  deleteDocument: (id: string) => void;
  fetchDocuments: (filters: FilterOptions) => void;
};


const useDocumentStore = create<State>((set) => ({
  documents: [],
  setDocuments: (documents: any) => set({ documents }),
  fetchDocument: async (id: any) => {
    const doc = await getOneDocumentCall(id);
    set((state: any) => ({
      documents: { ...state.documents, [id]: doc },
    }));
  },
  patchDocument: async (id: string, record: any) => {
    console.log("[DEBUG PATCHDOCUMENT]", id, record);
    set((state: any) => ({
        documents: replaceElement(state.documents, record),
    }));
  },
  createDocument: async (record: any) => {
    set((state: any) => ({
        documents: [...state.documents, record],
    }));
  },
  deleteDocument: async (id: string) => {
    set((state: any) => ({
        documents: state.documents.filter((item: any) => item.id !== id)
    }));
  },
  fetchDocuments: async (filters: FilterOptions) => {
    const docs = await getDocumentCall(filters);
    console.log("[DEBUG]:", docs);
    const items = docs.items;
    set((state: any) => ({
        documents: mergeElements(state.documents, items),
    }));
  }
}));

export default useDocumentStore;
