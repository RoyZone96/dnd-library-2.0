import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './customTheme.css'; // Make sure to create this CSS file

export default function SearchQuery({ callbackFunc }) {
    let [query, setQuery] = useState("");

    let getSearchResult = (event) => {
        event.preventDefault();
        callbackFunc(query);
    }

    return (
        
        <div className="fantasy-container">
            <form className="fantasy-form" onSubmit={getSearchResult}>
                <input 
                    className="fantasy-input" 
                    type="text" 
                    placeholder="Search ancient tomes..." 
                    aria-label="Search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value.toLowerCase())}
                />
                <button className="fantasy-button" type="submit">Search</button>
            </form>
            <p className="fantasy-query-display">Value of searchQuery: {query}</p>
        </div>
    );
}
