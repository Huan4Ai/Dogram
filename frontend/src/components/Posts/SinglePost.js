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

  console.log(SinglePost?.Comments);

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
          {/* {Object?.keys(SinglePost)?.map(post =>
            <span>{SinglePost?.[post]?.User?.username}</span>
          )} */}
          {/* <p>{SinglePost?.Comments?.[0]?.User?.username}</p> */}
          {SinglePost?.Comments.map((comment, index) =>
            <p key={index}>{comment?.User?.username}</p>
            )}

        </div>
      </div>


    </div>

  )



}

export default SinglePost;

//SinglePost?.Comments.map()
