import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comment";
import "./DeleteIndex.css";


function DeleteComment({ singleComment, onClose }) {

  const dispatch = useDispatch();


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(singleComment?.id));
    onClose();
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    onClose();
  };


  return (
    <div className="deleteModalContainer">
      <div className="delete-top">
        <p className="del-title">Delete Comment?</p>
        <p className="del-desc">Are you sure you want to delete this comment?</p>
      </div>
      <div className="delete-comment-button" onClick={handleDelete}>Delete</div>
      <div className="cancel-delete-comment" onClick={handleCancelClick}>Cancel</div>
    </div>
  )



}

export default DeleteComment;
