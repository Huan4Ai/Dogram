import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../store/user";
import { Link } from "react-router-dom";


function SingleUserProfile() {
  const dispatch = useDispatch();
  const userId = useParams()?.userId;

  const user = useSelector(state => state?.userReducer);
  const username = user?.username;
  const posts = user?.Posts;


  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);



  return (

    <div className="myProfilePageWrapper">
      <div className="profile-header">
        <div>
          <img src={user?.profilePicture} className="profileP" alt="userProfile" />
        </div>
        <div className="profileRight">
          <div className="user-info">
            <h2>{username}</h2>
          </div>
          <div className="about">
            <p>{user?.about}</p>
          </div>
        </div>
      </div>
      <div className="user_posts_wrapper">
        {posts?.map(post =>
          <div key={post.id} className="post_image_wrapper">
            <Link to={`/posts/${post?.id}`}>
              <img src={post.photo_url} alt="postImage" className="postImageProfilePage" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );



}

export default SingleUserProfile;
