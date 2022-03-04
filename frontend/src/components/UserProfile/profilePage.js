import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../store/user";
import { Link } from "react-router-dom";
import "./profilePage.css";
import { createFollowThunk } from "../../store/user";
import { deleteFollowThunk } from "../../store/user";

function SingleUserProfile() {
  const dispatch = useDispatch();
  const userId = useParams()?.userId;

  const user = useSelector((state) => state?.userReducer);
  const username = user?.username;
  const posts = user?.Posts;

  const sessionUser = useSelector((state) => state?.session?.user);

  const numOfFollowers = useSelector(
    (state) => state?.userReducer?.followers?.length
  );
  const numOfFollowing = useSelector(
    (state) => state?.userReducer?.following?.length
  );

  const [followers, setFollowers] = useState(numOfFollowers);

  const numOfPosts = posts?.length;

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  const createFollow = async (e) => {
    e.preventDefault();
    const data = {
      followerId: userId,
      followingId: sessionUser.id,
    };

    await dispatch(createFollowThunk(data, userId));
    await dispatch(getSingleUser(userId));
  };

  const isFollowed = () => {
    const follows = user?.following;
    if (follows) {
      for (let i = 0; i < follows.length; i++) {
        let follow = follows[i];
        if (follow.followerId === sessionUser?.id) {
          return true;
        }
      }
    }
    return false;
  };

  const deleteFollow = async () => {
    await dispatch(deleteFollowThunk(sessionUser.id, user.id));
    await dispatch(getSingleUser(userId));
  };


  return (
    <div className="myProfilePageWrapper">
      <div className="profile-header">
        <img
          src={user?.profilePicture}
          className="profileP"
          alt="userProfile"
        />
        <div className="profileRight">
          <div className="usernameAndFollow">
            <div className="user-name">{username}</div>
            {/* {sessionUser.id == userId ? null : (
              <button className="follow-button" onClick={createFollow}>
                Follow
              </button>
            )} */}
            {sessionUser.id !== user.id && (
              <>
                {!isFollowed() ? (
                  <button className="follow-button" onClick={createFollow}>
                    Follow
                  </button>
                ) : (
                  <button onClick={deleteFollow} className="unfollowButton">
                    <img
                      src={
                        "https://img.icons8.com/material-sharp/24/000000/checked-user-male.png"
                      }
                      alt=""
                    ></img>
                  </button>
                )}
              </>
            )}
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
        {posts?.map((post) => (
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

export default SingleUserProfile;
