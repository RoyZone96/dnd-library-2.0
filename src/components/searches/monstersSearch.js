import { useEffect, useState, React } from "react";
import axios from "axios";

export default function MonsterSearch({ monsterToSearch }) {
  let [monsterResult, setMonsterResult] = useState([]);
  let [actions, setActions] = useState([]);
  let [legendaryActions, setLegendaryActions] =useState([])
  let [error, setError] = useState("");

  let monsterUrl = `https://api.open5e.com/monsters/`

  useEffect(() =>{
    let moddedMonsterToSearch = monsterToSearch.replace(" ", "-")
    let monsterUrl = `https://api.open5e.com/monsters/${moddedMonsterToSearch}`
    axios
      .get(monsterUrl)
      .then((response) => {
        setMonsterResult(response.data);
        console.log(response.data);
        // if (response.data.legendary_actions) {
        //   setLegendaryActions(
        //     response.data.archetypes.map((legendaryActions) => ({
        //       name: legendaryActions.name,
        //       desc: legendaryActions.desc,
        //     }))
        //   );
        // } else {
        //   setLegendaryActions([]);
        // }
      })
      .catch((error) => {
        setError(error);
      });
  }, [monsterToSearch]);
  
return (
    <div>

    </div>
)
}