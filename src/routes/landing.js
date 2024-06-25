import React from "react";
import dragon from "../images/dragon.png";
import { NavLink } from "react-router-dom";

export default function Landing() {
  const hasToken = localStorage.getItem('token');

  return (
    <div id="landing-blurb">
      <h1 className="intro">Step into the wild world of Monsters and Magic</h1>
      <img
        className="landing-image"
        src={dragon}
        alt="dragon versus adventurers"
      />
      <article className="forward">
        <b>
          This application was dedicated to our love for tabletop RPGs
          particularly Dnd. Anything you want to know about the shattered realms
          and the creatures therein is
          <br />
          Contained in this app with many more updates and features to come.
          Look forward to an ever expanding codex of knowledge to help plan your
          DnD adventure.
        </b>
      </article>

   
    </div>
  );
}
