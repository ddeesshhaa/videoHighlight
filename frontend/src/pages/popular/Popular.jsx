import React,{useState} from 'react';
import vod1 from '../../assests/2015-02-21 - 18-00 Chelsea 1 - 1 Burnleyc1.mkv';
import vod2 from '../../assests/2015-02-21 - 18-00 Crystal Palace 1 - 2 Arsenalc1.mkv';
import vod3 from '../../assests/2015-05-17 - 18-00 Manchester United 1 - 1 Arsenalg6.mkv';
import vod4 from '../../assests/2015-02-21 - 18-00 Swansea 2 - 1 Manchester Unitedg2.mkv';

import { DribbbleShot } from '../../components';
import {BiTrendingUp , BiFootball} from 'react-icons/bi';


import './popular.css'
import { Button } from 'bootstrap';

const Popular = () => {

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
    const updatedVideos = videos.map((video) => {
      if (video.id === id) {
        return { ...video, isFavourite: !video.isFavourite };
      } else {
        return video;
      }
    });
    setVideos(updatedVideos);
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

                {videos.map((video) => (
                  <div className="veedio-card">
                      <video src={video.url} controls> </video>
                      <p>{video.title}</p>
                      <button className={video.isFavourite?'btnn-danger':'btnn-primary'} 
                      onClick={() => handleAddToFavourites(video.id)}>
                          {video.isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
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
