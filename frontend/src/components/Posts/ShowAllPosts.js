import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./AllPosts.css"


function ShowAllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);




  return (
    <div className="AllPostContainer">
      {Object.keys(posts).map((post,index) =>
        <div key={index}>
          <div className="userInfoOnPost">
            <img src={posts[post]?.User?.profilePicture} alt="profilePicture" className="profilePicture" />
            <span className="userName">{posts[post]?.User?.username}</span>
          </div>
          <img src={posts[post].photo_url} alt="postImage" className="AllPostImages" />
          <p>{posts[post].description}</p>
        </div>

      )}
    </div>

  );
}

export default ShowAllPosts;
