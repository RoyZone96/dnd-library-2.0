import React from "react";
import { NavLink } from "react-router-dom";

export default function SearchNav() {
  return (
    <div className="searchNav">
      <ul className="menu">
        <li>
          <NavLink to="/searchRace">RACES</NavLink>
        </li>
        <li>
            <NavLink to="/searchBackground">BACKGROUNDS</NavLink>
        </li>
        <li>
          <NavLink to="/searchClass">CLASSES</NavLink>
        </li>
        <li>
          <NavLink to="/searchSpells">SPELLS</NavLink>
        </li>
        <li>
            <NavLink to="/searchMonsters">MONSTERS</NavLink>
        </li>
        <li>
            <NavLink to="/searchFeats">FEATS</NavLink>
        </li>
        <li>
          <NavLink to="/searchMagicItems">MAGIC ITEMS</NavLink>
        </li>
        
      </ul>
    </div>
  );
}
