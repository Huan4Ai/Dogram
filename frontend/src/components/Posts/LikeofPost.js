import React from "react";
import { useState ,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import { createLike } from "../../store/post";
import { deleteLike } from "../../store/post";
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
      {/* <div className="likeIcon">
        <i class="far fa-heart"></i>
      </div> */}
      {/* <div className="likeIcon-Red">
        <i class="fas fa-heart"></i>
      </div> */}
      {isLiked() ? (
        <div className="likeIcon-Red">
          <i className="fas fa-heart" onClick={removeLike}></i>
        </div>
      ) : (
          <div className="likeIcon">
            <i className="far fa-heart" onClick={addLike}></i>
          </div>
      )}
      <p className="likeCount">{numOfLikes} {numOfLikes <= 1 ? "like" : "likes"}</p>
    </div>
  )


}

export default LikeAPost;
