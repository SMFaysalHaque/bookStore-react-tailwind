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

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-baumans font-semibold text-2xl">Tea & Tales</div>

        <div className="w-[500px] lg:block hidden relative">
          <input
            className="w-full outline-none p-2 rounded"
            placeholder="Search book..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <div className="absolute top-[60px] w-full max-h-[500px] bg-white p-3 rounded border overflow-y-auto z-10">
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
                        srcSet=""
                      />
                      <p className="truncate w-[350px]">
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

        <div className="lg:flex hidden font-medium gap-4">
          <Link to="/" className="custom-hover-effect">
            Home
          </Link>
          <Link to="/wishList" className="custom-hover-effect">
            Wishlist
          </Link>
          <div ref={dropdownRef}>
            <div
              className="custom-hover-effect cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              Categories
            </div>

            {showDropdown && (
              <ul className="absolute top-[60px] w-[150px] bg-white pl-2 z-10 border rounded">
                {categories.map((item) => (
                  <li
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                    key={item}
                    className="py-2"
                  >
                    <Link to={`/books/${encodeURIComponent(`${item}`)}`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
