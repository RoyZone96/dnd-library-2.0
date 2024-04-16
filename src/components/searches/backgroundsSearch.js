import { useEffect, useState, React } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
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
          <ReactMarkdown>{backgroundResult?.desc}</ReactMarkdown>
          <h2>Skill Proficiencies: {backgroundResult?.skill_proficiencies}</h2>
          <h2>Tool Proficiencies: {backgroundResult?.tool_proficiencies}</h2>
          <h2>Languages: {backgroundResult?.languages}</h2>
          <h2>Equipment: {backgroundResult?.equipment}</h2>
          <h2>
            {backgroundResult?.feature} : {backgroundResult?.feature_desc}
          </h2>
          <h2>Suggested Characteristics</h2>
          <ReactMarkdown>{backgroundResult?.suggested_characteristics}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
