import React from 'react'
import { useLocation } from "react-router-dom"
// import { Link, NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Navbar expand="sm">
        <Navbar.Brand href="/">Local Flora</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navMain">
        <Nav defaultActiveKey="/" activeKey={currentPath} className="mr-auto">
            <Nav.Link href="/">Plants</Nav.Link>
            {/*<Nav.Link href="/resources">Resources</Nav.Link>*/}
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/donate">Donate</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
