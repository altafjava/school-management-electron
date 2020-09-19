import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <h2>Admin Panel</h2>
      <nav className='main-nav'>
        <ul className='main-nav__items'>
          <li className='main-nav__item'>Home</li>
          <li className='main-nav__item'>Student</li>
          <li className='main-nav__item'>Teacher</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
