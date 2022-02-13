import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import logo from "./customLogo.jpg"
import CreatePostFormModal from '../Posts/AddIndex';
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from 'react-redux';
import { searchUsers } from '../../store/search';

function Navigation({ isLoaded }) {

  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchReducer);
  const results = Object.values(searchResults);

  console.log(results)

  useEffect(() => {
    if (input.length > 0) {
      dispatch(searchUsers(input));
    }
  }, [dispatch, input]);

  useEffect(() => {
    if (input) {
      setShowSearch(true)
    } else {
      setShowSearch(false)
    }
  }, [dispatch, input]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
    <div className="navBar">

      <div className="left_logo">
        <NavLink to="/">
          <img src={logo} alt="Dogram Logo" className="left_logoImage" />
        </NavLink>
      </div>

      <div className="mid_search">
        <i className="fas fa-search" />
        <input type="text" placeholder="Search" className="center_inputField" value={input} onChange={(e) => setInput(e.target.value)} />
        {showSearch &&
          Object.values(results).map((res) =>
            <div className='search-result-container' key={res.id}>
              <span>{res.username}</span>
            </div>
          )
        }
      </div>

      <div className="right_header">
        <CreatePostFormModal />
        <NavLink className="userProfile" to="/my-profile">
          <i className="far fa-user" />
        </NavLink>
        <div className='logoutButton'>
          <i className="fas fa-sign-out-alt" onClick={logout}></i>
        </div>
      </div>

    </div>
  )
}

export default Navigation;
