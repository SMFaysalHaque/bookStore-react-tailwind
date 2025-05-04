import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CircleLoader from "../components/CircleLoader";

const PaginationBooks = () => {
  const [results, setResults] = useState([]);
  const [mostDownload, setMostDownload] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const fetchData = (page) => {
    setLoading(true);
    setApiError(false);

    axios
      .get(`https://gutendex.com/books/?page=${page}`)
      .then((res) => {
        setResults(res.data.results || []);
        const total = res.data.count;
        setTotalPages(Math.ceil(total / 32));
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setApiError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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
          className={`mx-1 px-3 py-1 rounded border transition ${
            i === currentPage
              ? "bg-orange-500 text-white border-orange-600"
              : "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <style>
        {`
          .swiper {
            padding: 20px 10px 50px 10px;
          }
          .swiper-button-prev,
          .swiper-button-next {
            background-color: #fed7aa;
            color: #9a3412;
            width: 40px;
            height: 40px;
            border-radius: 9999px; /* Full circle */
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .swiper-pagination-bullet {
            background-color: #fc8303;
          }

          .swiper-pagination-bullet-active {
            background-color: #9a3412;
          }

          .swiper-button-prev::after,
          .swiper-button-next::after {
            font-size: 16px;
            color: #7c2d12;
          }

          /* Optional hover effect */
          .swiper-button-prev:hover,
          .swiper-button-next:hover {
            background-color: #fdba74;
          }
        `}
      </style>

      <div className="max-w-3xl mx-auto">
        {loading && <CircleLoader />}
        {!loading && !apiError && (
          <div>
            <h2 className="text-xl font-bold mb-5">Top 10 Downloaded Books</h2>
            <div className="mb-5">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                navigation={true}
                loop={true}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  375: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                modules={[Autoplay, Navigation, Pagination]}
                className="w-full h-full"
              >
                {mostDownload.map((book) => (
                  <SwiperSlide key={book.id}>
                    <Link to={`/bookDetails/id=${book.id}`}>
                      <div className="flex flex-col items-start transform hover:scale-105 transition-all duration-300">
                        <img
                          src={book.formats["image/jpeg"]}
                          alt={book.title}
                          className="w-full h-[240px] object-cover rounded shadow"
                        />
                        <p className="mt-2 text-sm font-semibold text-gray-700 line-clamp-2">
                          {book.title}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        {!loading && !apiError && (
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

                  <button className="text-pink-500 hover:text-pink-600 text-base transition">
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !apiError && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-orange-200 text-orange-800 hover:bg-orange-300 hover:text-orange-900 border border-orange-300 rounded disabled:opacity-50 transition"
            >
              Previous
            </button>

            {renderPaginationNumbers()}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-orange-200 text-orange-800 hover:bg-orange-300 hover:text-orange-900 border border-orange-300 rounded disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PaginationBooks;
