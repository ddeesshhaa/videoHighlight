import React from 'react';
import { VedioInput,Advantges } from '../../components';

import tenn from '../../assests/tennnis.jpeg';
import basket from '../../assests/basketball.jpeg';
import messi from '../../assests/messi.jpeg';
import reels from '../../assests/video-reelz.mp4';

import './home.css';

const Home = ({pic}) => {
  return (
    <div className='vedio-highlight-home'>
      {
          pic === 'football'?
            ( <img src={messi} className='header-img'></img> )
            :pic === 'basketball'?(<img src={basket} className='header-img'></img>):
            (<img src={tenn} className='header-img'></img>)
        }
      <Advantges />
      <video src={reels} className='video' autoPlay muted loop style={{marginTop:'10rem' , width:'100%'}}> </video>
      <VedioInput/>
    </div>
  )
}

export default Home
