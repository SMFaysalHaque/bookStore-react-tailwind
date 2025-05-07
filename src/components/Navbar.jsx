import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "Fiction",
  "Love",
  "Child",
  "Horror",
  "Thriller",
  "Crime",
  "Detective",
  "Drama",
];

function MenuLinks({ wishlists, isMobile, setMobileMenuOpen }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${
        isMobile
          ? "flex flex-col items-start gap-2 font-medium"
          : "flex items-center font-medium gap-4"
      }`}
    >
      {isMobile && <div className="text-xl font-bold mb-2">Tea & TALES</div>}

      <Link
        to="/"
        className="custom-hover-effect"
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        Home
      </Link>

      <Link
        to="/wishList"
        className="custom-hover-effect flex items-center"
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        Wishlist
        <p className="ml-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {wishlists.length}
        </p>
      </Link>

      <div ref={dropdownRef} className="relative w-full">
        <div
          className="custom-hover-effect cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          Categories
        </div>
        {showDropdown && (
          <ul
            className={`absolute z-10 bg-white border rounded ${
              isMobile ? "w-full p-2 mt-3" : "top-[60px] right-0 w-[250px] px-4"
            }`}
          >
            {categories.map((item) => (
              <li
                key={item}
                className="py-2"
                onClick={() => {
                  setShowDropdown(false);
                  isMobile && setMobileMenuOpen(false);
                }}
              >
                <Link to={`/books/${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const updateWishlist = () => {
      const stored = JSON.parse(localStorage.getItem("wishlists")) || [];
      setWishlists(stored);
    };
    window.addEventListener("wishlistUpdated", updateWishlist);
    return () => window.removeEventListener("wishlistUpdated", updateWishlist);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setResults([]);
        return;
      }
      setIsSearching(true);
      axios
        .get(`https://gutendex.com/books?search=${searchTerm}`)
        .then((res) => {
          setResults(res.data.results || []);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error("Error fetching books:", err);
          setIsSearching(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="px-3 py-5">
      <div className="flex justify-between items-center relative">
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-2xl text-black"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <Link to="/">
          <div className="font-baumans font-semibold text-2xl lg:block hidden">
            Tea & TALES
          </div>
        </Link>

        <div className="w-[500px] max-w-[70%] mx-auto relative">
          <input
            className="w-full outline-none p-2 rounded"
            placeholder="Search book..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="absolute top-[50px] -left-20 md:left-0 w-[400px] md:w-full max-h-[500px] bg-white p-3 rounded border overflow-y-auto z-10">
              {isSearching ? (
                <p>Loading...</p>
              ) : results.length === 0 ? (
                <p>No books found.</p>
              ) : (
                results.map((book) => (
                  <div
                    key={book.id}
                    className="flex justify-between gap-3 py-1 border-b"
                  >
                    <div className="flex gap-3">
                      <img
                        className="h-14 w-10"
                        src={book.formats["image/jpeg"]}
                        alt={book.id}
                      />
                      <p className="truncate w-[300px]">
                        <span className="font-bold mr-2">Title:</span>
                        {book.title}
                      </p>
                    </div>
                    <p>{book.id}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="lg:flex hidden">
          <MenuLinks wishlists={wishlists} isMobile={false} />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute w-[250px] sm:w-10 md:w-[500px] bg-white lg:hidden mt-3 p-2 rounded shadow-lg">
          <MenuLinks
            wishlists={wishlists}
            isMobile={true}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      )}
    </div>
  );
}
