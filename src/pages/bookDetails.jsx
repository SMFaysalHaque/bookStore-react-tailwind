import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircleLoader from "../components/CircleLoader";

export default function BookDetails() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    const numericId = id?.replace(/\D/g, "");
    setBookId(numericId);
    if (!numericId) return;

    setLoading(true);
    setApiError(false);

    axios
      .get(`https://gutendex.com/books?ids=${numericId}`)
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
  }, [id]);

  return (
    <div className="min-h-screen">
      {loading && <CircleLoader />}
      {!loading && !apiError && (
        <div className="flex justify-center items-start bg-[radial-gradient(circle_at_center,_#fed7aa,_#ffffff)] py-10 px-6 rounded-lg shadow-xl">
          {results.map((book, index) => (
            <div
              key={index}
              className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"
            >
              <div className="w-full md:w-1/3">
                <img
                  src={book.formats["image/jpeg"]}
                  alt="Little Women Cover"
                  className="w-full lg:h-[375px] h-[350px] rounded-lg border border-gray-300"
                />
              </div>

              <div className="w-full md:w-2/3 space-y-3">
                <h2 className="text-2xl font-bold text-orange-800">
                  Title: <span className="text-gray-800">{book.title}</span>
                </h2>
                {book.authors.map((author, authorInd) => (
                  <p key={authorInd} className="text-gray-700">
                    Author:{" "}
                    <span className="text-orange-600 hover:underline cursor-pointer">
                      {author.name}
                    </span>
                  </p>
                ))}
                <p className="text-sm text-gray-500">Book ID: {bookId}</p>
                {book.summaries.map((summary, summaryInd) => (
                  <p key={summaryInd} className="font-medium">
                    Summary:{" "}
                    <span className="text-sm font-normal text-gray-500">
                      {summary}
                    </span>
                  </p>
                ))}

                <div className="flex md:flex-row flex-col pt-4 gap-3">
                  <Link to={book.formats["application/octet-stream"]}>
                    <button className="w-full px-5 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
                      Download
                    </button>
                  </Link>
                  <Link to={book.formats["text/html"]}>
                    <button className="w-full px-5 py-2 bg-orange-200 text-orange-800 hover:bg-orange-300 hover:text-orange-900 border border-orange-300 rounded disabled:opacity-50 transition">
                      Online Reading
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
