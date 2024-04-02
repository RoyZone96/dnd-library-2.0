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
          <NavLink>SPELLS</NavLink>
        </li>
        <li>
            <NavLink>FEATS</NavLink>
        </li>
        <li>
          <NavLink>MAGIC ITEMS</NavLink>
        </li>
        <li>
            <NavLink>MONSTERS</NavLink>
        </li>
      </ul>
    </div>
  );
}
