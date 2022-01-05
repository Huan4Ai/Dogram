import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./AllPosts.css"
import ShowAllComments from "../Comments/AllComments";
import AddComment from "../Comments/AddComment";
import LikeAPost from "./LikeofPost";
import { Link } from "react-router-dom";


function ShowAllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post);

  const postsArray = Object.keys(posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, postsArray.length]);



  return (
    <div className="AllPostContainer">
      {Object.keys(posts).map((post,index) =>
        <div key={index} className="singlePostContainer">
          <div className="userInfoOnPost">
            <img src={posts[post]?.User?.profilePicture} alt="profilePicture" className="profilePicture" />
            <span className="userName">{posts[post]?.User?.username}</span>
          </div>
          <img src={posts[post].photo_url} alt="postImage" className="AllPostImages" />
          <LikeAPost post={posts[post]} />
          <div className="usernameAndDescription">
            <p id="username">{posts[post]?.User?.username}</p>
            <p>{posts[post].description}</p>
          </div>
          {/* <Link to={`/posts/${posts[post]?.id}`} className="linkToPostDetail">
            <span>View post detail</span>
          </Link> */}
          <div>
            <ShowAllComments post={posts[post]} />
          </div>
          <div>
            <AddComment post={posts[post]} />
          </div>
        </div>

      ).reverse()}
    </div>

  );
}

export default ShowAllPosts;
