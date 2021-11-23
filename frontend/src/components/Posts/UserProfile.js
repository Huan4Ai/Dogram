import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";
import "./UserProfile.css";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";


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
    <div>
      <div className="userInfo">
        <div>
          <img src={user.profilePicture} className="profileP" />
        </div>
        <div>
          <h2>{username}</h2>
          <h4>{userPosts.length} Posts # Following # Followers</h4>
          <p>{user.about}</p>
        </div>
      </div>
      <div className="singlePost">
        {userPosts.map(post =>
          <div key={post.id}>
            <img src={post.photo_url} alt="postImage" className="AllPostImages" />
            <p>{post.description}</p>
            <EditPost post={post} />
            <DeletePost post={post} />
          </div>
          )}
      </div>
    </div>
  )



};

export default UserProfilePage;
