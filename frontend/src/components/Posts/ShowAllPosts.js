import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";

function ShowAllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);



  return (
    <div>
      {Object.keys(posts).map(post =>
        <div key={posts[post].id}>
          <p>{posts[post].description}</p>
        </div>


      )}
    </div>

  );
}

export default ShowAllPosts;
