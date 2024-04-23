import { useEffect, useState, React } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ClassSearch({ classToSearch }) {
  let [classResult, setClassResult] = useState(null);
  let [archetypes, setArchetypes] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(classToSearch !== ""){
let moddedClassToSearch = classToSearch.replace(" ", "-");
    let classUrl = `https://api.open5e.com/classes/${moddedClassToSearch}`;
    axios
      .get(classUrl)
      .then((response) => {
        setClassResult(response.data);
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
        setErrorMessage(error);
        alert("Error in getting the class: No such class exists.", error)
      });
    }
    
  }, [classToSearch]);

  return (
    <div className="scroll-container">
      {classResult  && (
        <div>
          <ReactMarkdown className="display-4" as="h1">{classResult.name}</ReactMarkdown>
          <ReactMarkdown className="lead">{classResult.desc}</ReactMarkdown>
          <ReactMarkdown className="display-6" as="h2">Stats</ReactMarkdown>
          <ul className="list-unstyled">
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
          <ul className="list-unstyled">
            {archetypes.map((archetype) => {
              return (
                <li key={archetype.name}>
                  <ReactMarkdown as="p">{`Name: ${archetype.name}`}</ReactMarkdown>
                  <ReactMarkdown>{`Description: ${archetype.desc}`}</ReactMarkdown>
                </li>
              );
            })}
          </ul>
          <table>{classResult.table}</table>
        </div>
      )}
      {errorMessage && {errorMessage}}
    </div>
  );
}