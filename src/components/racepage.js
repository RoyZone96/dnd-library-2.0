import {useEffect, useState, React} from "react";
import axios from "axios";

export default function RacePage({raceToSearch}){

    let [raceResult, setRaceResult] = useState([])
    let [errorMessage, setErrorMessage] = useState("")
    let raceUrl = `https://api.open5e.com/races/`

    useEffect(() => {
        //raceToSearch = raceToSearch.toLowerCase() //make sure it's human instead of Human for example, TODO: we may change how input is done
        raceUrl += `${raceToSearch}`
        console.log(raceUrl)
        console.log("race url: " + raceUrl + "\traceToSearch: " + raceToSearch)
        axios.get(raceUrl)
        .then(response => {
            setRaceResult(response.data)
            console.log(raceResult)
            console.log("get race successful")
            setErrorMessage("No errors, traveler")
        })
        .catch(err => {
            console.log("Error in getting the race: ")
            console.log(err)
        })
    },[raceToSearch])

    return(
        <div>
            <h1>{raceResult?.name}</h1>
            <h2>Walking Speed: {raceResult?.speed?.walk}, Flying Speed: {raceResult?.speed?.fly}, Swimming Speed: {raceResult?.speed?.swim}</h2>
        </div>
    )
}