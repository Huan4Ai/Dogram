import React from "react";
import { deletePost } from "../../store/post";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function DeletePost({ post }) {
  const dispatch = useDispatch();
  const postId = post.id;
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
    history.push("/my-profile");
  }




  return (
    <div>
      <i className="far fa-trash-alt" onClick={handleDelete}></i>
    </div>


  );




}

export default DeletePost;
