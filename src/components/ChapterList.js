import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ChapterList({
  selectedManhwa,
  setSelectedChapter,
  chapterListData,
  setChapterListData,
}) {
  const [pageNum, setPageNum] = useState(1);
  const [allChaptersFetched, setAllChaptersFetched] = useState(false);
  const navigate = useNavigate();

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
    <div onClick={() => navigate(-1)}>back</div>
  <div className="grid grid-cols-3 gap-4">
    {/* Book Cover */}
    <div className="col-span-1">
      {selectedManhwa.coverURL.length < 1 || selectedManhwa.provider === "void" ? (
        <img
          src="/NoImageFound.png"
          alt={selectedManhwa.title}
          className="w-50 h-40 mb-4"
        />
      ) : (
        <img
          src={selectedManhwa.coverURL}
          alt={selectedManhwa.title}
          className="w-100 h-80 mb-4 "
        />
      )}
    </div>

    {/* Book Title and Synopsis */}
    <div className="col-span-2">
      <h2 className="text-2xl font-bold">{selectedManhwa.title}</h2>
      <p className="text-black">{selectedManhwa.synopsis}</p>
    </div>

    {/* Chapter List */}
    <div className="col-span-3 max-h-60 overflow-y-auto scrollbar-thin hover:">
      {chapterListData.map((chapter, idx) => (
        <div key={idx} onClick={() => handleClickChapter(chapter)}>
          <ul>
            <li>
              <Link to="/chapters" className="text-blue-500 hover:underline">
                {chapter.fullTitle}
              </Link>
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
