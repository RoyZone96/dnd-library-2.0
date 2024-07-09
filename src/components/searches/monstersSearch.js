import { useEffect, useState, React } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons"; 
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons"; 


export default function MonsterSearch({ monsterToSearch }) {
  let [monsterResult, setMonsterResult] = useState(null);
  let [actions, setActions] = useState([]);
  let [legendaryActions, setLegendaryActions] = useState([]);
  let [specialAbilities, setSpecialAbilities] = useState([]);
  let [errorMessage, setError] = useState("");
  let [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (monsterToSearch !== "") {
      setFadeIn(false);
      let moddedMonsterToSearch = monsterToSearch.replaceAll(" ", "-");
      let monsterUrl = `https://api.open5e.com/monsters/${moddedMonsterToSearch}`;
      axios
        .get(monsterUrl)
        .then((response) => {
          setMonsterResult(response.data);

          setActions(
            response.data.actions.map((action) => ({
              name: action.name,
              desc: action.desc,
              bonus: action.attack_bonus,
              damage: action.damage_dice,
              damageBonus: action.damage_bonus,
            }))
          );

          if (response.data.legendary_actions) {
            setLegendaryActions(
              response.data.legendary_actions.map((legendaryActions) => ({
                name: legendaryActions.name,
                desc: legendaryActions.desc,
              }))
            );
          } else {
            setLegendaryActions([]);
          }

          if (response.data.special_abilities) {
            setSpecialAbilities(
              response.data.special_abilities.map((specialAbilities) => ({
                name: specialAbilities.name,
                desc: specialAbilities.desc,
              }))
            );
          } else {
            setSpecialAbilities([]);
          }
        })
        .catch((error) => {
          setError(error);
          alert("Error in getting the monster: no such monster exists.", error)
        });
    }
  }, [monsterToSearch]);

  useEffect(() => {
    if (monsterResult || errorMessage) {
      setFadeIn(true);
    }
  });

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  }

  const userHasToken = localStorage.getItem("token");

  let spellLinks = [];
  if (monsterResult?.spell_list)
    spellLinks.push(`<a>${monsterResult.spell_list}</a>`);

  return (
    <div className="scroll-container fade-in">
      {monsterResult  && (
        <div className={`${fadeIn ? 'fade-in' : 'fade-out'}`}>
          {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
          <h1>{monsterResult.name}</h1>
          <h2>
            {monsterResult.size} {monsterResult.type}
          </h2>
          <h2>{monsterResult.alignment}</h2>
          <h2>
            {monsterResult.hit_points} or {monsterResult.hit_dice}
          </h2>
          <h2>
            {" "}
            {monsterResult.armor_class} {monsterResult.armor_desc}
          </h2>
          <h2>Stats</h2>
          <ul>
            <li>Strength: {monsterResult.strength}</li>
            <li>Dexterity: {monsterResult.dexterity}</li>
            <li>Constitution: {monsterResult.constitution}</li>
            <li>Intelligence: {monsterResult.intelligence}</li>
            <li>Wisdom: {monsterResult.wisdom}</li>
            <li>Charisma: {monsterResult.charisma}</li>
          </ul>
          <h2>Saves</h2>
          <ul>
            <li>Strength Save: {monsterResult.strength_save}</li>
            <li>Dexterity Save: {monsterResult.dexterity_save}</li>
            <li>Constitution Save: {monsterResult.constitution_save}</li>
            <li>Intelligence Save: {monsterResult.intelligence_save}</li>
            <li>Wisdom Save: {monsterResult.wisdom_save}</li>
            <li>Charisma Save: {monsterResult.charisma_save}</li>
          </ul>

          <h2>Vulnerabilites: {monsterResult.damage_vulnerabilities}</h2>
          <h2>Damages Resistances: {monsterResult.damage_resistances}</h2>
          <h2>Damage Immunities: {monsterResult.damage_vulnerabilities}</h2>
          <h2>Condition Immunities: {monsterResult.condition_immunities}</h2>
          <h2>Senses: {monsterResult.senses}</h2>
          <h2>Languages: {monsterResult.languages}</h2>
          <h2>Challenge Rating: {monsterResult.challenge_rating}</h2>

          <h2>Spell List</h2>
          <h3>{spellLinks.join(", ")}</h3>

          <h2>Skills</h2>
          <ul>
            {Object.entries(monsterResult.skills || {}).map((skillName) => {
              return (
                <div key={skillName[0]}>
                  <li>
                    <p>{`${skillName[0]}: ${skillName[1]}`}</p>
                  </li>
                </div>
              );
            })}
          </ul>

          <h2>Special Abilities</h2>
          <ul>
            {specialAbilities.map((specialAbility) => {
              return (
                <li>
                  <p>
                    {specialAbility.name} - {specialAbility.desc}
                  </p>
                </li>
              );
            })}
          </ul>
          <h2>Actions</h2>
          <ul>
            {actions.map((action) => {
              return (
                <li>
                  <p>
                    {action.name} - {action.desc}
                  </p>
                </li>
              );
            })}
          </ul>
          <h2>Legendary Actions</h2>
          <ul>
            {actions.map((legendaryAction) => {
              return (
                <li>
                  <p>
                    {legendaryAction.name} - {legendaryAction.desc}
                  </p>
                </li>
              );
            })}
          </ul>
          {monsterResult && monsterResult.environments && (
            <h2>{monsterResult.environments.join(", ")}</h2>
          )}
        </div>
      )}
    </div>
  );
}
