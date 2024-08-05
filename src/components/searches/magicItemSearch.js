import { useEffect, useState, React } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";

export default function MagicItemSearch({ magicItemToSearch }) {
  let [itemResult, setItemResult] = useState([]);
  let [error, setError] = useState("");
  let [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (magicItemToSearch !== "") {
      setFadeIn(false);
    }
    let moddedItemToSearch = magicItemToSearch.replaceAll(" ", "-");
    let itemUrl = `https://api.open5e.com/magicitems/${moddedItemToSearch}`;
    axios
      .get(itemUrl)
      .then((response) => {
        setItemResult(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error in getting the feat: No such item exists");
      });
  }, [magicItemToSearch]);

  useEffect(() => {
    if (itemResult || error) {
      setFadeIn(true);
    }
  });

  const toggleBookmark = async () => {
    let moddedItemToSearch = magicItemToSearch.replaceAll(" ", "-");
    const searchURL = `https://api.open5e.com/magicitems/${moddedItemToSearch}`;
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

  return (
    <div className="scroll-container fade-in">
      {itemResult && (
        <div className={`${fadeIn ? "fade-in" : "fade-out"}`}>
          {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
          <h1 className="display-4">{itemResult.name}</h1>
          <ul className="list-unstyled">
            <li>{itemResult.type}</li>
            <li>{itemResult.rarity}</li>
            <li>{itemResult.requires_attunement}</li>
          </ul>
          <p>{itemResult.desc}</p>
        </div>
      )}
    </div>
  );
}
