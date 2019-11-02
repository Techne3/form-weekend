import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './App.css';

import Navbar from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'
import axios from 'axios'


axios.defaults.baseURL= "https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev"

function App() {
  return (
  <Router>
    <Navbar />  
      <div className="container">
        <Route  exact path="/" component={Home} />
        <Route  exact path="/about" component={About} />
      </div>
  </Router>
  );
}

export default App;
