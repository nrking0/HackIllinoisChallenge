import React from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Home = (props) => {
  return (
    <>
      <div className="root">
        <h1>Welcome to HackThis!</h1>
        <div className="makeBig">
          <ExpandMoreIcon fontSize="large" className="arrow" color="secondary" />
        </div>
        <div className="below">
          <div className="about">
            <div className="aboutH">About</div>
            <div className="aboutP">This is my React Project for the HackIllinois Systems Front-End Challenge. I have utilized the HackIllinois API to have a schedule prepared with all the listed events. You can reach the schedule using the NavBar, or just with the link below. Enjoy!</div>
            <Button className="button" variant="contained" color="primary" href="/schedule">View Schedule</Button>
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;