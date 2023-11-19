
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useState} from 'react'
import Landing from './routes/landing.js';
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
          <Route exact path='/searchPage' Component={SearchPage}/>
          <Route exact path='/searchNav' Component={SearchNav}/>
          <Route exact path='/topNav' Component={TopNav}/>
        </Routes>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
