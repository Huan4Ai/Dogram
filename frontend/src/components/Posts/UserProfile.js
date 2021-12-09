import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./UserProfile.css";
import DeletePost from "./DeletePost";
import EditPostFormModal from "./EditPostIndex";
import * as sessionActions from '../../store/session';


function UserProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.post);

  const username = user.username;
  const userId = user.id;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const postLists = Object.values(posts);

  const userPosts = postLists.filter(post => post.user_id === userId)

  return (
    <div>
      <div className="userInfo">
        <div>
          <img src={user.profilePicture} className="profileP" alt="userProfile" />
        </div>
        <div className="profileRight">
          <div className="usernameAndLogout">
            <h2>{username}</h2>
            <button onClick={logout}>Log Out</button>
          </div>
          <div className="about">
            <p>{user.about}</p>
          </div>
        </div>
      </div>
      <div className="singlePost">
        {userPosts.map(post =>
          <div key={post.id}>
            <img src={post.photo_url} alt="postImage" className="AllPostImages" />
            <p>{post.description}</p>
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
