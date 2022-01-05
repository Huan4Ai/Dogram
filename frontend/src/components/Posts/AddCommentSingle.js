import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comment";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../store/post";


function AddCommentSinglePost() {
  const dispatch = useDispatch();

  const user_id = useSelector((state) => state.session?.user?.id);
  const post_Id = useParams().postId;
  const post = useSelector(state => state?.post[post_Id]);

  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id,
      post_Id,
      content
    };
    let createdComment = await dispatch(createComment(data, post_Id));
    if (createdComment) {
      setContent("");
      await dispatch(getSinglePost(post_Id));
    }
  }

  return (
    <div className="addCommentContainer">
      <form onSubmit={handleSubmit} className="addCommentForm">
        <input id='content' type="text" placeholder="Add a comment.." className="commentInputField" onChange={(e) => setContent(e.target.value)} value={content} required />
        <button type="submit" id="addCommentButton">Post</button>
      </form>
    </div>
  )

}

export default AddCommentSinglePost;
