import { useEffect, useState, React } from "react";
import axios from "axios";

export default function FeatsSearch( {featToSearch}) {
  let [featResult, setFeatResult] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let featUrl = `https://api.open5e.com/feats/`;

  useEffect(() => {
    let moddedFeatToSearch = featToSearch.toString().replaceAll(" ", "-")
    let featUrl = `$https://api.open5e.com/feats/${moddedFeatToSearch}`;
    
    axios
      .get(featUrl)
      .then((response) => {
        setFeatResult(response.data);
        console.log(response.data)
        console.log(featResult);
        console.log("get background result");
        setErrorMessage("No errors, traveler");
      })
      .catch((err) => {
        console.log("Error in getting the background: ");
        console.log(err);
      });
  }, [featToSearch]);

  return(
    <div>
        {featResult != [] && (
            <div>
                <h1> {featResult.name}</h1>
            </div>
        )}
    </div>
  )
}