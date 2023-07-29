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
      <div>
        {chapterListData.map((chapter, idx) => (
          <div key={idx} onClick={() => handleClickChapter(chapter)}>
            {/* <h1>{chapter.provider_webtoon}</h1>
          <h1>{chapter.chapterNum}</h1> */}
            <ul>
              <li>
                <Link to="/chapters">{chapter.fullTitle}</Link>
              </li>
              {/* Add other properties as needed */}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
