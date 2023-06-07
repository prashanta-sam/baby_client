
import React from 'react';
import { Link } from 'react-router-dom'
import siteConfig from '../../siteConfig';
const MyHeader = () => {
  return(
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">{siteConfig.siteName}</Link>
        <div className="right">
          <button><Link to="/">Home</Link></button>
          <button><Link to="/faq">FAQ</Link></button>
          <button><Link to="/about-us">About Us</Link></button>
        </div>
      </div>
    </nav>  
  )
}

export default MyHeader;