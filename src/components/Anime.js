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
        {/* Anime cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {animeData.map((anime) => (
          <div
            key={anime.title}
            className="bg-white p-4 rounded shadow-md flex h-50 w-70"
            onMouseEnter={() => handleMouseEnter(anime)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full mr-4">
              <p>Rank:</p>
              <p className="text-red-500 font-semibold"> {anime.ranking}</p>
            </div>
            <img
              src={anime.image}
              alt={anime.title}
              className="w-40 h-48  object-cover mb-4 rounded"
            />
             
             <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{anime.title}</h2>
        <p className="text-gray-600 text-sm mb-1">Status: {anime.status}</p>
        <p className="text-gray-600 text-sm mb-1">Episodes: {anime.episodes}</p>
        <div className="flex flex-wrap mt-2">
          {anime.genres.map((genre) => (
            <span
              key={genre}
              className="inline-block bg-gray-200 rounded-full px-2 py-1 mt-2 mr-2 text-sm text-gray-700"
            >
              {genre}
            </span>
          ))}
        </div>
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
      
    </>
  );
}
