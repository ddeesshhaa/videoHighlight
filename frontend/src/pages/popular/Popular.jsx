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
        let voood = await axios.get(`http://localhost:8080/videos/all`);
        let ww = await voood.data;
        //console.log(ww);
        const updatedVideos = await ww.map((video) => {
          return {
            ...video,
            isFavourite: "false",
          };
        });
        console.log(updatedVideos);
        setPopularVideos(updatedVideos);
        setIsLoading(false);
        //console.log(popularVideos);
      } catch (err) {
        console.log(err);
      }
    };

    getPopularData();
  }, []);

  /* useEffect(() => {
    console.log(popularVideos);
  }, [popularVideos]); */

  const handleAddToFavourites = async (id) => {
    try {
      let data = { videoId: id };
      let headers = {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
      };

      const response = await axios.put(
        "http://localhost:8080/profile/addToFav",
        data,
        { headers }
      );
    } catch (error) {
      console.log("Error making PUT request:", error);
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
                  <video src={video.highlightUrl} controls>
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
                      video.isFavourite ? "btnn-primary" : "btnn-danger"
                    }
                    onClick={() => handleAddToFavourites(video._id)}
                  >
                    {video.isFavourite
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
