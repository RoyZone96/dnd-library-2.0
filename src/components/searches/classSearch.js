import { useEffect, useState, React } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import UserAuthService from "../../services/UserAuthService";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";

export default function ClassSearch({ classToSearch }) {
  let [classResult, setClassResult] = useState(null);
  let [archetypes, setArchetypes] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  const [fadeIn, setFadeIn] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (classToSearch !== "") {
      setFadeIn(false);
      let moddedClassToSearch = classToSearch.replace(" ", "-");
      let classUrl = `https://api.open5e.com/classes/${moddedClassToSearch}`;
      axios
        .get(classUrl)
        .then((response) => {
          setClassResult(response.data);
          if (response.data.archetypes) {
            setArchetypes(
              response.data.archetypes.map((archetype) => ({
                name: archetype.name,
                desc: archetype.desc,
              }))
            );
          } else {
            setArchetypes([]);
          }
        })
        .catch((error) => {
          setErrorMessage(error);
          alert("Error in getting the class: No such class exists.", error);
        });
    }
  }, [classToSearch]);

  useEffect(() => {
    if (classResult || errorMessage) {
      setFadeIn(true);
    }
  }, [classResult, errorMessage]);

  const toggleBookmark = async () => {
    let moddedClassToSearch = classToSearch.replace(" ", "-");
    const searchURL = `https://api.open5e.com/classes/${moddedClassToSearch}`;
    const bookmarkAction = isBookmarked ? "remove" : "add";
    const backendURL = `http://localhost:8080/bookmarks/createBookmark`;
  
    try {
      const user_id = await UserAuthService.getUserIdFromToken();
      if (!user_id) {
        console.error('No valid user ID found. Unable to create bookmark.');
        return;
      }
  
      const payload = {
        url: searchURL,
        createDate: new Date().toISOString(),
        user_id, // Use the correct user ID obtained from the token
      };
  
      console.log(payload);
  
      const response = await axios.post(backendURL, payload, {
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
  
  const userHasToken = localStorage.getItem("token")

  return (
    <div className="scroll-container fade-in">
      {classResult && (
        <div className={`${fadeIn ? "fade-in" : "fade-out"}`}>
          {userHasToken && (
            <FontAwesomeIcon
              icon={isBookmarked ? fasBookmark : farBookmark}
              onClick={toggleBookmark}
              style={{ cursor: "pointer" }}
              className="bookmark-icon"
            />
          )}
          <ReactMarkdown className="display-4" as="h1">
            {classResult.name}
          </ReactMarkdown>
          <ReactMarkdown className="lead">{classResult.desc}</ReactMarkdown>
          <ReactMarkdown className="display-6" as="h2">
            Stats
          </ReactMarkdown>
          <ul className="list-unstyled">
            <li>Hit Dice: {classResult.hit_die}</li>
            <li>Hp At 1st Level: {classResult.hp_at_1st_level}</li>
            <li>Hp At higher levels: {classResult.hp_at_higher_levels}</li>
            <li>Armor: {classResult.prof_armor}</li>
            <li>Weapons: {classResult.prof_weapons}</li>
            <li>Tools: {classResult.prof_tools}</li>
            <li>Saving Throws: {classResult.prof_saving_throws}</li>
            <li>Skills: {classResult.prof_skills}</li>
            <li>Spellcasting: {classResult.spellcasting_ability}</li>
            <li>SubTypes: {classResult.subtypes_name}</li>
          </ul>
          <ul className="list-unstyled">
            {archetypes.map((archetype) => {
              return (
                <li key={archetype.name}>
                  <ReactMarkdown as="p">{`Name: ${archetype.name}`}</ReactMarkdown>
                  <ReactMarkdown>{`Description: ${archetype.desc}`}</ReactMarkdown>
                </li>
              );
            })}
          </ul>
          <table>{classResult.table}</table>
        </div>
      )}
      {errorMessage && { errorMessage }}
    </div>
  );
}
