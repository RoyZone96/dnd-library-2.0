import React, {useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './routes/landing.js';
import SearchPage from './routes/searchpage.js';
import TopNav from './components/topnav.js';
import './App.css';



function App() {
  return(
    <div>
      <BrowserRouter>
      <main>
        <TopNav />
        <Routes>
          <Route exact path='/' Component={Landing}/>
          <Route path='searches/' Component={SearchPage}/>
        </Routes>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
