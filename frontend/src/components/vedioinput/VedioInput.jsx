import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';

import {Row , Col} from 'react-bootstrap';

import {MdCloudUpload , MdDelete} from 'react-icons/md';
//import {AiFillFileImage} from 'react-icons/ai';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

import { ProgressBar } from 'react-bootstrap';

import LoaderBall from '../loader/LoaderBall';

import 'aos/dist/aos.css';
import AOS from 'aos';

import './input.css';

const VedioInput = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 300,
    });
  }, []);

  const {user} = useAuthContext();
  const inputRef = React.useRef();
  const navigate = useNavigate();

  const[vedio,setVedio] = useState();
  const[filevideo,setFileVideo] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const[isLoading,setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setFileVideo(url);
    setVedio(file);

    const formData = new FormData();
    formData.append('video', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    });

    xhr.open('POST', '/upload-video');
    xhr.send(formData);
  };


  const styles = {
    header: {
      /* backgroundImage: `url(${sports})`, */
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
  }

  const handleClick = () => {
    if(user)
      inputRef.current.click();
    else
      navigate('/login');
  }

  const genVideo = async (e) => {
    console.log(vedio);
    e.preventDefault();
    setIsLoading(true);
    try{
      const res = await axios.post(
        "http://localhost:8080/upload",
      {
        video:vedio
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization" : JSON.parse(localStorage.getItem('vh_user')).token
        },
      }
      )
      //console.log(JSON.parse(localStorage.getItem('vh_user')).token);

      const vood = await res;
      console.log('This is video  '+vood);
    }catch(err){
      console.log(err);
    }
      
  }

  return (
    <Row  style={{margin:'10rem 0 5rem'}} >

      <Col style={{backgroundColor:'#161616' , padding:'3rem 10rem' , borderRadius:'1rem' }} data-aos='fade-up'>
      <h1 className='input-main-header'>Highlight your match now</h1>
      {!isLoading?<div id='gene'>
      <form action="" className='input-form' onClick={() => handleClick()}>

        <input type="file" 
               accept=".mkv,.mp4"
               ref={inputRef}
               hidden
               onChange={handleFileChange}
               name='video'
        />


        {vedio?<video
          className="VideoInput_video"
          width={600}
          height={305}
          controls
          src={filevideo}
        />:<>
            <MdCloudUpload color='#6aac28' size={60}/>
            <p style={{fontWeight:'bold'}}>Upload The Match</p>
        </>} 

      </form>

    <div style={{marginTop:'1rem !important'}}>
      {vedio && uploadProgress < 100 && <ProgressBar animated now={uploadProgress} label={`${Math.trunc(uploadProgress)}%`} 
      color='#6aac28 !important' /> }
    </div>
    
      
      <div className='data-div'>
        
        <button type="button" className="btn" onClick={(e) => genVideo(e)} disabled={!vedio}>
           Highlight Now
         </button>
      </div>
      
    </div>:
      <LoaderBall message={"It will take few minutes"}/>
    }
      </Col>
       
    </Row>
  )
}

export default VedioInput
