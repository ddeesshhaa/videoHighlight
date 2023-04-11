import React from 'react';

import saveTime from '../../assests/save-time.svg';
import hea from '../../assests/hearts.png';
import './adv.css';

const Advantges = () => {
  return (
    <div className='vedio-highlight-adv section__padding'>
        <div className="row cards-cont">
        <div className="adv-card col">
            <img src={saveTime} alt="" />
            <p>Save editing time, highlights videos are created automatically for you.</p>
        </div>

        <div className="adv-card col">
            <img src={hea} alt="" />
            <p>Attract more viewers by sharing content after or during your stream.</p>
        </div>

        <div className="adv-card col">
            <img src={saveTime} alt="" />
            <p>Save editing time, highlights videos are created automatically for you.</p>
        </div>
        </div>
      
    </div>
  )
}

export default Advantges;
