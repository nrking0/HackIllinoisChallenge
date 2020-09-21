import React from 'react';
import './App.css';
import classes from './App.css';
import Calendar from './Components/Calendar/Calendar.js';
import Home from './Components/Home/Home.js';
import Navbar from './Components/Navbar/Navbar.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
    <Router>
      <Navbar />
      <Switch>
        <div className={classes.root}>
          <Route exact path="/"><Home /></Route>
          <Route path="/schedule"><Calendar /></Route>
        </div>
      </Switch>
    </Router>
    </div>
    
  );
}

export default App;
