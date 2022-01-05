import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getSinglePost } from "../../store/post";
import "./SinglePost.css"
import SinglePostLike from "./SinglePostLike";

function SinglePost() {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const SinglePost = useSelector(state => state?.post[postId]);


  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);


  return (
    <div className="singlePostGridContainer">
      {/* <div className="left-grid"> */}
      <img src={SinglePost?.photo_url} alt="postImage" className="left-grid-image" />
      {/* </div> */}

      <div className="right-Post-Part">
        <div className="postOwnerInfo">
          <img src={SinglePost?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
          <p className="usernameOnPostcard">{SinglePost?.User?.username}</p>
        </div>
        <div className="postcardComment">
          <div className="postOwnerInfo">
            <img src={SinglePost?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
            <p className="usernameOnPostcard">{SinglePost?.User?.username}</p>
            <p className="postDescriptonOnPostcard">{SinglePost?.description}</p>
          </div>
          {SinglePost?.Comments.map((comment, index) =>
            <div key={index} className="postOwnerInfo">
              <img src={comment?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
              <p className="usernameOnPostcard">{comment?.User?.username}</p>
              <p className="postDescriptonOnPostcard">{comment?.content}</p>
            </div>
          )}

        </div>

        <div className="single-like-container">
          <SinglePostLike />
        </div>

      </div>


    </div>

  )



}

export default SinglePost;

//SinglePost?.Comments.map()
