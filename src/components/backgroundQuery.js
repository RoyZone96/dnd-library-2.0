import {useState, React} from "react";

export default function SearchQuery({callbackFunc}) {
    let [query, setQuery] = useState("Come noble traveler, bring forth your questions.")

   

    let getSearchResult = (event) => {
        console.log(callbackFunc)
        event.preventDefault();
        console.log('clicked')
      }

    return (
    <div>
        <label>Search Query: </label>
        <input type="text" onChange={(event) => {setQuery(event.target.value) 
        callbackFunc(event.target.value)}}
        />
        <button onClick={getSearchResult}>Search</button>
        <p>Value of searchQuery: {query}</p>
      
    </div>
    )
}