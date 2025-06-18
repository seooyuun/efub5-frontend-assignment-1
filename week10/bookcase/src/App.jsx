import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import BookDetailPage from "./pages/BookDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/add" element={<AddBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
