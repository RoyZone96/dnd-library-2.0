import { useEffect, useState, React } from "react";
import axios from "axios";

export default function MagicItemSearch( {magicItemToSearch} ){
    let [itemResult, setItemResult] = useState([])
    let [ error, setError ] = useState("")
    let [fadeIn, setFadeIn] = useState(true);
    
    

    useEffect(() => {
        if (magicItemToSearch !== "") {
            setFadeIn(false);
        }
        let moddedItemToSearch = magicItemToSearch.replaceAll(" ", "-")
        let itemUrl = `https://api.open5e.com/magicitems/${moddedItemToSearch}`;
        axios
      .get(itemUrl)
      .then((response) => {
        setItemResult(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        alert("Error in getting the feat: No such item exists")
      });
  }, [magicItemToSearch]);
       
  useEffect(() => {
    if (itemResult || error) {
      setFadeIn(true);
    }
  })
    
  return (
    <div className="scroll-container">
        {itemResult && ( 
            <div className={`${fadeIn ? 'fade-in' : 'fade-out'}`}>
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
  )
}