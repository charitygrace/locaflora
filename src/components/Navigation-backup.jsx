import React from 'react'
import { Link, NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/" className="navbar-brand">Local Flora</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navMain">
        <ul className="navbar-nav mr-auto">
          <NavLink
            className="nav-link"
            to={{
              pathname: `/`
            }}
          >
            Plants
          </NavLink>
          {/*
          <NavLink
            className="nav-link"
            to={{
              pathname: `/resources`
            }}
          >
            Resources
          </NavLink>*/}
          <NavLink
            className="nav-link"
            to={{
              pathname: `/about`
            }}
          >
            About
          </NavLink>
          <NavLink
            className="nav-link"
            to={{
              pathname: `/donate`
            }}
          >
            Donate
          </NavLink>
          <NavLink
            className="nav-link"
            to={{
              pathname: `/contact`
            }}
          >
            Contact
          </NavLink>

        </ul>
      </div>
    </nav>
  )
}

export default Navigation
