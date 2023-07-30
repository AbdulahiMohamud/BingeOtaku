import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ChapterList({
  selectedManhwa,
  setSelectedChapter,
  chapterListData,
  setChapterListData,
}) {
  const [pageNum, setPageNum] = useState(1);
  const [allChaptersFetched, setAllChaptersFetched] = useState(false);

  const getChapterData = () => {
    fetch(
      `${process.env.REACT_APP_SPRING_SERVER}/manhwa/chapter-List/${selectedManhwa.provider}/${selectedManhwa.slug}/${pageNum}`
    )
      .then((response) => response.json())
      .then(console.log({ selectedManhwa }))
      .then((data) => {
        if (data.length > 0) {
          // Filter out duplicates and append new data to existing chapterListData
          setChapterListData((prevData) => {
            const newData = data.filter(
              (chapter) =>
                !prevData.some(
                  (prevChapter) => prevChapter.chapterNum === chapter.chapterNum
                )
            );
            return [...prevData, ...newData];
          });
          setPageNum(pageNum + 1); // Move to the next page
        } else {
          setAllChaptersFetched(true); // All chapters have been fetched
        }
      })
      .catch((error) =>
        console.error("Error fetching the chapter List: ", error)
      );
  };

  useEffect(() => {
    if (!allChaptersFetched) {
      getChapterData();
    }
    // eslint-disable-next-line
  }, [pageNum, selectedManhwa, allChaptersFetched]);

  useEffect(() => {
    // Sort the chapterListData by chapterNum whenever it changes
    const sortedChapterList = chapterListData.sort(
      (a, b) => b.chapterNum - a.chapterNum
    );
    setChapterListData(sortedChapterList);
    // eslint-disable-next-line
  }, [chapterListData]);

  const handleClickChapter = (chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <>
      <div  >
        <div className="bg-white rounded-lg p-4 shadow hover:bg-sky-700">
          {selectedManhwa.coverURL.length < 1 ||
          selectedManhwa.provider === "void" ? (
            <img
              src="/NoImageFound.png"
              alt={selectedManhwa.title}
              className="w-full h-auto mb-4"
            />
          ) : (
            <img
              src={selectedManhwa.coverURL}
              alt={selectedManhwa.title}
              className="w-full h-auto mb-4"
            />
          )}

          

          
        </div>

        <div><p>{selectedManhwa.synopsis}</p></div>

        <div className="h-60 overflow-scroll hover:col-"
              style={{ scrollbarWidth: "thin" }} >
        {chapterListData.map((chapter, idx) => (
          <div  key={idx} onClick={() => handleClickChapter(chapter)}>
            <ul>
              <li>
                <Link to="/chapters">{chapter.fullTitle}</Link>
              </li>
              {/* Add other properties as needed */}
            </ul>
          </div>
        ))}

</div>
      </div>
    </>
  );
}
