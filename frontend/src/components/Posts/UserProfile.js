import { get } from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./UserProfile.css";

function UserProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.post);

  const username = user.username;
  const userId = user.id;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const postLists = Object.values(posts);

  const userPosts = postLists.filter(post => post.user_id == userId)
  // console.log(userPosts)


  return (
    <div>
      <div className="userInfo">
        <h2>{username}</h2>
        <h4>{userPosts.length} Posts # Following # Followers</h4>
      </div>
      <div className="singlePost">
        {userPosts.map(post =>
          <div key={post.id}>
            <img src={post.photo_url} alt="postImage" className="AllPostImages" />
            <p>{post.description}</p>
          </div>
          )}
      </div>
    </div>
  )



};

export default UserProfilePage;
