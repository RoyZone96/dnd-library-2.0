import { useEffect, useState, React } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons"; 
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons"; 


export default function FeatsSearch({ featToSearch }) {
  let [featResult, setFeatResult] = useState(null);
  let [errorMessage, setErrorMessage] = useState("");
  let [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (featToSearch !== "") {
      setFadeIn(false);
      let moddedFeatToSearch = featToSearch.replaceAll(" ", "-");
      let featUrl = `https://api.open5e.com/feats/${moddedFeatToSearch}`;

      axios
        .get(featUrl)
        .then((response) => {
          setFeatResult(response.data);
          console.log(response.data);
          console.log(featResult);
          console.log("get feat result");
          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          console.log();
          console.log(err);
          alert("Error in getting the feat: ")
        });
    }
  }, [featToSearch]);

  useEffect(() => {
    if (featResult || errorMessage) {
      setFadeIn(true);
    }
  }, [featResult, errorMessage]);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const userHasToken = localStorage.getItem("token");



  return (
    <div className="scroll-container fade-in">
      {featResult && (
        <div className={`${fadeIn ? 'fade-in' : 'fade-out'}`}>
          {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
          <h1 className="display-4"> {featResult.name}</h1>
          <h2>{featResult.desc}</h2>
          <h3>{featResult.effects_desc}</h3>
          <h2>{featResult.prerequisite}</h2>
        </div>
      )}
    </div>
  );
}
