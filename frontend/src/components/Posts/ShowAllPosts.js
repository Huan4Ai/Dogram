import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./AllPosts.css"
import EditPost from "./EditPost";

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
          <img src={posts[post].photo_url} alt="postImage" className="AllPostImages" />
          <p>{posts[post].description}</p>
          <EditPost post={posts[post]} />
        </div>

      )}
    </div>

  );
}

export default ShowAllPosts;
