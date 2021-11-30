import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./AllPosts.css"
import ShowAllComments from "../Comments/AllComments";
import AddComment from "../Comments/AddComment";


function ShowAllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);



  return (
    <div className="AllPostContainer">
      {Object.keys(posts).map((post,index) =>
        <div key={index} className="singlePostContainer">
          <div className="userInfoOnPost">
            <img src={posts[post]?.User?.profilePicture} alt="profilePicture" className="profilePicture" />
            <span className="userName">{posts[post]?.User?.username}</span>
          </div>
          <img src={posts[post].photo_url} alt="postImage" className="AllPostImages" />
          <div className="usernameAndDescription">
            <p id="username">{posts[post]?.User?.username}</p>
            <p>{posts[post].description}</p>
          </div>
          <div>
            <ShowAllComments post={posts[post]} />
          </div>
          <div>
            <AddComment post={posts[post]} />
          </div>
        </div>

      )}
    </div>

  );
}

export default ShowAllPosts;
