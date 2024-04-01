
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './routes/landing.js';
import './App.css';
import SearchNav from './components/searchnav.js';
import TopNav from './components/topnav.js';
import SearchPage from './routes/searchpage.js'; 
import RacePage from './components/racepage.js';
import BackgroundPage from './components/BackgroundPage.js';

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
        </Routes>
      </main>
      </BrowserRouter>
  </div>
  ) 
  
}

export default App;
