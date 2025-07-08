import React from 'react'
import './Header.css'; 
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <div className="header">
        <h1>Liga</h1>
        <h1>League</h1>
        <div className="pages">
          <nav>
            <Link to="/home" className="plain-text-link">
              <h2 className="home">HOME</h2>
            </Link>
          </nav>
          <nav>
            <Link to="/players" className="plain-text-link">
              <h2>PLAYERS</h2>
            </Link>
          </nav>
          <nav>
            <Link to="/team" className="plain-text-link">
              <h2>MY TEAM</h2>
            </Link>
          </nav>
          </div>
        </div>

    </div>
  )
}

export default Header;