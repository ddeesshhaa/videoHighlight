import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import {MdCloudUpload , MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

import sports from '../../assests/sports2.jpg';

import './input.css';

const VedioInput = () => {

  const {user} = useAuthContext();
  const inputRef = React.useRef();
  const navigate = useNavigate();

  const[vedio,setVedio] = useState();
  const[fileName,setFileName] = useState("No selected file");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    //const url = URL.createObjectURL(file);
    setVedio(file);
    setFileName(file.name);
  };

  const handleDelete = () => {
    setFileName("No selected file");
    setVedio(null);
  }

  const styles = {
    header: {
      backgroundImage: `url(${sports})`,
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
      console.log(JSON.parse(localStorage.getItem('vh_user')).token);
  }

  return (
    <div className="vedio-highlight-input" style={styles.header}>
      <h1 className='input-main-header'>Highlight your match now</h1>
      <div id='gene'>
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
          src={vedio}
        />:<>
            <MdCloudUpload color='#6aac28' size={60}/>
            <p style={{fontWeight:'bold'}}>Upload The Match</p>
        </>}
      </form>
      
      <div className='data-div'>
        {/* <AiFillFileImage color='#1ca117'/>
        <span className='span'>
            {fileName}
            <MdDelete onClick={() => handleDelete()} style={{cursor:'pointer'}}/>
        </span> */}
        <button type="button" className="btn" onClick={(e) => genVideo(e)} disabled={!vedio}>
          Generate
          </button>
      </div>
      
    </div>
    </div>
    
  )
}

export default VedioInput
