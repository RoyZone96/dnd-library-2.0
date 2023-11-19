
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useState} from 'react'
import Landing from './routes/landing.js';
import './App.css';

function App() {
  return(
    <div>
      <BrowserRouter>
      <main>
        <Routes>
          <Route exact path='/' Component={Landing}/>
        </Routes>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
