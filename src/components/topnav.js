import React from "react";
import { NavLink } from "react-router-dom";

export default function TopNav(){
    return(
        <div className="navigation">
        <ul className="menu">
            <li>
                <NavLink to='/'>
                    <p> HOME |</p>
                </NavLink></li>
            <li>
                <NavLink to='/searches'>
                    <p> LIBRARY INDEX | </p>
                </NavLink></li>
            
        </ul>
    </div>
    )
}

