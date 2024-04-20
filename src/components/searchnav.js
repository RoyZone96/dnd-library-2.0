import React from "react";
import { NavLink } from "react-router-dom";

export default function SearchNav() {
  return (
    <div className="searchNav">
      <ul className="menu">
        <li>
          <NavLink className="menu-item"  to="/searchRace">RACES</NavLink>
        </li>
        <li>
            <NavLink className="menu-item" to="/searchBackground">BACKGROUNDS</NavLink>
        </li>
        <li>
          <NavLink className="menu-item" to="/searchClass">CLASSES</NavLink>
        </li>
        <li>
          <NavLink className="menu-item" to="/searchSpells">SPELLS</NavLink>
        </li>
        <li>
            <NavLink className="menu-item" to="/searchMonsters">MONSTERS</NavLink>
        </li>
        <li>
            <NavLink className="menu-item" to="/searchFeats">FEATS</NavLink>
        </li>
        <li>
          <NavLink className="menu-item" to="/searchMagicItems">MAGIC ITEMS</NavLink>
        </li>
        
      </ul>
    </div>
  );
}
