import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircleLoader from "../components/CircleLoader";

export default function Books() {
  const { name } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlists")) || [];
    setWishlists(stored);
  }, []);

  console.log(wishlists);

  const toggleWishlist = (book) => {
    const exists = wishlists.some((item) => item.id === book.id);
    let updated;
    if (exists) {
      updated = wishlists.filter((item) => item.id !== book.id);
    } else {
      updated = [...wishlists, book];
    }
    setWishlists(updated);
    localStorage.setItem("wishlists", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const isInWishlist = (bookId) => wishlists.some((b) => b.id === bookId);

  useEffect(() => {
    setLoading(true);
    setApiError(false);

    axios
      .get(`https://gutendex.com/books?topic=${encodeURIComponent(name)}`)
      .then((res) => {
        setResults(res.data.results || []);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setApiError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  console.log(name);

  return (
    <div>
      {loading && <CircleLoader />}
      {!loading && !apiError && (
        <div>
          <p className="text-2xl font-bold">{name}</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6 mb-10">
            {results.map((book) => (
              <div
                key={book.id}
                className="h-[300px] p-3 rounded-lg shadow-sm bg-gradient-to-b from-amber-100 to-orange-50 hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div className="flex flex-col items-start">
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="w-[90px] h-[135px] object-cover rounded-sm shadow-sm"
                  />
                  <p className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
                    {book.title}
                  </p>
                  {book.authors.map((author, ind) => (
                    <p
                      key={ind}
                      className="mt-1 text-xs text-gray-800 line-clamp-1"
                    >
                      Author(s):{" "}
                      <span className="text-orange-400">{author.name}</span>
                    </p>
                  ))}
                </div>

                <div className="flex justify-start items-center gap-3 mt-3">
                  <Link to={`/bookDetails/id=${book.id}`}>
                    <button className="text-xs bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900 border border-orange-300 rounded px-2 py-1 transition duration-200">
                      Details
                    </button>
                  </Link>

                  <button onClick={() => toggleWishlist(book)}>
                    {isInWishlist(book.id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#EA3323"
                      >
                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#EA3323"
                      >
                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
