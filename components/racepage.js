import {useEffect, useState, React} from "react";

export default function racePage({raceToSearch}){

    let [raceResult, setRaceResult] = useState([])
    let raceUrl = `https://api.open5e.com/races/`

    useEffect((raceToSearch) => {
        raceToSearch = raceToSearch.toLowerCase() //make sure it's human instead of Human for example, TODO: we may change how input is done
        raceUrl += `${raceToSearch}`
        axios.get(raceUrl)
        .then(response => {
            setRaceResult(response)
            console.log("get race successful")
        })
        .catch(err => {
            console.log("Error in getting the race: ")
            console.log(err)
        })
    })

    return(
        <div>
            <h1>{raceResult.name}</h1>
        </div>
    )
}