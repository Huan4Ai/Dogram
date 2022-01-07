import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../store/post";
import "./SinglePost.css"
import SinglePostLike from "./SinglePostLike";
import AddCommentSinglePost from "./AddCommentSingle";
import EditPostFormModal from "./EditPostIndex";
import DeletePost from "./DeletePost";
import { Link } from "react-router-dom";

function SinglePost() {
  const dispatch = useDispatch();
  const postId = useParams().postId;
  const SinglePost = useSelector(state => state?.post[postId]);
  const currentUserId = useSelector(state => state?.session?.user?.id);


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
          <>
            <img src={SinglePost?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
            <Link className="usernameOnPostcard" to={`/users/${SinglePost?.User?.id}`}>
              <p>{SinglePost?.User?.username}</p>
            </Link>
          </>
          {SinglePost?.User?.id === currentUserId &&
            <div className="editAndDeleteIcons">
              <EditPostFormModal post={SinglePost} />
              <DeletePost post={SinglePost} />
            </div>
          }
        </div>
        <div className="postcardComment">
          <div className="postOwnerInfo">
            <img src={SinglePost?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
            <Link className="usernameOnPostcard" to={`/users/${SinglePost?.User?.id}`}>
              <p>{SinglePost?.User?.username}</p>
            </Link>
            <p className="postDescriptonOnPostcard">{SinglePost?.description}</p>
          </div>
          {SinglePost?.Comments?.map((comment, index) =>
            <div key={index} className="postOwnerInfo">
              <img src={comment?.User?.profilePicture} alt="profilePicture" className="profilePictureOnPostcard" />
              <Link className="usernameOnPostcard" to={`/users/${comment?.User?.id}`}>
                <p>{comment?.User?.username}</p>
              </Link>
              <p className="postDescriptonOnPostcard">{comment?.content}</p>
            </div>
          )}

        </div>

        <div className="single-like-container">
          <SinglePostLike />
          <AddCommentSinglePost />
        </div>

      </div>


    </div>

  )



}

export default SinglePost;

//SinglePost?.Comments.map()
