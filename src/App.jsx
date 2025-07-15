import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import BookDetails from "./pages/bookDetails";
import Books from "./pages/books";
import Home from "./pages/home";
import WishList from "./pages/wishList";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <ScrollToTop />
        <nav className="bg-[#FF7F50] fixed top-0 left-0 w-full z-50 shadow-md">
          <div className="lg:w-[1024px] w-full mx-auto xl:px-0 px-4">
            <Navbar />
          </div>
        </nav>
        <main className="bg-[#FFE5B4]">
          <div className="lg:w-[1024px] w-full mx-auto xl:px-0 px-4 pt-28 pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishList" element={<WishList />} />
              <Route path="/bookDetails/:id" element={<BookDetails />} />
              <Route path="/books/:name" element={<Books />} />
            </Routes>
          </div>
        </main>
        <footer className="bg-[#8B4513]">
          <div className="lg:w-[1024px] w-full mx-auto xl:px-0 px-4 py-4">
            <Footer />
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
