import { useEffect, useState, React } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons"; 
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons"; 



export default function SpellsSearch({ spellsToSearch }) {
  let [spellResult, setSpellResult] = useState(null);
  let [errorMessage, setErrorMessage] = useState("");
  let [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (spellsToSearch !== "") {
      setFadeIn(false);
      let spacedSpelltoSearch = spellsToSearch.replace(" ", "-");
      let spellUrl = `https://api.open5e.com/v1/spells/${spacedSpelltoSearch}`;

      axios
        .get(spellUrl)
        .then((response) => {
          setSpellResult(response.data);

          console.log(setSpellResult);
          console.log("get background result");
          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          alert("Error in getting the feat: No such feat exists", err);
        });
    }
  }, [spellsToSearch]);

  useEffect(() => {
    if (spellResult || errorMessage) {
      setFadeIn(true);
    }
  });

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const userHasToken = localStorage.getItem("token");

  return (
    <div className="scroll-container fade-in">
      {spellResult && (
        <div className={`${fadeIn ? "fade-in" : "fade-out"}`}>
           {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
          <h1 className="display-4">{spellResult.name}</h1>
          <h2>{spellResult.school}</h2>
          <ul className="list-unstyled">
            <li>
              {" "}
              <h3>Range: {spellResult.range}</h3>
            </li>
            <li>
              <h3>Components: {spellResult.components}</h3>
            </li>
            <li>
              <h3>Casting Time: {spellResult.casting_time}</h3>
            </li>
            <li>
              {" "}
              <h3>Duration: {spellResult.duration}</h3>
            </li>
            <li>
              {" "}
              <h3>Concentration: {spellResult.concentration}</h3>
            </li>
            <li>
              {" "}
              <h3>Ritual: {spellResult.ritual}</h3>
            </li>
          </ul>

          <p>{spellResult.desc}</p>

          <p>{spellResult.higher_level}</p>
        </div>
      )}
    </div>
  );
}
