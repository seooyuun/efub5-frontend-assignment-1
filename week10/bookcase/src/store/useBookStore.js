import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useBookStore = create(
  persist(
    devtools(
      immer(
        (set) => ({
          books: [],
          selectedBookId: null,

          addBook: (book) =>
            set((state) => ({
              books: [
                ...state.books,
                {
                  id: Date.now(),
                  ...book,
                  status: book.status || "읽고 싶은 책",
                  rating: book.rating || 3,
                  review: book.review || "",
                },
              ],
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

          updateStatus: (id, nextStatus) =>
            set((state) => ({
              books: state.books.map((b) =>
                b.id === id ? { ...b, status: nextStatus } : b
              ),
            })),

          selectBook: (id) => set({ selectedBookId: id }),
        }),
        {
          name: "book-storage", // localStorage key
        }
      )
    )
  )
);
export default useBookStore;
