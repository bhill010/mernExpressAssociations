import React from 'react';
import '../style/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="header">
      <span className="">/users</span>
      <span className="">RESTful Routes</span>
      <span className="">Github</span>
      <Link className="btn btn-info" to="/users/register">REGISTER</Link>
    </nav>
  )
}

export default Header;
