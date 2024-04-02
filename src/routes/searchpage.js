import React from "react";
import { useState } from "react";
import SearchNav from "../components/searchnav";
import axios from "axios";

export default function SearchPage() {
  let [searchQuery, setSearchQuery] = useState(
    "enter your search here, weary adventurer"
  );

  const url = `https://api.open5e.com/races/`;

let getSearchResult = (event) => {
    event.preventDefault();
    console.log('clicked')
  
    axios.get(url + `${searchQuery}`).then((response) => {
        console.log(response);
      }).catch(error => console.log(error))
    ;
  };

  return (
    <div>
      <SearchNav />
    </div>
  );
}
