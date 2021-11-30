import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./customLogo.jpg"
import CreatePostFormModal from '../Posts/AddIndex';

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
        {/* <NavLink className="plusIcon" to="/new-post">
          <i className="far fa-plus-square" />
        </NavLink> */}
        <CreatePostFormModal />
        <NavLink className="userProfile" to="/my-profile">
          <i className="far fa-user" />
        </NavLink>
        <ProfileButton user={sessionUser} />
      </div>

    </div>
  )
}

export default Navigation;
