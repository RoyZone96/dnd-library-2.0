import { useEffect, useState, React } from "react";
import axios from "axios";

export default function MagicItemSearch( {magicItemToSearch} ){
    let [itemResult, setItemResult] = useState([])
    let [ error, setError ] = useState("")
    
    

    useEffect(() => {
        let moddedItemToSearch = magicItemToSearch.replace(" ", "-")
        let itemUrl = `https://api.open5e.com/magicitems/${moddedItemToSearch}`;
        axios
      .get(itemUrl)
      .then((response) => {
        setItemResult(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        error = "No such item exists."
        setError(error);
      });
  }, [magicItemToSearch]);
       
    
  return (
    <div>
        {itemResult != [] && ( 
            <div>
                <h1>{itemResult.name}</h1>
                <ul>
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