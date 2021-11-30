import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comment";

function DeleteComment({ singleComment }) {

  const dispatch = useDispatch();

  const userIdPassed = singleComment.user_id;
  const currentUserId = useSelector((state) => state.session.user.id);


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(singleComment?.id))
  }

  if (userIdPassed === currentUserId) {
    return (
      <>
        <i className="far fa-trash-alt" onClick={handleDelete}></i>
      </>
  )

  } else {
    return null
  }



}

export default DeleteComment;
