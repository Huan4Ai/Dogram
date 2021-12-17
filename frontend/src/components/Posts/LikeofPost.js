import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Like.css"

function LikeAPost({post}) {

  console.log(post.Likes.length)

  let numOfLikes = post?.Likes?.length
  return (
    <div className="likeContainer">
      <div className="likeIcon">
        <i class="far fa-heart"></i>
      </div>
      <div className="likeIcon-Red">
        <i class="fas fa-heart"></i>
      </div>
      <p className="likeCount">{numOfLikes} {numOfLikes <= 1 ? "like" : "likes"}</p>
    </div>
  )


}

export default LikeAPost;
