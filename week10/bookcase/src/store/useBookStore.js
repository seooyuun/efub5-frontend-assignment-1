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

          // 새 책 추가
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

          // 책 삭제
          deleteBook: (id) =>
            set((state) => ({
              books: state.books.filter((b) => b.id !== id),
            })),

          // 책 정보 수정
          updateBook: (id, updated) =>
            set((state) => ({
              books: state.books.map((b) =>
                b.id === id ? { ...b, ...updated } : b
              ),
            })),

          // 책 상태 수정
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
