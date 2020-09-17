import React from 'react';
import './Home.css';


const Home = (props) => {
    return(
        <>
        <div className="root">
        <h1>HackIllinois</h1>

        <div className="below">
          
          <div className="about">
            <div className="aboutH">About</div>
            
          <div style={{fontSize: '50px', textAlign: 'center', paddingTop: '11%'}}>A Look to the Future</div>
         
          <div className="vision"></div>
          <p></p>
          </div>
          <div className="image">
          </div>
        </div>
      </div>
      </>
    )
};

export default Home;