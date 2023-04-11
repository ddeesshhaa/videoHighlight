import React, { useState } from 'react';

import jenn from '../../assests/jinn.jpg';
import {MdOutlineVideoLibrary , MdOutlineFavorite} from 'react-icons/md';

import vod2 from '../../assests/2015-02-21 - 18-00 Crystal Palace 1 - 2 Arsenalc1.mkv';
import vod3 from '../../assests/2015-05-17 - 18-00 Manchester United 1 - 1 Arsenalg6.mkv';
import vod4 from '../../assests/2015-02-21 - 18-00 Swansea 2 - 1 Manchester Unitedg2.mkv';

import './profile.css';

const Profile = () => {

  const[activeClass,setActiveClass] = useState('left');

  return (
    <div className='profile-page'>

      <div className="main-cont">
        <div className="profile-data d-flex">
            <img src={jenn} alt="" className='profile-img'/>

            <div className="name-data mt-4">
                <p className='profileName'>Jennifer connely</p> 

                <div className="stat-data">
                  <div className="highlighted d-flex gap-2 fw-bold">
                    <p>4</p>
                    <p>Highlighted</p>
                  </div>

                  <div className="fav d-flex gap-2 fw-bold">
                    <p>2</p>
                    <p>Favourites</p>
                  </div>
                </div>
                

                <button className='py-2 px-4 rounded'>Edit Profile</button>
            </div>
        </div>
        <hr className='hrr'
        style={{
            color: '#fff',
            height: '1',
            margin:'auto',
            width:'80%'
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
            color: '#fff',
            height: '1',
            margin:'auto',
            width:'80%'
        }}
    />

    <div className="vedio-states mt-2 d-flex gap-5">
      <div className={activeClass === 'left'? "active d-flex gap-2" : "d-flex gap-2"} 
            onClick={() => setActiveClass('left')}>
        <MdOutlineVideoLibrary size={27} />
        <p>Highlighted</p>
      </div>

      <div className={activeClass === 'right'? "active d-flex gap-2" : "d-flex gap-2"} 
            onClick={() => setActiveClass('right')}>
        <MdOutlineFavorite size={27} />
        <p>Favourites</p>
      </div>
      
    </div>

    <div className="vedio-div">
        {activeClass === 'left' ? 
        <div className='vedio-cont'>
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
        </div> : 
        <div className='vedio-cont'>
          <div className="vedio-card">
                    <video src={vod3} controls> </video>
                    <p>Manchester United 1 - 1 Arsenal</p>
                </div>

                <div className="vedio-card">
                    <video src={vod4} controls> </video>
                    <p>Swansea 2 - 1 Manchester United</p>
                </div>
          </div>} 
    </div>
      
    </div>
  )
}

export default Profile

