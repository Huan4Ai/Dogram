import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getSinglePost } from "../../store/post";
import "./SinglePost.css"

function SinglePost() {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const SinglePost = useSelector(state => state?.post[postId]);

  console.log(SinglePost)

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);


  return (
    <div className="singlePostGridContainer">
      <div className="left-grid">
        <img src={SinglePost?.photo_url} alt="postImage" className="left-grid-image" />
      </div>

      <div>
        <p>hahaha</p>

      </div>


    </div>

  )



}

export default SinglePost;
