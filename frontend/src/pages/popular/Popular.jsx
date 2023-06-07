import React, { useState, useEffect } from "react";
import axios from "axios";

import LoaderBall from "../../components/loader/LoaderBall";
import { BiTrendingUp } from "react-icons/bi";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./popular.css";

const Popular = () => {
  const [popularVideos, setPopularVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPopularData = async () => {
      setIsLoading(true);
      try {
        await axios
          .get(`http://localhost:8080/videos/all`)
          .then(async (popvideos) => {
            console.log(popvideos.data);
            await axios
              .get("http://localhost:8080/profile/getFavVideos", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: JSON.parse(localStorage.getItem("vh_user"))
                    .token,
                },
              })
              .then((favVideos) => {
                console.log(favVideos.data);
                const favVideosIds = favVideos.data.map((voood) => voood._id);
                //console.log("sanjkas" + favVideosIds);
                
                const updatedVideos = popvideos.data.map((voood) => ({
                  ...voood,
                  isFavorite: favVideosIds.includes(voood._id),
                }));
                updatedVideos.map((voood) => console.log(voood));
                setPopularVideos(updatedVideos);
                setIsLoading(false);
              });
          });
      } catch (err) {
        console.log(err);
      }
    };

    getPopularData();
  }, []);


  const handleAddToFavourites = async (id) => {
    const targetObject = popularVideos.find((obj) => obj._id === id);
    const checkVideo = targetObject.isFavorite;
    console.log(checkVideo);
    if(!checkVideo){
      try {
        let data = { videoId: id };
        let headers = {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
        };
  
        await axios.put("http://localhost:8080/profile/addToFav", data, {
          headers,
        });

        console.log("snnaksnkksk");
        const updatedVideos = popularVideos.map((voood) => 
          voood._id === id ? { ...voood, isFavorite:  true} : voood
        );
        console.log(updatedVideos);
        setPopularVideos(updatedVideos);
      } catch (error) {
        console.log("Error making PUT request:", error);
      }
    } else{
      try{
        await axios.delete('http://localhost:8080/profile/removeFromFav' ,
      {
        data: { videoId: id },
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
        },
      })

      const updatedVideos = popularVideos.map((voood) => 
          voood._id === id ? { ...voood, isFavorite:  false} : voood
        );
        setPopularVideos(updatedVideos);
    }catch(err){
      console.log(err);
    }
    }
    
  };

  return (
    <div className="poular-page" style={{ color: "white" }}>
      <div className="main-header-cont">
        <h1 className="main-header">Popular Now</h1>
        <BiTrendingUp style={{ width: "2rem", height: "2rem" }} />
      </div>

      {isLoading ? (
        <LoaderBall message={"Loading popular videos"} />
      ) : (
        <div className="sports-cont">
          <div className="sport-cont">
            <div className="vedio-cont">
              {popularVideos.slice(0, 22).map((video) => (
                <div className="veedio-card" key={video._id}>
                  <video src={video?.highlightUrl} controls>
                    {" "}
                  </video>
                  <OverlayTrigger
                    overlay={
                      <Tooltip placement="bottom" id={video._id}>
                        {video.title}
                      </Tooltip>
                    }
                  >
                    <p className="paragraph-text">{video.title}</p>
                  </OverlayTrigger>
                  <button
                    className={
                      !video.isFavorite ? "btnn-primary" : "btnn-danger"
                    }
                    onClick={() => handleAddToFavourites(video?._id)}
                  >
                    {!video.isFavorite
                      ? "Add to Favourites"
                      : "Remove from Favourites"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popular;
