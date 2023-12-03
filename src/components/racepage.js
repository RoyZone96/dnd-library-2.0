import {useEffect, useState, React} from "react";
import axios from "axios";
import SearchQuery from "./searchquery";
import RaceSearch from "./searches/racesearch";

export default function RacePage({raceToSearch}){

    
    return(
        
        <div>
            {/* Task right now: Figure out how in the everliving *fork* to 
            get the SearchQuery and RaceSearch components to work with each
            other so that a search query from SearchQuery can get passed
            to RaceSearch so that it display all nicely together
            
            Approahces tried/in-progress
            
            1. Send RaceSearch to SearchQuery as a prop and display it as a 
            component without the component
            
            2. See if there call be a callback function passed to SearchQuery that updates
            a variable with RacePage that can then be passed to RaceSearch as
            the search query of which race to get
            
            3. Build a stone circle and hope aliens save us from this madness
            
            
            
            */}
            <SearchQuery propCompnent={RaceSearch}/>
        </div>
    )
}