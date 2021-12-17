import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Like.css"

function LikeAPost({ post }) {

  const user = useSelector(state => state.session.user);
  const userId = user.id;

  let numOfLikes = post?.Likes?.length



  const isLiked = () => {
    let likes = post.Likes;

    if (likes) {
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].user_id === userId) {
          return true
        }
      }
    }
    return false;
  }

  return (
    <div className="likeContainer">
      {/* <div className="likeIcon">
        <i class="far fa-heart"></i>
      </div> */}
      {/* <div className="likeIcon-Red">
        <i class="fas fa-heart"></i>
      </div> */}
      {isLiked ? (
        <div className="likeIcon-Red">
          <i className="fas fa-heart"></i>
        </div>
      ) : (
          <div className="likeIcon">
            <i className="far fa-heart"></i>
          </div>
      )}
      <p className="likeCount">{numOfLikes} {numOfLikes <= 1 ? "like" : "likes"}</p>
    </div>
  )


}

export default LikeAPost;
