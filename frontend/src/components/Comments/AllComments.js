import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comment";

function ShowAllComments({ post }) {
  const dispatch = useDispatch();
  const postId = post.id

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId]);



  return null;


}

export default ShowAllComments
