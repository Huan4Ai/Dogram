import React from "react";
import { deletePost } from "../../store/post";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeletePost({ post, onClose }) {
  const dispatch = useDispatch();
  const postId = post.id;
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
    history.push("/my-profile");
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    onClose();
  };



  return (
    <div className="deleteModalContainer">
      <div className="delete-top">
        <p className="del-title">Delete Post?</p>
        <p className="del-desc">Are you sure you want to delete this post?</p>
      </div>
      <div className="delete-comment-button" onClick={handleDelete}>Delete</div>
      <div className="cancel-delete-comment" onClick={handleCancelClick}>Cancel</div>
    </div>
  );



}

export default DeletePost;
