import {useState, React} from "react";

export default function SearchQuery({propComponent}) {
    let [query, setQuery] = useState("Come noble traveler, bring forth your questions.")

    const Wrapper = ({propComponent}) => (
        <div>
          <div>header</div>
          <div>{propComponent}</div>
          <div>footer</div>
        </div>
      )

    let getSearchResult = (event) => {
        console.log(propComponent)
        event.preventDefault();
        console.log('clicked')
      
        // axios.get(url + `${searchQuery}`).then((response) => {
        //     console.log(response);
        //   }).catch(error => console.log(error))
      }

    return (
    <div>
        <label>Search Query: </label>
        <input type="text" onChange={(event) => setQuery(event.target.value)}
        />
        <button onClick={getSearchResult}>Search</button>
        <p>Value of searchQuery: {query}</p>
        <Wrapper />
    </div>
    )
}