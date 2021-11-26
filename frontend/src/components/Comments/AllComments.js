import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comment";

function ShowAllComments({ post }) {
  const dispatch = useDispatch();
  const postId = post.id;
  const comments = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId]);

  const commentValues = Object.values(comments);


  const commentsOfOne = commentValues.filter(comment => comment.post_id === postId)

  console.log(commentsOfOne)



  return (
    <div>
      {Object?.keys(commentsOfOne)?.map((comment, index) =>
      <div key={index}>
          <p>{commentsOfOne[comment]?.content}</p>
      </div>

      )}


    </div>



  );


}

export default ShowAllComments
