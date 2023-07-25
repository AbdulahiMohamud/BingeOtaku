import React, { useState, useEffect } from "react";

export default function Chapter({ selectedManhwa }) {
  const [manhwaChapterData, setManhwaChapterData] = useState(null);
  const [chapterNumber, setChapterNumber] = useState(1);

  useEffect(() => {
    const getManhwaChapters = () => {
      fetch(
        `${process.env.REACT_APP_SPRING_SERVER}/manhwa/chapters/${selectedManhwa.provider}/${chapterNumber}/${selectedManhwa.slug}`
      )
        .then((response) => response.json())
        .then((data) => setManhwaChapterData(data))
        .catch((error) =>
          console.error("Error fetching Manwha chapter data:", error)
        );
    };
    getManhwaChapters();
  }, [chapterNumber, selectedManhwa]);

  const handleNextChapter = () => {
    setChapterNumber(chapterNumber + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousChapter = () => {
    setChapterNumber(chapterNumber - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {manhwaChapterData && (
        <div key={manhwaChapterData.slug}>
          {/* Render the chapter content here */}
          {manhwaChapterData.contentURL.map((image, index) => (
            <img key={index} src={image} alt="" className="w-10 h-10 mb-4" />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        {manhwaChapterData && (
          <>
            {manhwaChapterData.chapterNav.nextSlug.length > 1 && (
              <button
                onClick={handleNextChapter}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
              >
                Next
              </button>
            )}
            <p className="text-gray-700">Page: {chapterNumber}</p>
            {chapterNumber > 1 && (
              <button
                onClick={handlePreviousChapter}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-4"
              >
                Previous
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
