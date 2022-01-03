import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./UserProfile.css";
import DeletePost from "./DeletePost";
import EditPostFormModal from "./EditPostIndex";


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
        <div>
          <img src={user.profilePicture} className="profileP" alt="userProfile" />
        </div>
        <div className="profileRight">
          <div className="user-info">
            <h2>{username}</h2>
          </div>
          <div className="about">
            <p>{user.about}</p>
          </div>
        </div>
      </div>
      <div className="user_posts_wrapper">
        {userPosts.map(post =>
          <div key={post.id} className="post_image_wrapper">
            <img src={post.photo_url} alt="postImage" className="postImageProfilePage" />
            {/* <p>{post.description}</p> */}
            <div className="editAndDeleteIcons">
              <EditPostFormModal post={post} />
              <DeletePost post={post} />
            </div>
          </div>
          )}
      </div>
    </div>
  )



};

export default UserProfilePage;
