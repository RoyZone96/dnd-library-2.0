import { useEffect, useState, React } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons"; 
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons"; 

export default function BackgroundSearch({ backgroundToSearch }) {
  let [backgroundResult, setbackgroundResult] = useState(null);
  let [errorMessage, setErrorMessage] = useState("");
  const [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (backgroundToSearch !== "") {
      setFadeIn(false);
      let spacedBackgroundtoSearch = backgroundToSearch.replace(" ", "-");
      let backgroundUrl = `https://api.open5e.com/backgrounds/${spacedBackgroundtoSearch}`;
      axios
        .get(backgroundUrl)
        .then((response) => {
          setbackgroundResult(response.data);

          console.log(backgroundResult);
          console.log("get background result");
          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          alert(
            "Error in getting the background: No such background exists.",
            err
          );
        });
    }
  }, [backgroundToSearch]);

  useEffect(() => {
    if (backgroundResult || errorMessage) {
      setFadeIn(true);
    }
  }, [backgroundResult, errorMessage]);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const userHasToken = localStorage.getItem("token");

  return (
    <div className="scroll-container fade-in">
      {backgroundResult && (
        <div className={`${fadeIn ? "fade-in" : "fade-out"}`}>
         {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
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
