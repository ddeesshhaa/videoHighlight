import React,{useEffect} from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import 'aos/dist/aos.css';
import AOS from 'aos';


import saveTime from '../../assests/pexels-jordan-benton-1095602.jpg';

import './adv.css';

const Advantges = () => {

  useEffect(() => {
    AOS.init({
      duration: 750,
      offset: 200,
    });
  }, []);


  return (
    <div className='vedio-highlight-adv section__padding' data-aos="fade-up">

        <Row xs={1} sm={3} md={4} className="g-4" data-aos="fade-up" style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
        <Col  style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
          <Card data-aos="flip-right" >
            <Card.Img variant="top" src={saveTime} />
            <Card.Body>
              <Card.Title>Save Time</Card.Title>
              <Card.Text>
                Save your time and watch the highlighted video.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
          <Card data-aos="flip-right">
            <Card.Img variant="top" src={saveTime} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
          <Card data-aos="flip-right">
            <Card.Img variant="top" src={saveTime} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col style={{display:'flex' , alignItems:'center',justifyContent:'center'}}>
          <Card data-aos="flip-right">
            <Card.Img variant="top" src={saveTime} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        </Row>
      
    </div>
  )
}

export default Advantges;
