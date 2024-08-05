import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons"; 
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons"; 


export default function RaceSearch({ raceToSearch }) {
  let [raceResult, setRaceResult] = useState(null); // Changed from array to null for correct checking
  let [errorMessage, setErrorMessage] = useState("");
  let [abilityScoreImprovements, setAbilityScoreImprovements] = useState([]);
  let [subraces, setSubraces] = useState([]);
  let [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);


  useEffect(() => {
    if (raceToSearch !== "") {
      setFadeIn(false);
      let raceUrl = `https://api.open5e.com/races/${raceToSearch}`;
      axios
        .get(raceUrl)
        .then((response) => {
          setRaceResult(response.data);
          setAbilityScoreImprovements(
            response.data.asi
              .filter((ability) => ability.value > 0)
              .map((ability) => ({
                attribute: ability.attributes,
                value: ability.value,
              }))
          );

          if (response.data.subraces) {
            setSubraces(
              response.data.subraces.map((subrace) => ({
                name: subrace.name,
                asi: {
                  attribute: subrace.asi[0].attributes,
                  value: subrace.asi[0].value,
                },
                asi_desc: subrace.asi_desc,
                traits: subrace.traits,
                desc: subrace.desc,
              }))
            );
          } else {
            setSubraces([]);
          }

          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          console.log("Error in getting the race: No such race exists.", err);
          setErrorMessage("Error fetching data");
        });
    }
  }, [raceToSearch]);

  useEffect(() => {
    if (raceResult || errorMessage) {
      setFadeIn(true);
    }
  });

  const toggleBookmark = async () => {
    
    const searchURL = `https://api.open5e.com/races/${raceToSearch}`;
    const bookmarkAction = isBookmarked ? 'remove' : 'add';
    const backendURL = `http://localhost:8080/bookmarks/createBookmark`;

    try {
      const response = await axios.post(backendURL, {
        url: searchURL,
        createDate: new Date().toISOString(),
        user_id: localStorage.getItem("id"),
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        }
      });
      console.log(response.data);
      if (bookmarkAction === 'add') {
        console.log('Bookmark added:', response.data);
        alert("Bookmark added!");
      } else {
        console.log('Bookmark removed:', response.data);
      }
      // Toggle the bookmark state
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error(`Error toggling bookmark: ${error}`);
      // Handle error, e.g., by showing an error message to the user
    }
  };

  const userHasToken = localStorage.getItem("token");

  let speedString = "**Speed.**";
  let speedTypes = [];
  if (raceResult?.speed?.walk)
    speedTypes.push(`Walking Speed: ${raceResult.speed.walk}`);
  if (raceResult?.speed?.fly)
    speedTypes.push(`Flying Speed: ${raceResult.speed.fly}`);
  if (raceResult?.speed?.swim)
    speedTypes.push(`Swimming Speed: ${raceResult.speed.swim}`);
  speedString += speedTypes.length > 0 ? ", " + speedTypes.join(", ") : "";
  return (
    <div className="scroll-container fade-in">
      {raceResult && (
        <div className={`${fadeIn ? 'fade-in' : 'fade-out'}`}>
          {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
          <h1 className="display-4">{raceResult.name}</h1>

          <ReactMarkdown>{speedString}</ReactMarkdown>

          <ReactMarkdown>{raceResult.speed_desc}</ReactMarkdown>
          <h2>Racial ASI</h2>
          <ReactMarkdown>{raceResult.asi_desc}</ReactMarkdown>
          <ul>
            {abilityScoreImprovements.map((ability, index) => (
              <li key={index}>
                <ReactMarkdown>
                  {`${ability.attribute}: ${ability.value}`}
                </ReactMarkdown>
              </li>
            ))}
          </ul>
          <h2>Vision</h2>
          <ReactMarkdown>{raceResult.vision}</ReactMarkdown>
          <h2>Traits</h2>
          <ReactMarkdown>{raceResult.traits}</ReactMarkdown>
          <h2>Languages</h2>
          <ReactMarkdown>{raceResult.languages}</ReactMarkdown>
          <h2>Size</h2>
          <ReactMarkdown>
            {`${raceResult.size_raw}: ${raceResult.size}`}
          </ReactMarkdown>
          <h2>Age</h2>
          <ReactMarkdown>{raceResult.age}</ReactMarkdown>
          <h2>Alignment</h2>
          <ReactMarkdown>{raceResult.alignment}</ReactMarkdown>
          <h2>Description</h2>
          <ReactMarkdown>{raceResult.desc}</ReactMarkdown>

          {subraces.length > 0 && (
            <div>
              <h3>Subraces</h3>
              <ul>
                {subraces.map((subrace, index) => (
                  <li key={index}>
                    <ReactMarkdown>{`Name: ${subrace.name}`}</ReactMarkdown>
                    <ReactMarkdown>{`Traits: ${subrace.traits}`}</ReactMarkdown>
                    <ReactMarkdown>{subrace.desc}</ReactMarkdown>
                    <ReactMarkdown>{subrace.asi_desc}</ReactMarkdown>
                    <ReactMarkdown>
                      {`ASI attribute:value: ${subrace.asi.attribute} - ${subrace.asi.value}`}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
