import React from 'react'
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">Project Locaflora</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navMain">
        <ul className="navbar-nav mr-auto">
            <NavLink

              className="nav-link"
              activeClassName="active"
              to={{
                  pathname: `/locaflora`
                }}
            >
              Home
              </NavLink>

        </ul>
      </div>
    </nav>
    )
}

export default Navbar
