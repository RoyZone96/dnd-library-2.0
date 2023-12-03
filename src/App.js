
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './routes/landing.js';
import './App.css';
import SearchNav from './components/searchnav.js';
import TopNav from './components/topnav.js';
import SearchPage from './routes/searchpage.js'; 
import RacePage from './components/racepage.js';

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
          <Route exact path="/searchRace" Component={RacePage}/>
        </Routes>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
