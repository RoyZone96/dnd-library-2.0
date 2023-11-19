
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useState} from 'react'
import Landing from './routes/landing.js';
import searchPage from './routes/searchpage.js';
import TopNav from './components/topnav.js';
import './App.css';
import SearchPage from './routes/searchPage.js';
import SearchNav from './routes/searchNav.js';
import TopNav from './routes/topNav.js';

function App() {
  return(
    <div>
      <BrowserRouter>
      <main>
        <TopNav />
        <Routes>
          <Route exact path='/' Component={Landing}/>
        </Routes>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
