import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comment";
import "./AllComments.css"
import DeleteComment from "./DeleteComment";

function ShowAllComments({ post }) {
  const dispatch = useDispatch();
  const postId = post.id;
  const comments = useSelector(state => state.comment);


  const commentValues = Object.values(comments);


  const commentsOfSinglePost = commentValues.filter(comment => comment.post_id === postId)

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId, commentsOfSinglePost.length]);


  return (
    <div>
      {Object?.keys(commentsOfSinglePost)?.map((comment, index) =>
        <div key={index} className="usernameAndComment">
          <span id="username">{commentsOfSinglePost[comment]?.User?.username}</span>
          <span>{commentsOfSinglePost[comment]?.content}</span>
          <DeleteComment singleComment={commentsOfSinglePost[comment]} />
        </div>

      )}


    </div>



  );


}

export default ShowAllComments
