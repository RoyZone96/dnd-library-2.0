
import {BrowserRouter, Route, Switch} from 'react-router'
import React, {useState} from 'react'
import Landing from './routes/landing.js';
import './App.css';

function App() {
  return(
    <div>
      <BrowserRouter>
      <main>
        <Switch>
          <Route exact path='/' Component={Landing}/>
        </Switch>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
