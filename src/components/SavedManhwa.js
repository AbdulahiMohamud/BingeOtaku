import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

export default function SaveManhwa({loggedInUser, setSelectedManhwa, token}){


    const [savedManhwa, setSavedManhwa] = useState(null);
    // const [selectedDeleteManhwa, setSelectedDeleteManhwa] = useState(null);




   
    async function  deleteSavedManhwa(manhwaId){
        await axios
        .delete(`${process.env.REACT_APP_SPRING_SERVER}/save/${loggedInUser.id}/delete/${manhwaId}/mahwa`
        // ,
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // }
        );
        

        await getSaveManhwa();
    }

    const getSaveManhwa = () =>{
        axios
            .get(`${process.env.REACT_APP_SPRING_SERVER}/save/${loggedInUser.id}/mysaved`
            // ,
            // {
            //     headers:{
            //         Authorization: `Bearer ${token}`
            //     },
            // }
            )
            .then((response) => {
                const data = response.data;
                console.log(data);
                setSavedManhwa(data);
            })

            .catch((err) => {
                console.error("Error fetching saved manhwa from database",err)
            });
    }


    useEffect(() => {
        if(loggedInUser){
            getSaveManhwa();
            console.log(token);


        }
        
    },[loggedInUser] )


    const handleClickManhwa = (manhwa) => {
        setSelectedManhwa(manhwa);
        
        
      };
   





    return(
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedManhwa && savedManhwa.map((manhwa) => (
          
            <div
              key={manhwa.manhwa
.                slug}
              className="bg-white rounded-lg p-4 shadow hover:bg-sky-700"

              onClick={() => handleClickManhwa(manhwa.manhwa)}
              
            >
                <Link to={"/chapter-List"}>
              {/* <ImageDisplay imageUrlOrHtml={manhwa.coverURL} /> */}
              {manhwa.manhwa.coverURL.length < 1 || manhwa.manhwa.provider === "void" ? (
                <img
                  src="/NoImageFound.png"
                  alt={manhwa.manhwa.title}
                  className="w-full h-auto mb-4"
                />
              ) : (
                <img
                  src={manhwa.manhwa.coverURL}
                  alt={manhwa.manhwa.title}
                  className="w-full h-auto mb-4"
                />
                
              )}
                    </Link>    


              <h2 className="text-lg font-bold mb-2">{manhwa.manhwa.title}</h2>
              <div className=" overflow-scroll">
                {manhwa.manhwa.genre !== null &&
                  manhwa.manhwa.genre.length > 0 &&
                  manhwa.manhwa.genre.map((genre, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 rounded-full px-2 py-1 mt-2 mr-2 text-sm text-gray-700 hover:bg-red-950"
                    >
                      {genre}
                    </span>
                  ))}
              </div>

              <button
                onClick={() => deleteSavedManhwa(manhwa.id)}
                className="inline-block bg-red-700 hover:bg-red-950 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
        ))}
      </div>
        
        
        </>
    )
}