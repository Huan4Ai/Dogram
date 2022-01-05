import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../store/post";
import { createLike } from "../../store/post";
import { deleteLike } from "../../store/post";

function SinglePostLike() {

  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const userId = user.id;
  const postId = useParams().postId;
  const post = useSelector(state => state?.post[postId]);

  const [numOfLikes, setNumOfLikes] = useState(0);

  useEffect(() => {
    setNumOfLikes(post?.Likes?.length);
  }, [post, dispatch]);

  const isLiked = () => {
    let likes = post?.Likes;

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
    await dispatch(getSinglePost(postId));

  }

  const removeLike = async (e) => {
    const booleanResult = await dispatch(deleteLike(post?.id, userId));

    if (booleanResult) {
      setNumOfLikes(numOfLikes - 1);
    }
    await dispatch(getSinglePost(postId));
  };

  return (
    <div className="likeContainer">

      {isLiked() ? (
        <div className="likeAndCommentIcon">
          <i className="fas fa-heart" onClick={removeLike} id="likeIcon-Red"></i>
          <i className="far fa-comment" id="commentIcon"></i>
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

export default SinglePostLike
