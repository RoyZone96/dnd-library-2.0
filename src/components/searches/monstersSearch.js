import { useEffect, useState, React } from "react";
import axios from "axios";

export default function MonsterSearch({ monsterToSearch }) {
  let [monsterResult, setMonsterResult] = useState([]);
  let [actions, setActions] = useState([]);
  let [legendaryActions, setLegendaryActions] = useState([]);
  let [error, setError] = useState("");

  let monsterUrl = `https://api.open5e.com/monsters/`;

  useEffect(() => {
    let moddedMonsterToSearch = monsterToSearch.replace(" ", "-");
    let monsterUrl = `https://api.open5e.com/monsters/${moddedMonsterToSearch}`;
    axios
      .get(monsterUrl)
      .then((response) => {
        setMonsterResult(response.data);
        console.log(response.data);
        if (response.data.legendary_actions) {
          setLegendaryActions(
            response.data.archetypes.map((legendaryActions) => ({
              name: legendaryActions.name,
              desc: legendaryActions.desc,
            }))
          );
        } else {
          setLegendaryActions([]);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [monsterToSearch]);

  return(
    <div>
      {monsterResult !=[] && (
        <div>
          <h1>{monsterResult.name}</h1>
          <h2>{monsterResult.size} {monsterResult.type}</h2>
          <h2>{monsterResult.alignment}</h2>
          <h2>{monsterResult.hit_points} or {monsterResult.hit_dice}</h2>
          <h2> {monsterResult.armor_class} {monsterResult.armor_desc}</h2>
          </div>
      )}
    </div>
  ) 
}
