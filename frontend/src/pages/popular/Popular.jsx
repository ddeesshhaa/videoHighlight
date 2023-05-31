import React,{useState , useEffect} from 'react';
import axios from 'axios';
import vod1 from '../../assests/2015-02-21 - 18-00 Chelsea 1 - 1 Burnleyc1.mkv';
import vod2 from '../../assests/2015-02-21 - 18-00 Crystal Palace 1 - 2 Arsenalc1.mkv';
import vod3 from '../../assests/2015-05-17 - 18-00 Manchester United 1 - 1 Arsenalg6.mkv';
import vod4 from '../../assests/2015-02-21 - 18-00 Swansea 2 - 1 Manchester Unitedg2.mkv';

import { DribbbleShot } from '../../components';
import {BiTrendingUp , BiFootball} from 'react-icons/bi';


import './popular.css'


const Popular = () => {

  const[popularVideos,setPopularVideos] = useState([]);

  useEffect(() => {
     const getPopularData = async () => {
      try{
        let voood = await axios.get(
          'http://localhost:8080/videos/all'
        );
        let ww = await voood.data;
        //console.log(ww);
        const updatedVideos = await ww.map(video => {
          return {
            ...video,
            isFavourite: 'false'
          };
        });
        console.log(updatedVideos)
        setPopularVideos(updatedVideos);
        //console.log(popularVideos);
    }catch(err){
      console.log(err);
    }
    }

    getPopularData();
    
  },[]);

  useEffect(() => {
    console.log(popularVideos);
  }, [popularVideos]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Video 1',
      url: vod1,
      isFavourite: false,
    },
    {
      id: 2,
      title: 'Video 2',
      url: vod2,
      isFavourite: false,
    },
    {
      id: 3,
      title: 'Video 3',
      url: vod3,
      isFavourite: false,
    },
    {
      id: 4,
      title: 'Video 4',
      url: vod4,
      isFavourite: false,
    },
  ]);

  const handleAddToFavourites = (id) => {
    const updatedVideos2 = popularVideos.map((video) => {
      if (video._id === id) {
        return { ...video, isFavourite: !(video.isFavourite) };
      } else {
        return video;
      }
    });
    console.log(updatedVideos2);
    setPopularVideos(updatedVideos2);
  };


  return (
    <div className='poular-page' style={{color:'white'}}>

      <div className="main-header-cont">
        <h1 className='main-header'>Popular Now</h1>
        <BiTrendingUp style={{width:'2rem' , height:'2rem'}}/>
      </div>
      

      <div className="sports-cont">
       
        <div className="sport-cont">
            
            <div className="vedio-cont">

                {popularVideos.map((video) => (
                  <div className="veedio-card">
                      <video src={video.highlightUrl} controls> </video>
                      <p style={{maxWidth:'50'}}>{video.title}</p>
                      <button className={video.isFavourite?'btnn-primary':'btnn-danger'} 
                      onClick={() => handleAddToFavourites(video._id)}>
                          {video.isFavourite ?'Add to Favourites':'Remove from Favourites'}
                    </button>
                  </div>
                ))}
            </div>
            
        </div>

        
        
      </div>
    </div>
  )
}

export default Popular
