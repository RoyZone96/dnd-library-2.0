import { useEffect, useState, React } from "react";
import axios from "axios";

export default function ClassSearch({ classToSearch }) {
  let [classResult, setClassResult] = useState([]);
  let [archetypes, setArchetypes] = useState([]);
  let [error, setError] = useState("");

  let classUrl = `https://api.open5e.com/classes/`;

  useEffect(() => {
    let moddedClassToSearch = classToSearch.replace(" ", "-");
    let classUrl = `https://api.open5e.com/classes/${moddedClassToSearch}`;
    axios
      .get(classUrl)
      .then((response) => {
        setClassResult(response.data);
        console.log(response.data);
        if (response.data.archetypes) {
          setArchetypes(
            response.data.archetypes.map((archetype) => ({
              name: archetype.name,
              desc: archetype.desc,
            }))
          );
        } else {
          setArchetypes([]);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [classToSearch]);

  return (
    <div>
      {classResult != [] && (
        <div>
          <h1>{classResult.name}</h1>
          <p>{classResult.desc}</p>
          <ul>
            <h2>Stats</h2>
            <li>Hit Dice: {classResult.hit_die}</li>
            <li>Hp At 1st Level: {classResult.hp_at_1st_level}</li>
            <li>Hp At higher levels: {classResult.hp_at_higher_levels}</li>
            <li>Armor: {classResult.prof_armor}</li>
            <li>Weapons: {classResult.prof_weapons}</li>
            <li>Tools: {classResult.prof_tools}</li>
            <li>Saving Throws: {classResult.prof_saving_throws}</li>
            <li>Skills: {classResult.prof_skills}</li>
            <li>Spellcasting: {classResult.spellcasting_ability}</li>
            <li>SubTypes: {classResult.subtypes_name}</li>
          </ul>
          <ul>
            {archetypes.map((archetype) => {
              return (
                <li key={archetype.name}>
                  <p>Name: {archetype.name}</p>
                  <p>Description: {archetype.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
