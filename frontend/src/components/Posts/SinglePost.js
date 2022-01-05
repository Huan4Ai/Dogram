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


  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);


  return (
    <div className="singlePostGridContainer">
      {/* <div className="left-grid"> */}
      <img src={SinglePost?.photo_url} alt="postImage" className="left-grid-image" />
      {/* </div> */}

      <div>
        <div className="postOwnerInfo">
          <img src={SinglePost?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
          <span className="usernameOnPostcard">{SinglePost?.User?.username}</span>
        </div>
        <div className="postcardComment">
          {SinglePost?.Comments.map((comment, index) =>
            <div key={index} className="postOwnerInfo">
              <img src={comment?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
              <span className="usernameOnPostcard">{comment?.User?.username}</span>
            </div>
            )}

        </div>
      </div>


    </div>

  )



}

export default SinglePost;

//SinglePost?.Comments.map()
