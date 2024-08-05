import { useEffect, useState, React } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons"; 
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons"; 



export default function SpellsSearch({ spellsToSearch }) {
  let [spellResult, setSpellResult] = useState(null);
  let [errorMessage, setErrorMessage] = useState("");
  let [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (spellsToSearch !== "") {
      setFadeIn(false);
      let spacedSpelltoSearch = spellsToSearch.replace(" ", "-");
      let spellUrl = `https://api.open5e.com/v1/spells/${spacedSpelltoSearch}`;

      axios
        .get(spellUrl)
        .then((response) => {
          setSpellResult(response.data);

          console.log(setSpellResult);
          console.log("get background result");
          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          alert("Error in getting the feat: No such feat exists", err);
        });
    }
  }, [spellsToSearch]);

  useEffect(() => {
    if (spellResult || errorMessage) {
      setFadeIn(true);
    }
  });

  const toggleBookmark = async () => {
    let spacedSpelltoSearch = spellsToSearch.replace(" ", "-");
    const searchURL = `https://api.open5e.com/spells/${spacedSpelltoSearch}`;
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
        const bookmarkId = 'yourBookmarkIdHere';
        const url = `http://localhost:8080/bookmarks/${bookmarkId}`;
        
        axios.delete(url, {
          headers: {
            // Include any necessary headers here
            'Authorization': 'Bearer yourAuthTokenHere',
          },
        })
        .then(response => {
          console.log('Bookmark removed:', response.data);
        })
        .catch(error => {
          console.error('Error removing bookmark:', error.response ? error.response.data : error.message);
        });
      }
      // Toggle the bookmark state
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error(`Error toggling bookmark: ${error}`);
      // Handle error, e.g., by showing an error message to the user
    }
  };

  const userHasToken = localStorage.getItem("token");

  return (
    <div className="scroll-container fade-in">
      {spellResult && (
        <div className={`${fadeIn ? "fade-in" : "fade-out"}`}>
           {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
          <h1 className="display-4">{spellResult.name}</h1>
          <h2>{spellResult.school}</h2>
          <ul className="list-unstyled">
            <li>
              {" "}
              <h3>Range: {spellResult.range}</h3>
            </li>
            <li>
              <h3>Components: {spellResult.components}</h3>
            </li>
            <li>
              <h3>Casting Time: {spellResult.casting_time}</h3>
            </li>
            <li>
              {" "}
              <h3>Duration: {spellResult.duration}</h3>
            </li>
            <li>
              {" "}
              <h3>Concentration: {spellResult.concentration}</h3>
            </li>
            <li>
              {" "}
              <h3>Ritual: {spellResult.ritual}</h3>
            </li>
          </ul>

          <p>{spellResult.desc}</p>

          <p>{spellResult.higher_level}</p>
        </div>
      )}
    </div>
  );
}
