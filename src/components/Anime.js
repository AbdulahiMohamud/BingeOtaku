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

  const handleClickAnime = (anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const handleCloseModal = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animeData.map((anime) => (
          <div
            key={anime.title}
            className="bg-white rounded-lg p-4 shadow hover:bg-sky-700"
            onClick={() => handleClickAnime(anime)}
          >
            
              <p className= "text-lg font-semibold"> {`Ranking: ${anime.ranking}`}</p>
            
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-auto mb-4"
            />

            <div className="">
              <h2 className="text-lg font-bold mb-2">{anime.title}</h2>
              <p className=" tect-medium mb-1">
                Status: {anime.status}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                Episodes: {anime.episodes}
              </p>
              <div className="">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-gray-200 rounded-full px-2 py-1 mt-2 mr-2 text-sm text-gray-700"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <button
                className=" bg-purple-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 h-10"
                onClick={() => handleClickAnime(anime)}
              >
                Read more ...
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedAnime && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-4"
            onClick={handleCloseModal}
          >
            close
          </button>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              {selectedAnime.title}
            </h2>
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
