import React from 'react'
import TopBar from './TopBar'
import Navbar from './Navbar'
import SiteLocation from './SiteLocation'


const Header = (props) =>  {
  return (
    <div className="header">
      {<TopBar plants={props.plants} />}
      <Navbar />
      <SiteLocation country={props.country} state={props.state} />
    </div>
  )
}

export default Header
