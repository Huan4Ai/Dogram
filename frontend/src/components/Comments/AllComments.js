import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comment";
import "./AllComments.css"

function ShowAllComments({ post }) {
  const dispatch = useDispatch();
  const postId = post.id;
  const comments = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId]);

  const commentValues = Object.values(comments);


  const commentsOfSinglePost = commentValues.filter(comment => comment.post_id === postId)


  return (
    <div>
      {Object?.keys(commentsOfSinglePost)?.map((comment, index) =>
        <div key={index} className="usernameAndComment">
          <span id="username">{commentsOfSinglePost[comment]?.User?.username}</span>
          <span>{commentsOfSinglePost[comment]?.content}</span>
        </div>

      )}


    </div>



  );


}

export default ShowAllComments
