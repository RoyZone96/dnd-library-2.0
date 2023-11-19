import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


export default function TopNav(){
    return(
        <div className="navigation">
            <Navbar>
                <NavLink to='/'>
                    HOME | &nbsp;
                </NavLink>
                <NavLink to='/searches'>
                    LIBRARY INDEX | &nbsp;
                </NavLink>
            </Navbar>
        </div>
    )
}
