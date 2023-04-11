import React from 'react';
import vod1 from '../../assests/2015-02-21 - 18-00 Chelsea 1 - 1 Burnleyc1.mkv';
import vod2 from '../../assests/2015-02-21 - 18-00 Crystal Palace 1 - 2 Arsenalc1.mkv';
import vod3 from '../../assests/2015-05-17 - 18-00 Manchester United 1 - 1 Arsenalg6.mkv';
import vod4 from '../../assests/2015-02-21 - 18-00 Swansea 2 - 1 Manchester Unitedg2.mkv';
import vod5 from '../../assests/tennis1.mp4';

import {BiTrendingUp , BiFootball} from 'react-icons/bi';


import './popular.css'

const Popular = () => {
  return (
    <div className='poular-page' style={{color:'white'}}>

      <div className="main-header-cont">
        <h1 className='main-header'>Popular Now</h1>
        <BiTrendingUp style={{width:'2rem' , height:'2rem'}}/>
      </div>
      

      <div className="sports-cont">
       
        <div className="sport-cont">
            <div className="name-sport">
              <h2>Football</h2>
              <BiFootball style={{width:'2rem' , height:'2rem'}}/>
            </div>
            
            <div className="vedio-cont">
                <div className="vedio-card">
                    <video src={vod1} controls> </video>
                    <p>Chelsea 1 - 1 Burnley</p>
                </div>

                <div className="vedio-card">
                    <video src={vod2} controls> </video>
                    <p>Crystal Palace 1 - 2 Arsenal</p>
                </div>

                <div className="vedio-card">
                    <video src={vod3} controls> </video>
                    <p>Manchester United 1 - 1 Arsenal</p>
                </div>

                <div className="vedio-card">
                    <video src={vod4} controls> </video>
                    <p>Swansea 2 - 1 Manchester United</p>
                </div>
            </div>
            
        </div>

        {/* <div className="sport-cont">
            <h2>Tennis</h2>
            <div className="vedio-card">
                <video src={vod5} controls> </video>
                <p>Fedrer vs Nadal</p>
            </div>
        </div> */}
        
      </div>
    </div>
  )
}

export default Popular
