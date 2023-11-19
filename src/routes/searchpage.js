import React from 'react';
import { useState } from 'react';
import SearchNav from '../components/searchnav';


export default function SearchPage(){

    let [searchQuery, setSearchQuery] = useState('enter your search here, weary adventurer')

    return(
        <div>
            <SearchNav />

            <label>Search Query: </label>
            <input type='text' onChange={(event) => setSearchQuery(event.target.value)} />
            <p>Value of searchQuery: {searchQuery}</p>

        </div>
    )
}
