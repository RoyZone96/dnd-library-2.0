import { useEffect, useState, React } from "react";
import axios from "axios";

export default function BackgroundSearch({backgroundToSearch}) {
  let [backgroundResult, setbackgroundResult] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let backgroundUrl = `https://api.open5e.com/backgrounds/`;

  useEffect(() => {
    backgroundUrl += `${backgroundToSearch}`;
    axios
    .get(backgroundUrl)
    .then((response) => {
        setbackgroundResult(response.data)
    })
    .catch((err) => {
        console.log("Error in getting the background: ");
        console.log(err);
      });
    }, backgroundToSearch)




  return (
    <div>
      <h1>{backgroundResult.name}</h1>
      <h2>{backgroundResult.desc}</h2>
    </div>
  );
}

