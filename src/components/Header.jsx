import React from 'react'
//import Header from './TopBar';
import Navbar from './Navbar';
import SiteLocation from './SiteLocation';


const Header = () =>  {
  return (
    <div className="header">
      {/*<TopBar />*/}
      <Navbar />
      <SiteLocation />
    </div>
  )
}

export default Header
