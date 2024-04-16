import { useEffect, useState, React } from "react";
import axios from "axios";

export default function RaceSearch({ raceToSearch }) {
  let [raceResult, setRaceResult] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");
  let [abilityScoreImprovements, setAbilityScoreImprovements] = useState([]);
  let [subraces, setSubraces] = useState([]);
  let raceUrl = `https://api.open5e.com/races/`;

  useEffect(() => {
    //raceToSearch = raceToSearch.toLowerCase() //make sure it's human instead of Human for example, TODO: we may change how input is done

    if (raceToSearch !== "") {
      raceUrl += `${raceToSearch}`;
      console.log(raceUrl);
      console.log("race url: " + raceUrl + "\traceToSearch: " + raceToSearch);
      axios
        .get(raceUrl)
        .then((response) => {
          setRaceResult(response.data);
          //CANNOT use raceResult because setRaceResult is not instantenous (must have a callback) so still
          //uses the previous race if you change races
          setAbilityScoreImprovements(
            response.data.asi
              .filter((ability) => ability.value > 0)
              .map((ability) => ({
                attribute: ability.attributes,
                value: ability.value,
              }))
          );
          // useEffect(() => {
          //   if (raceResult) { // Ensure raceResult is not null
          //     const filteredAsi = raceResult.asi
          //       .filter((ability) => ability.value > 0)
          //       .map((ability) => ({
          //         attribute: ability.attributes,
          //         value: ability.value,
          //       }));
          //     setAbilityScoreImprovements(filteredAsi);
          //   }
          // }, [raceResult]);

          if (response.data.subraces) {
            //only set them if there are subraces\
            setSubraces(
              response.data.subraces.map((subrace) => ({
                name: subrace.name,
                asi: {
                  attribute: subrace.asi[0].attributes,
                  value: subrace.asi[0].value,
                },
                asi_desc: subrace.asi_desc,
                traits: subrace.traits,
                desc: subrace.desc,
              }))
            );
            console.log(
              "subrace asi from api: ",
              response.data.subraces[0].asi
            );
            console.log(
              response.data.subraces[0].asi[0].attributes,
              " coloncoloncolon"
            );
            console.log(
              response.data.subraces[0].asi[0].value,
              " theyre taking the hobbits to Isengard-gard-gard-gard-gard"
            );
          } else {
            setSubraces([]);
          }

          console.log(raceResult);
          console.log("get race successful");
          console.log(raceResult.asi);
          console.log(abilityScoreImprovements);
          console.log("Done");
          console.log(response.data.subraces);
          setErrorMessage("No errors, traveler");
        })
        .catch((err) => {
          console.log("Error in getting the race: ");
          console.log(err);
        });
    }
  }, [raceToSearch]);

  //const asi_values = raceResult.asi.map(arr => `<p>${arr.attributes} - ${arr.value}</p>`)
  return (
    <div>
      {raceResult != [] && (
        <div>
          <h1>{raceResult?.name}</h1>
          <h2>Walking Speed: {raceResult?.speed?.walk},</h2>
          <h2>
            Flying Speed:{raceResult?.speed?.fly}
          </h2>
          <h2>Swimming Speed: {raceResult?.speed?.swim}</h2>
          <p>{raceResult?.speed_desc}</p>
          <h2>Racial ASI</h2>
          <p>{raceResult?.asi_dsec}</p>
          <ul>
            {abilityScoreImprovements.map((ability) => {
              return (
                <li key={ability.attribute}>
                  {ability.attribute}: {ability.value}
                </li>
              );
            })}
          </ul>
          <h2>Vision</h2>
          <p>{raceResult?.vision}</p>
          <h2>Traits</h2>
          <p>{raceResult?.traits}</p>
          <h2>Languages</h2>
          <p>{raceResult?.languages}</p>
          <h2>Size</h2>
          <p>
            {raceResult?.size_raw}: {raceResult?.size}
          </p>
          <h2>Age</h2>
          <p>{raceResult?.age}</p>
          <h2>Alignment</h2>
          <p>{raceResult?.alignment}</p>
          <h2>Description</h2>
          <p>{raceResult?.desc}</p>

          {subraces.length > 0 && (
            <div>
              <h3>Subraces</h3>
              <ul>
                {subraces.map((subrace) => {
                  return (
                    <li key={subrace.name}>
                      <p>Name: {subrace.name}</p>
                      <p>Traits: {subrace.traits}</p>
                      <p>Description: {subrace.desc}</p>
                      <p>Asi Desc: {subrace.asi_desc}</p>
                      <p>
                        Asi attribute:value : {subrace.asi.attribute}-
                        {subrace.asi.value}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
