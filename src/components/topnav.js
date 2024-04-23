import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


export default function TopNav(){
    return(
        <div className="navigation clearfix">
            <h1 className='logo'>DnD Eternal Library</h1>
            <Navbar className='navlist'>    
                <NavLink className="nav-option" to='/'>
                    HOME &nbsp;
                </NavLink>
                <NavLink  className="nav-option" to='/searches'>
                    LIBRARY INDEX  &nbsp;
                </NavLink>
                <NavLink  className="nav-option" to='/searchPage'>
                    SEARCH PAGE INDEX  &nbsp;
                </NavLink>
            </Navbar>
        </div>
    )
}

