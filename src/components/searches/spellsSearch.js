import { useEffect, useState, React } from "react";
import axios from "axios";

export default function SpellsSearch( {spellsToSearch} ){

    let [spellResult, setSpellResult] = useState("")
    let [errorMessage, setErrorMessage] = useState("");
    let spellUrl = `https://api.open5e.com/v1/spells/`

    useEffect(() => {
        let spacedSpelltoSearch = spellsToSearch.replace(' ', '-')
        spellUrl += `${spacedSpelltoSearch}`;
        console.log(
          "background url: " +
          spellUrl +
            "\tbackgroundToSearch: " +
            spacedSpelltoSearch
        );
        axios
          .get(spellUrl)
          .then((response) => {
            setSpellResult(response.data);
    
            console.log(setSpellResult);
            console.log("get background result");
            setErrorMessage("No errors, traveler");
          })
          .catch((err) => {
            console.log("Error in getting the background: ");
            console.log(err);
          });
      }, [spellsToSearch]);

      return(
        <div>
            {spellResult != [] && (
                <div>
                    <h1>{spellResult.name}</h1>
                    <h2>{spellResult.school}</h2>
                    <ul>
                      <li> <h3>Range: {spellResult.range}</h3></li>
                      <li><h3>Components: {spellResult.components}</h3></li>
                      <li><h3>Casting Time: {spellResult.casting_time}</h3></li>
                      <li> <h3>Duration: {spellResult.duration}</h3></li>
                      <li> <h3>Concentration: {spellResult.concentration}</h3></li>
                      <li> <h3>Ritual: {spellResult.ritual}</h3></li>
                    </ul>

                    <p>{spellResult.desc}</p>

                    <p>{spellResult.higher_level}</p>

                </div>
            )}
        </div>
      )
}