import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookStore = create(
  persist(
    (set) => ({
      books: [],
      selectedBookId: null,

      addBook: (book) =>
        set((state) => ({
          books: [...state.books, { id: Date.now(), ...book }],
        })),

      deleteBook: (id) =>
        set((state) => ({
          books: state.books.filter((b) => b.id !== id),
        })),

      updateBook: (id, updated) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, ...updated } : b
          ),
        })),

      toggleRead: (id) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, read: !b.read } : b
          ),
        })),

      selectBook: (id) => set({ selectedBookId: id }),
    }),
    {
      name: "book-storage", // localStorage key
    }
  )
);
export default useBookStore;
