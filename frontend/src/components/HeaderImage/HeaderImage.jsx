import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import coverPhoto from '../../assests/design2.jpg';

const HeaderImage = () => {
  return (
    <div className='myHeader d-flex w-full'>
        <div className="left-header">
            <h1>Highlight your favorite match now</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <button>start now</button>
        </div>
        <div className="right-header">
            <img src={coverPhoto} alt="" />
        </div>
    </div>  
  )
}

export default HeaderImage
