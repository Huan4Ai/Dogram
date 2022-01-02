import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from "./customLogo.jpg"
import CreatePostFormModal from '../Posts/AddIndex';
import * as sessionActions from "../../store/session"

function Navigation({ isLoaded }){


  return (
    <div className="navBar">

      <div className="left_logo">
        <NavLink to="/">
          <img src={logo} alt="Dogram Logo" className="left_logoImage" />
        </NavLink>
      </div>

      {/* <div className="mid_search">
        <i className="fas fa-search" />
        <input type="text" placeholder="Search" className="center_inputField" />
      </div> */}

      <div className="right_header">
        <CreatePostFormModal />
        <NavLink className="userProfile" to="/my-profile">
          <i className="far fa-user" />
        </NavLink>
        <i class="fas fa-sign-out-alt"></i>
      </div>

    </div>
  )
}

export default Navigation;
