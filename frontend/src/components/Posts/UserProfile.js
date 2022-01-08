import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./UserProfile.css";
import { Link } from "react-router-dom";


function UserProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.post);

  const username = user.username;
  const userId = user.id;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);


  const postLists = Object.values(posts);

  const userPosts = postLists.filter(post => post.user_id === userId)

  return (
    <div className="myProfilePageWrapper">
      <div className="profile-header">
        <img src={user.profilePicture} className="profileP" alt="userProfile" />
        <div className="profileRight">
          <h2 className="user-info">{username}</h2>
          <p className="about">{user.about}</p>
        </div>
      </div>
      {/* <div>
        <p>haha</p>
      </div> */}
      <div className="user_posts_wrapper">
        {userPosts.map(post =>
          <div key={post.id} className="post_image_wrapper">
            <Link to={`/posts/${post?.id}`}>
              <img src={post.photo_url} alt="postImage" className="postImageProfilePage" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )



};

export default UserProfilePage;
