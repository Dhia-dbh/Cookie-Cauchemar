import React, { useEffect, useState } from 'react';
import podcast1 from "./assets/PODCAST-AUDIO-Florian Sévellec.m4a"
import podcast2 from "./assets/PODCAST-AUDIO-Frédéric Le Moigne.m4a"

const Podcast = () => {


  return (
    <div >
    <div className="container" style={{display:'flex' }} >
    <div className="card"style={{margin:'2rem' }} >
        <div className="card-title">
        <h1 >Podcast Florian Sévellec : </h1>
        </div>
        <div className="card-body">
        <audio controls>    
            <source src={podcast1} type="audio/mp4" />
            Your browser does not support the audio element.
        </audio>
        </div>
      </div>
      <div className="card"style={{margin:'2rem' }} >
        <div className="card-title">
        <h1 >Podcast Frédéric Le Moigne: </h1>
        </div>
        <div className="card-body">
        <audio controls>    
            <source src={podcast2} type="audio/mp4" />
            Your browser does not support the audio element.
        </audio>
        </div>
      </div>
    </div>
 

    </div>
  );
};

export default Podcast;

// Usage Example:
// <DescriptionCard text="Click anywhere to move me!" initialX={100} initialY={100} />
