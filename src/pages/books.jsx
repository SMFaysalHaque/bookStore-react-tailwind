import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircleLoader from "../components/CircleLoader";

export default function Books() {
  const { name } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

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

                  <button className="text-pink-500 hover:text-pink-600 text-base transition">
                    ❤️
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
