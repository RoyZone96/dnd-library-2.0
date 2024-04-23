import { useEffect, useState, React } from "react";
import axios from "axios";

export default function SpellsSearch({ spellsToSearch }) {
  let [spellResult, setSpellResult] = useState(null);
  let [errorMessage, setErrorMessage] = useState("");
  let spellUrl = `https://api.open5e.com/v1/spells/`;

  useEffect(() => {
    if (spellsToSearch !== "") {
      let spacedSpelltoSearch = spellsToSearch.replace(" ", "-");
      spellUrl += `${spacedSpelltoSearch}`;

      axios
        .get(spellUrl)
        .then((response) => {
          setSpellResult(response.data);

          console.log(setSpellResult);
          console.log("get background result");
          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          alert("Error in getting the feat: No such feat exists", err)
        });
    }
  }, [spellsToSearch]);

  return (
    <div className="scroll-container">
      {spellResult && (
        <div>
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
