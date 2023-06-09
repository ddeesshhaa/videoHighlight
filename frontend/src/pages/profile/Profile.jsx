import React, { useState, useEffect } from "react";
import { Link , useParams } from "react-router-dom";
import { ThreeDots} from 'react-loader-spinner'

import { MdOutlineVideoLibrary, MdOutlineFavorite } from "react-icons/md";
import {AiOutlineArrowDown} from 'react-icons/ai';


import { MdDelete } from "react-icons/md";

import LoaderBall from "../../components/loader/LoaderBall";

import axios from "axios";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("vh_user"));
  const logUser = user.userData;

  const enc = logUser.pic.image.data;

  const {id} = useParams();

  const [activeClass, setActiveClass] = useState("left");
  const [userHighlightedVideos, setUserHighlightedVideos] = useState([]);
  const [userFavVideos,setUserFavVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoader,setDeleteLoader] = useState(false);
  const [deletedVideo,setDeletedVideo] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const getVideos = async () => {
      try {
        await axios
          .get(`http://localhost:8080/profile/getVideos`, {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
            },
          })
          .then((response) => {
            console.log(response.data);
            setUserHighlightedVideos(response.data);
          });

          await axios
              .get("http://localhost:8080/profile/getFavVideos", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: JSON.parse(localStorage.getItem("vh_user"))
                    .token,
                },
              }).then(res => {
                setUserFavVideos(res.data);
                console.log(userFavVideos);
              });

              setIsLoading(false); 

      } catch (error) {
        console.log(error);
      }
    };

    getVideos();
  }, []);

  const handleDeleteVideo = async (videoid) => {
    setDeleteLoader(true)
    try {
      await axios.delete(`http://localhost:8080/profile/deleteHighlight`, {
        data: { videoId: videoid },
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
        },
      }).then(res => console.log(res));
      const updated = userHighlightedVideos.filter((video) => video._id !== videoid);
      setDeleteLoader(false);
      setUserHighlightedVideos(updated); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFavVideo = async (videoid) => {
    setDeleteLoader(true);
    setDeletedVideo(videoid);
    //console.log(vid)
      try{await axios.delete('http://localhost:8080/profile/removeFromFav' ,
      {
        data: { videoId: videoid },
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("vh_user")).token,
        },
      }).then(res => console.log(res))
      const updated = userFavVideos.filter((video) => video._id !== videoid);
      setDeleteLoader(false);
      setUserFavVideos(updated);
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className="profile-page">
      <div className="main-cont">
        <div className="profile-data d-flex">
          <img
            className="profile-img"
            src={`data:${logUser.pic.image.contentType};base64,${enc}`}
          />

          <div className="name-data mt-4">
            <p className="profileName">{`${logUser.firstName} ${logUser.lastName}`}</p>

            <div className="stat-data">
              <div className="highlighted d-flex gap-2 fw-bold">
                {isLoading?<ThreeDots
                          height="15"
                          width="15"
                          radius="12"
                          color="white"
                          ariaLabel="loading"
                          wrapperStyle
                          wrapperClass
                   />:<p>{userHighlightedVideos.length}</p>}
                <p>Highlighted</p>
              </div>

              <div className="fav d-flex gap-2 fw-bold">
                {isLoading?<ThreeDots
                          height="15"
                          width="15"
                          radius="12"
                          color="white"
                          ariaLabel="loading"
                          wrapperStyle
                          wrapperClass
                   />:<p>{userFavVideos.length}</p>}
                <p>Favourites</p>
              </div>
            </div>

            <button className="py-2 px-4 rounded">
              <Link to="/edit" className="editLink">Edit Profile</Link>
            </button>
          </div>
        </div>
        <hr
          className="hrr"
          style={{
            color: "#fff",
            height: "1",
            margin: "auto",
            width: "80%",
          }}
        />
        <div className="mobile-data">
          <div className="highlighted d-flex flex-column align-items-center fw-bold">
            <p>4</p>
            <p>Highlighted</p>
          </div>

          <div className="fav d-flex flex-column align-items-center fw-bold">
            <p>2</p>
            <p>Favourites</p>
          </div>
        </div>
      </div>

      <hr
        style={{
          color: "#fff",
          height: "1",
          margin: "auto",
          width: "80%",
        }}
      />

      <div className="vedio-states mt-2 d-flex gap-5">
        <div
          className={
            activeClass === "left" ? "active d-flex gap-2" : "d-flex gap-2"
          }
          onClick={() => setActiveClass("left")}
        >
          <MdOutlineVideoLibrary size={27} />
          <p>Highlighted</p>
        </div>

        <div
          className={
            activeClass === "right" ? "active d-flex gap-2" : "d-flex gap-2"
          }
          onClick={() => setActiveClass("right")}
        >
          <MdOutlineFavorite size={27} />
          <p>Favourites</p>
        </div>
      </div>

      <div className="vedio-div">
        {activeClass === "left" ? (
          <div className="vedio-cont">
            {isLoading ? (
              <LoaderBall message={"loading highlighted videos"} />
            ) : userHighlightedVideos.length?(
              userHighlightedVideos.map((vod) => (
                <div className="vedio-card" key={vod._id}>
                  <video src={vod.highlightUrl} controls>
                    {" "}
                  </video>
                  <div
                    className="d-flex w-100 mt-2"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip placement="bottom" id={vod._id}>
                          {vod.title}
                        </Tooltip>
                      }
                    >
                      <p className="paragraph-text">{vod.title}</p>
                    </OverlayTrigger>
                    <div className="d-flex align-items-center">
                      {
                        id == 1 && !deleteLoader?<MdDelete
                        className="del"
                        onClick={() => handleDeleteVideo(vod._id)}
                      /> : <ThreeDots
                              height="15"
                              width="15"
                              radius="12"
                              color="white"
                              ariaLabel="loading"
                              wrapperStyle
                              wrapperClass
                           /> 
                      }

                        <a download="" href={vod.highlightUrl}>
                          <AiOutlineArrowDown style={{color:'white' , marginLeft:'0.5rem' ,cursor:'pointer'}}/>
                        </a>
                    </div>
                    
                  </div>
                </div>
              ))
            ):<p style={{color:'white' , fontSize:'1.2rem'}} className='mt-5'>Nothing to show</p>}
          </div>
        ) : (
          <div className="vedio-cont">
            {isLoading ? (
              <LoaderBall message={"loading Favorite videos"} />
            ) : userFavVideos.length?(
              userFavVideos.map((vod) => (
                <div className="vedio-card" key={vod._id}>
                  <video src={vod.highlightUrl} controls>
                    {" "}
                  </video>
                  <div
                    className="d-flex w-100 mt-2"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip placement="bottom" id={vod._id}>
                          {vod.title}
                        </Tooltip>
                      }
                    >
                      <p className="paragraph-text">{vod.title}</p>
                    </OverlayTrigger>
                    <div className="d-flex align-items-center">
                    {
                        id == 1 && !deleteLoader?<MdDelete
                        className="del"
                        onClick={() => handleDeleteFavVideo(vod._id)}
                      /> : vod._id === deletedVideo? <ThreeDots
                              height="15"
                              width="15"
                              radius="12"
                              color="white"
                              ariaLabel="loading"
                              wrapperStyle
                              wrapperClass
                           /> : <MdDelete
                           className="del"
                           onClick={() => handleDeleteFavVideo(vod._id)}
                         /> 
                      }
                        <a download="" href={vod.highlightUrl}>
                          <AiOutlineArrowDown style={{color:'white' , marginLeft:'0.5rem' ,cursor:'pointer'}}/>
                        </a>
                    </div>
                    
                  </div>
                </div>
              ))
            ):<p style={{color:'white' , fontSize:'1.2rem'}} className='mt-5'>Nothing to show</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
