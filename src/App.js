
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './routes/landing.js';
import './App.css';
import SearchNav from './components/searchnav.js';
import TopNav from './components/topnav.js';
import SearchPage from './routes/searchpage.js'; 
import RacePage from './components/pages/racepage.js';
import BackgroundPage from './components/pages/BackgroundPage.js';
import ClassPage from './components/pages/classPage.js'
import SpellsPage from './components/pages/spellsPage.js';


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
          <Route exact path="/searchRace" Component={RacePage}/>
          <Route exact path="/searchBackground" Component={BackgroundPage} />
          <Route exact path='/searchClass' Component={ClassPage} />
          <Route exact path="/searchSpells" Component={SpellsPage} />
        </Routes>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
