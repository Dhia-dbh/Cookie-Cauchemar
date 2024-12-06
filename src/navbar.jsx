// src/App.js


import React, { useState } from 'react';
import logoRaceForWater from './assets/race for water.jpg';
const Navbar = ({setCurrentPage}) => {

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <a className="nav-link disabled" href="#">
        <img src={logoRaceForWater} width="50" height="50" alt="Logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarNavAltMarkup"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`navbar-collapse ${isCollapsed ? 'collapse' : 'show'}`}
        id="navbarNav"
      >
        <div className="navbar-nav">
          <a className="nav-item nav-link active" onClick={()=>{setCurrentPage('acceuil')}}>
            Accueil
          </a>
          <a className="nav-item nav-link active" href="#" onClick={()=>{setCurrentPage('podcast')}}>
            Podcast
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
