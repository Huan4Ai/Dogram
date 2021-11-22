import React from "react";
import { deletePost } from "../../store/post";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function DeletePost({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const postId = post.id;

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedPost = await dispatch(deletePost(postId));

    if (deletedPost) {
      history.push("/");
    }


  }



  if (post !== null || post !== undefined) {
    return (
      <div>

        <form onSubmit={handleDelete}>
          <button type="submit">Delete</button>
        </form>

      </div>


    );
  }

  return null

}

export default DeletePost;
