import React , {useState} from 'react';
import vod1 from '../../assests/2015-02-21 - 18-00 Chelsea 1 - 1 Burnleyc1.mkv';
import vod2 from '../../assests/2015-02-21 - 18-00 Crystal Palace 1 - 2 Arsenalc1.mkv';
import vod3 from '../../assests/2015-05-17 - 18-00 Manchester United 1 - 1 Arsenalg6.mkv';
import vod4 from '../../assests/2015-02-21 - 18-00 Swansea 2 - 1 Manchester Unitedg2.mkv';

import {BiTrendingUp} from 'react-icons/bi';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import './popular.css'

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
      
      {/* <Row  style={{display:'flex', justifyContent:'space-evenly'}}>
        {videos.map((video) => (
          <Col key={video.id} className="mb-4" style={{width:'20rem'}}>
            <Card>
              <Card.Body>
                
                <video src={video.url} controls className="mb-3" style={{width:'100%'}}/>
                <Card.Title style={{color:'#000'}}>{video.title}</Card.Title>
                <button className=''>
                  Love
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}
    </div>
  )
}

export default Popular
