import { useEffect, useState, React } from "react";
import axios from "axios";

export default function BackgroundSearch({ backgroundToSearch }) {
  let [backgroundResult, setbackgroundResult] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let backgroundUrl = `https://api.open5e.com/backgrounds/`;

  useEffect(() => {
    let spacedBackgroundtoSearch = backgroundToSearch.replace(' ', '-')
    backgroundUrl += `${spacedBackgroundtoSearch}`;
    console.log(
      "background url: " +
        backgroundUrl +
        "\tbackgroundToSearch: " +
        spacedBackgroundtoSearch
    );
    axios
      .get(backgroundUrl)
      .then((response) => {
        setbackgroundResult(response.data);

        console.log(backgroundResult);
        console.log("get background result");
        setErrorMessage("No errors, traveler");
      })
      .catch((err) => {
        console.log("Error in getting the background: ");
        console.log(err);
      });
  }, [backgroundToSearch]);

  return (
    <div>
      {backgroundResult != [] && (
        <div>
          <h1>{backgroundResult?.name}</h1>
          <h2>{backgroundResult?.desc}</h2>
          <h2>Skill Proficiencies: {backgroundResult?.skill_proficiencies}</h2>
          <h2>Tool Proficienceies: {backgroundResult?.tool_proficiencies}</h2>
          <h2>Languages: {backgroundResult?.languages}</h2>
          <h2>Equipment: {backgroundResult?.equipment}</h2>
          <h2>
            {" "}
            {backgroundResult?.feature} : {backgroundResult?.feature_desc}
          </h2>
        </div>
      )}
    </div>
  );
}
