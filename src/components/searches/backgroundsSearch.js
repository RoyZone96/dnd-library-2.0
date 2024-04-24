import { useEffect, useState, React } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function BackgroundSearch({ backgroundToSearch }) {
  let [backgroundResult, setbackgroundResult] = useState(null);
  let [errorMessage, setErrorMessage] = useState("");
  let backgroundUrl = `https://api.open5e.com/backgrounds/`;

  useEffect(() => {
    if (backgroundToSearch !== "") {
      let spacedBackgroundtoSearch = backgroundToSearch.replace(" ", "-");
      backgroundUrl += `${spacedBackgroundtoSearch}`;
      axios
        .get(backgroundUrl)
        .then((response) => {
          setbackgroundResult(response.data);

          console.log(backgroundResult);
          console.log("get background result");
          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          alert("Error in getting the background: No such background exists.", err)
        });
    }
  }, [backgroundToSearch]);

  return (
    <div className="scroll-container">
      {backgroundResult && (
        <div className="fade-in">
          <h1 className="display-4">{backgroundResult?.name}</h1>
          <ReactMarkdown>{backgroundResult?.desc}</ReactMarkdown>
          <h2>Skill Proficiencies: {backgroundResult?.skill_proficiencies}</h2>
          <h2>Tool Proficiencies: {backgroundResult?.tool_proficiencies}</h2>
          <h2>Languages: {backgroundResult?.languages}</h2>
          <h2>Equipment: {backgroundResult?.equipment}</h2>
          <h2>
            {backgroundResult?.feature} : {backgroundResult?.feature_desc}
          </h2>
          <h2>Suggested Characteristics</h2>
          <ReactMarkdown>
            {backgroundResult?.suggested_characteristics}
          </ReactMarkdown>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
