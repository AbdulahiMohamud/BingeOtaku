import React, { useEffect, useState } from "react";
export default function Anime() {
  // add state for the page number and to save data from api call
  const [animeData, setAnimeData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // do the api call to get the info from the backend use axios or a regular fetch (up to future me (: )
  const getAnimeData = () => {
    fetch(`${process.env.REACT_APP_SPRING_SERVER}/anime/top/${pageNumber}`)
      .then((response) => response.json())
      .then((data) => setAnimeData(data))
      .catch((error) => console.error("Error fetching Anime data:", error));
  };

  // useEffect(() =>{
  //   getAnimeData();
  // },[pageNumber, animeData])

  // funtion to increment or decrement the page
  const handlePageIncrease = () => {
    setPageNumber(pageNumber + 1);
  };
  const handlePageDecrease = () => {
    if(pageNumber > 1)
    setPageNumber(pageNumber - 1);
  };

  return (
    <>
    {pageNumber === 1 ? (
      <button onClick={handlePageIncrease}>Next Page</button>
    ) : (
      <>
        <button onClick={handlePageDecrease}>Previous Page</button>
        <button onClick={handlePageIncrease}>Next Page</button>
      </>
    )}
  </>
  );
}
