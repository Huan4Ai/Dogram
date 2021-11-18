import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from "./customLogo.jpg"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  return (
    <div className="navBar">

      <div className="left_logo">
        <NavLink to="/">
          <img src={logo} alt="Dogram Logo" className="left_logoImage" />
        </NavLink>
      </div>

      <div className="mid_search">
        <i className="fas fa-search" />
        <input type="text" placeholder="Search" className="center_inputField" />
      </div>

      <div className="right_header">
        <i class="far fa-plus-square" />
        <ProfileButton user={sessionUser} />
      </div>

    </div>
  )
}

export default Navigation;
