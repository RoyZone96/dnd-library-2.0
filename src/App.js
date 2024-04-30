import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/landing.js";
import "./App.css";
import "./fonts/SquareCaps.ttf";
import SearchNav from "./components/searchnav.js";
import TopNav from "./components/topnav.js";
import SearchPage from "./routes/searchpage.js";
import RacePage from "./components/pages/racepage.js";
import BackgroundPage from "./components/pages/BackgroundPage.js";
import ClassPage from "./components/pages/classPage.js";
import SpellsPage from "./components/pages/spellsPage.js";
import MonstersPage from "./components/pages/monstersPage.js";
import FeatsPage from "./components/pages/featsPage.js";
import MagicItemsPage from "./components/pages/magicItemPage.js";
import UserList from "./routes/userList.js";
function App() {
  return (
    <div id="background-img" alt="magical library">
      <div className="general-app">
        <BrowserRouter>
          <main>
            <TopNav />
            <Routes>
              <Route exact path="/" Component={Landing} />
              <Route exact path="/searchPage" Component={SearchPage} />
              <Route exact path="/searchNav" Component={SearchNav} />
              <Route exact path="/searchRace" Component={RacePage} />
              <Route exact path="/users" Component={UserList} />
              <Route
                exact
                path="/searchBackground"
                Component={BackgroundPage}
              />
              <Route exact path="/searchClass" Component={ClassPage} />
              <Route exact path="/searchSpells" Component={SpellsPage} />
              <Route exact path="/searchMonsters" Component={MonstersPage} />
              <Route exact path="/searchFeats" Component={FeatsPage} />
              <Route
                exact
                path="/searchMagicItems"
                Component={MagicItemsPage}
              />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
