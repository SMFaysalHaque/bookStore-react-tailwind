import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WishList() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlists")) || [];
    setResults(stored);
  }, []);

  const removeBook = (book) => {
    const index = results.findIndex((item) => item.id === book.id);
    if (index !== -1) {
      results.splice(index, 1);
      localStorage.setItem("wishlists", JSON.stringify(results));
      window.dispatchEvent(new Event("wishlistUpdated"));
      setResults([...results]);
    }
  };

  return (
    <div className="min-h-screen">
      {results.length === 0 ? (
        <div className="flex justify-center items-center text-4xl font-bold">
          No wishes
          <p className="mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FF7F50"
              className="h-10 w-10"
            >
              <path d="M391-240q17 0 32.5-6t30.5-14q6-4 12.5-7t13.5-3q8 0 26 10 15 8 30.5 14t32.5 6q50 0 80.5-35.5T680-370q0-72-49.5-111T488-520h-16q-93 0-142.5 39T280-370q0 59 30.5 94.5T391-240Zm-1-60q-24 0-37.5-18.5T339-370q0-46 32.5-68T472-460h15q68 0 100 22t32 68q0 33-13 51.5T569-300q-12 0-34-12-13-8-26.5-13t-28.5-5q-15 0-29 5t-27 13q-8 5-16.5 8.5T390-300ZM251-532q60-24 96-53t68-79l-50-32q-26 41-54.5 63T228-588l23 56Zm457 0 23-56q-53-22-81-44t-55-64l-50 32q32 50 68 78.5t95 53.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
          </p>
          !!!
        </div>
      ) : (
        <div>
          <p className="text-2xl font-bold mb-10">Wish Lists: </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
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

                  <button onClick={() => removeBook(book)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#EA3323"
                    >
                      <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                    </svg>
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
