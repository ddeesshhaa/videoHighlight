import React,{useState} from "react";
import { Footer, Header } from "./components";
import {Login ,SignUP,Home, Profile , Popular} from './pages'
import { Route , Routes } from 'react-router-dom';
import {FaArrowCircleUp} from 'react-icons/fa';

import './App.css';

function App() {

  const [showScroll, setShowScroll] = useState(false);
  const[test,setTest] = useState("noo");
 
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 100){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop);

  const[pic,setPic] = useState('football');

  const handleSport = (sport) => {
    setPic(sport);
    console.log(pic);
  }

  //console.log(localStorage.getItem('data'));
  return (
    <div className="App">

      <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>
      <Header handleSport={handleSport} test={test}/>

      <Routes>
          <Route exact path="/" element={<Home pic={pic} />}/>
          <Route  path="/login"  element={<Login test={test} setTest={setTest}/>}/>
          <Route  path="/signup"  element={<SignUP />}/>
          <Route  path="/profile/:id"  element={<Profile test = {test}/>}/>
          <Route  path="/popular"  element={<Popular />}/>
      </Routes>

    {/* <Footer /> */}
    </div>
  );
}

export default App;
