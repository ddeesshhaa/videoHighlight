import React,{useEffect} from 'react';
import { VedioInput,Advantges,MyFooter } from '../../components';
import { HashLink } from 'react-router-hash-link';

import 'aos/dist/aos.css';
import AOS from 'aos';


/* import coverPhoto from '../../assests/pexels-jeshootscom-1201996.jpg';
import coverPhoto2 from '../../assests/pexels-serkan-göktay-94953.jpg'; */
import coverPhoto3 from '../../assests/headerr.jpg';
import reels from '../../assests/video-reelz.mp4';


import './home.css';

const Home = () => {

  useEffect(() => {
    AOS.init({
      duration: 750,
      offset: 100,
    });
  }, []);

  return (
    <div className='vedio-highlight-home'>
      <header className='cover-pic' style={{
        backgroundImage: `url(${coverPhoto3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '48rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width:'100%',
        alignItems: 'center'
      }}>
        <h1 className='header-text' style={{ color: '#fff', textAlign: 'center' }}>Highlight Your football</h1>
        <h1 className='header-text' style={{ color: '#fff', textAlign: 'center' }}>Match</h1>
        <HashLink to='/#gene'><button className='header-btn' style={{ backgroundColor: '#6aac28', padding: '0.75rem 1.5rem', borderRadius: '5px', border: 'none', fontSize: '1.2rem' }}>
          Start Now
        </button></HashLink>
        
      </header>
      <Advantges />
      <video src={reels} className='video' autoPlay muted loop style={{marginTop:'10rem' , width:'100%'}}
        data-aos="fade-up"> 
      </video>
      <VedioInput/>
      <MyFooter />
    </div>
  )
}

export default Home
