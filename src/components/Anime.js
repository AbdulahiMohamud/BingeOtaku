import React, { useEffect, useState } from "react";

const genreList = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Suspense",
];

export default function Anime() {
  const [animeData, setAnimeData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  let hoverTimeout;

  const handleMouseEnter = (anime) => {
    hoverTimeout = setTimeout(() => {
      setSelectedAnime(anime);
      setShowModal(true);
    },1500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setShowModal(false);
  };

  useEffect(() => {
    const getAnimeData = () => {
      fetch(`${process.env.REACT_APP_SPRING_SERVER}/anime/top/${pageNumber}`)
        .then((response) => response.json())
        .then((data) => setAnimeData(data.data))
        .then(console.log(animeData))
        .catch((error) => console.error("Error fetching Anime data:", error));
    };

    getAnimeData();
  }, [pageNumber]);

  const handlePageIncrease = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageDecrease = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGenreChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selectedOptions);
  };

  const filterAnimeByGenre = (anime) => {
    if (selectedGenres.length === 0) {
      return true; // No genre selected, show all anime
    }
    return anime.genres.some((genre) => selectedGenres.includes(genre));
  };

  const filteredAnimeData = Array.isArray(animeData)
    ? animeData.filter(filterAnimeByGenre)
    : [];

  return (
    <>
      <div className="flex justify-center mt-8">
        {pageNumber > 1 && (
          <button
            onClick={handlePageDecrease}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
          >
            Previous Page
          </button>
        )}
        <p className="text-gray-700">Page: {pageNumber}</p>
        <button
          onClick={handlePageIncrease}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-4"
        >
          Next Page
        </button>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-4">
          <label htmlFor="genre-select" className="mr-2 font-semibold">
            Filter by Genre:
          </label>
          <select
            id="genre-select"
            multiple
            className="rounded border border-gray-300 p-1"
            onChange={handleGenreChange}
          >
            {genreList.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Anime cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        {animeData.map((anime) => (
          <div
            key={anime.title}
            className="bg-white p-4 rounded shadow-md flex h-50 w-70"
            onMouseEnter={() => handleMouseEnter(anime)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mr-4">
              <p className="text-gray-700 text-xl font-semibold">{anime.ranking}</p>
            </div>
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
             
            <div className="flex flex-col overflow-scroll">
              <h2 className="text-xl font-semibold mb-2">{anime.title}</h2>
              {/* Other anime data */}
              <p className="text-sky-600">Status: {anime.status}</p>
              <p>Episodes: {anime.episodes}</p>
              {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-block bg-gray-200 rounded-full px-2 py-1 mt-2 mr-2 text-sm text-gray-700 h-5"
                  >
                    {genre}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedAnime && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">{selectedAnime.title}</h2>
            <p className="text-black">{selectedAnime.synopsis}</p>
          </div>
        </div>
      )}

        <div className="flex justify-center mt-8">
          {pageNumber > 1 && (
            <button
              onClick={handlePageDecrease}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
            >
              Previous Page
            </button>
          )}
          <p className="text-gray-700">Page: {pageNumber}</p>
          <button
            onClick={handlePageIncrease}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-4"
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}
