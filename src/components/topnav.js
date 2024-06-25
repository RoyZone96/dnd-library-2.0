import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import LogoutButton from "./logout.js";

export default function TopNav() {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  });

  const hasToken = localStorage.getItem("token");

  return (
    <div className="navigation clearfix">
      <h1 className="logo">DnD Eternal Library</h1>
      <Navbar className="navlist">
        <NavLink className="nav-option" to="/">
          HOME &nbsp;
        </NavLink>
        {userRole === "admin" && (
          <NavLink className="nav-option" to="/admin">
            ADMIN &nbsp;
          </NavLink>
        )}
        <NavLink className="nav-option" to="/searchPage">
          SEARCH PAGE INDEX &nbsp;
        </NavLink>
        {hasToken && (
          <>
            <NavLink className="nav-option" to="/myProfile">
              MY PROFILE &nbsp;
            </NavLink>
          </>
        )}
        {!hasToken && (
          <>
            <NavLink className="nav-option" to="/registration">
              REGISTRATION &nbsp;
            </NavLink>
            <NavLink className="nav-option" to="/login">
              LOGIN &nbsp;
            </NavLink>
          </>
        )}
        {hasToken && (
          <>
            <LogoutButton />
          </>
        )}
      </Navbar>
    </div>
  );
}