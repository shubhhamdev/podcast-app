import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  window.addEventListener('scroll', () => {
    setScrolled(window.scrollY > 0);
  });
  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
    <div className='menu-bar' onClick={handleMenuToggle}>
      <div className={`menu-icon ${menuVisible ? 'open' : ''}`}></div>
      <div className={`menu-icon ${menuVisible ? 'open' : ''}`}></div>
      <div className={`menu-icon ${menuVisible ? 'open' : ''}`}></div>
    </div>
        <div className="gradient"></div>
        <div className={`links ${menuVisible ? 'visible' : ''}`}>
              <NavLink to='/' onClick={handleLinkClick}>Signup</NavLink>
              <NavLink to='/podcast'>Podcasts</NavLink>
              <NavLink to='/start-a-podcast'>Start A Podcast</NavLink>
              <NavLink to='/profile'>Profile</NavLink>
        </div>
    </div>
  )
}

export default Header
