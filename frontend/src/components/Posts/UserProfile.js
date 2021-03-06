import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/post";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { getSingleUser } from "../../store/user";

function UserProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.post);
  const numOfFollowers = useSelector(
    (state) => state?.userReducer?.followers?.length
  );
  const numOfFollowing = useSelector(
    (state) => state?.userReducer?.following?.length
  );

  const username = user?.username;
  const userId = user?.id;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  const postLists = Object.values(posts);

  const userPosts = postLists.filter((post) => post.user_id === userId);

  const numOfPosts = userPosts.length;

  return (
    <div className="myProfilePageWrapper">
      <div className="profile-header">
        <img src={user.profilePicture} className="profileP" alt="userProfile" />
        <div className="profileRight">
          <div className="profileRight-top">
            <div className="user-name">{username}</div>
          </div>
          <div className="prof-count">
            <div>
              <span className="counter">{numOfPosts}</span> posts
            </div>
            <div>
              <span className="counter">{numOfFollowing}</span> followers
            </div>
            <div>
              <span className="counter">{numOfFollowers}</span> following
            </div>
          </div>
          <p className="about">{user.about}</p>
        </div>
      </div>
      <div className="posts-icon">
        <svg
          aria-label=""
          className="_8-yf5 "
          color="#8e8e8e"
          fill="#8e8e8e"
          height="12"
          role="img"
          viewBox="0 0 24 24"
          width="12"
        >
          <rect
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            width="18"
            x="3"
            y="3"
          ></rect>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="9.015"
            x2="9.015"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="14.985"
            x2="14.985"
            y1="3"
            y2="21"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="21"
            x2="3"
            y1="9.015"
            y2="9.015"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="21"
            x2="3"
            y1="14.985"
            y2="14.985"
          ></line>
        </svg>
        <span>POSTS</span>
      </div>
      <div className="user_posts_wrapper">
        {userPosts.map((post) => (
          <div key={post.id} className="post_image_wrapper">
            <Link to={`/posts/${post?.id}`}>
              <img
                src={post.photo_url}
                alt="postImage"
                className="postImageProfilePage"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfilePage;
