import React, { useState } from "react";


export default function SearchNav() {
  return (
    <div className="searchNav">
      <ul className="menu">
        <li>
          <p>RACES</p>
        </li>
        <li>
            <p>BACKGROUNDS</p>
        </li>
        <li>
          <p>CLASSES</p>
        </li>
        <li>
          <p>SPELLS</p>
        </li>
        <li>
            <p>FEATS</p>
        </li>
        <li>
          <p>MAGIC ITEMS</p>
        </li>
        <li>
            <p>MONSTERS</p>
        </li>
      </ul>
    </div>
  );
}
