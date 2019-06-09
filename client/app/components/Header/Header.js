import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
   

    <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
    <Link className="navbar-brand" to="/home">Warrior online store</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to="/" className="nav-link">Sign In/ Sign Up</Link>        
      </li>
      <li className="nav-item active">
        <Link to="/product"  className="nav-link">Product</Link>      
      </li>

      <li className="nav-item active">
        <Link to="/rule"  className="nav-link">Terms and Conditions</Link>       
      </li>   

      <li className="nav-item active">
        <Link to="/profile"  className="nav-link">Profile</Link>       
      </li>

      <li className="nav-item active">
        <Link to="/order"  className="nav-link">OrderList</Link>       
      </li>            
   
    </ul>
    </div>
    </nav>

  
  </header>
);

export default Header;
