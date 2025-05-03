import axios from "axios";
import React, { useEffect, useState } from "react";

const PaginationBooks = () => {
  const [results, setResults] = useState([]);
  const [mostDownload, setMostDownload] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = (page) => {
    setLoading(true);
    axios
      .get(`https://gutendex.com/books/?page=${page}`)
      .then((res) => {
        setResults(res.data.results || []);
        const total = res.data.count;
        setTotalPages(Math.ceil(total / 32));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  console.log(results);

  useEffect(() => {
    if (results.length > 0) {
      const mostDownloadBooks = () => {
        const topTenBooks = [...results]
          .sort((a, b) => b.download_count - a.download_count)
          .slice(0, 10);

        setMostDownload(topTenBooks);
      };

      mostDownloadBooks();
    }
  }, [results]);

  // const mostDownloadBooks = useCallback(() => {
  //   const topTenBooks = [...results]
  //     .sort((a, b) => b.download_count - a.download_count)
  //     .slice(0, 10);

  //   setMostDownload(topTenBooks);
  // }, [results]);

  // useEffect(() => {
  //   if (results.length > 0) {
  //     mostDownloadBooks();
  //   }
  // }, [results, mostDownloadBooks]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`mx-1 px-3 py-1 rounded ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Books - Page {currentPage}
      </h1>

      <h2 className="text-xl font-bold mt-8">Top 10 Downloaded Books</h2>
      <ul className="space-y-2 mt-2">
        {mostDownload.map((book) => (
          <li key={book.id} className="p-3 border rounded shadow">
            {book.title} —{" "}
            <span className="text-sm text-gray-600">
              {book.download_count} downloads
            </span>
          </li>
        ))}
      </ul>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {results.map((book) => (
            <li key={book.id} className="p-3 border rounded shadow-sm">
              {book.title}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        {renderPaginationNumbers()}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationBooks;
