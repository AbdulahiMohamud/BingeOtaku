import React, { useState, useEffect, useRef } from "react";

export default function Chapter({ selectedManhwa }) {
  const [manhwaChapterData, setManhwaChapterData] = useState(null);
  const [chapterNumber, setChapterNumber] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const scrollHeight = document.documentElement.scrollHeight;


  const handleDoubleClick = () =>{
    if(isAutoScroll){
        setIsAutoScroll(false)
    }else{
        setIsAutoScroll(true)
        window.scrollBy({top: scrollHeight,behavior:"smooth"})
    }
    console.log(isAutoScroll)
  }

  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 20);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    {isVisible && (
        <div
          className="fixed bottom-8 right-8 w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer shadow-md"
          onClick={scrollToTop}
        >
          &#x2191; {/* Up arrow Unicode character */}
        </div>
      )}

      {manhwaChapterData && (
        <div key={manhwaChapterData.slug}>
          {/* Render the chapter content here */}
          <h1 className=" text-lg font-bold">{manhwaChapterData.slug.replaceAll("-"," ").toUpperCase()}</h1>

          <div className="flex justify-center mt-8">
        {manhwaChapterData && (
          <>
          
            {chapterNumber > 1 && (
              <button
                onClick={handlePreviousChapter}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-4"
              >
                Previous
              </button>
            
            
            )}
            <p className="text-gray-700 m-2 font-semibold">Page: {chapterNumber}</p>
            {manhwaChapterData.chapterNav.nextSlug.length > 1 && (
              <button
                onClick={handleNextChapter}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
           
          {manhwaChapterData.contentURL.map((image, index) => (
            
            <img onDoubleClick={handleDoubleClick} key={index} src={image} alt="" className=" mb-4 lg:h-auto w-auto sm:h-70 w-90 md:h-70 w-90" />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        {manhwaChapterData && (
          <>
          <p className="text-gray-700">Page: {chapterNumber}</p>
            {manhwaChapterData.chapterNav.nextSlug.length > 1 && (
              <button
                onClick={handleNextChapter}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
              >
                Next
              </button>
            )}
            
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
