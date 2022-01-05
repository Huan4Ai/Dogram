import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import { createLike } from "../../store/post";
import { deleteLike } from "../../store/post";
import { Link } from "react-router-dom";
import "./Like.css"

function LikeAPost({ post }) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const userId = user.id;

  // let numOfLikes = post?.Likes?.length

  const [numOfLikes, setNumOfLikes] = useState(0);

  useEffect(() => {
    setNumOfLikes(post?.Likes?.length);
  }, [post, dispatch]);

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

  const addLike = async (e) => {
    e.preventDefault();
    const data = {
      user_id: userId,
      post_id: post.id
    };

    await dispatch(createLike(data, post.id));
    setNumOfLikes(numOfLikes + 1);
    await dispatch(getPosts());

  }

  const removeLike = async (e) => {
    const booleanResult = await dispatch(deleteLike(post?.id, userId));

    if (booleanResult) {
      setNumOfLikes(numOfLikes - 1);
    }
    await dispatch(getPosts());
  };

  return (
    <div className="likeContainer">

      {isLiked() ? (
        <div className="likeAndCommentIcon">
          <i className="fas fa-heart" onClick={removeLike} id="likeIcon-Red"></i>
          <Link to={`/posts/${post?.id}`} >
            <i className="far fa-comment" id="commentIcon"></i>
          </Link>
        </div>
      ) : (
        <div className="likeAndCommentIcon">
          <i className="far fa-heart" onClick={addLike}></i>
          <i className="far fa-comment" id="commentIcon"></i>
        </div>
      )}
      <p className="likeCount">{numOfLikes} {numOfLikes <= 1 ? "like" : "likes"}</p>
    </div>
  )


}

export default LikeAPost;
