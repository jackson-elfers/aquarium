import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';


function Fish() {
    const [style, setStyle] = useState({
        position: "absolute",
        top: "0px",
        left: "0px"
    });
    const step = 1;
    var top = useRef(0);
    var left = useRef(0);
    var vectors = useRef([false, false, false, false]);
    
    var width = window.innerWidth;
    var height = window.innerHeight;
    
  async function upStep() {
       top.current -= step;
       setStyle((style) => { return {...style, top: `${ top.current }px`} });
  }
  
  async function downStep() {
       top.current += step;
       setStyle((style) => { return {...style, top: `${ top.current }px`} });
  }
  
  async function leftStep() {
       left.current -= step;
       setStyle((style) => { return {...style, left: `${ left.current }px`} });
  }
  
  async function rightStep() {
       left.current += step;
       setStyle((style) => { return {...style, left: `${ left.current }px`} });
  }
  
  function collision(data) {
        if(data == "up" && top.current == 0) {
            return true;
        }
        else if(data == "down" && top.current == height) {
            return true;
        }
        else if(data == "left" && left.current == 0) {
            return true;
        }
        else if(data == "right" && left.current == width) {
            return true;
        }
        return false;
  }
  
  async function direction() {
      if(vectors.current[0] && !collision("up")) {
        upStep();
      }
      if(vectors.current[1] && !collision("down")) {
        downStep();
      }
      if(vectors.current[2] && !collision("left")) {
        leftStep();    
      }
      if(vectors.current[3] && !collision("right")) {
        rightStep();    
      }
  }
  
  async function adjustVector() {
      const index = Math.floor(Math.random() * vectors.current.length);
      vectors.current[index] = vectors.current[index] ? false : true;
  }
    
  async function motion() {
        setInterval(() => { direction(); }, 25);
        setInterval(() => { adjustVector(); }, 1000);
        console.log(width);
        console.log(height);
  }
    
  useEffect(() => {
    motion();
  }, []);
    
    return (
    <div>
     <img style = {style} src = {"./fish.png"}/>
    </div>
    );
}

function App() {
  return (
    <div>
      <Fish/>
    </div>
  );
}

export default App;
