import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comment";
import "./AllComments.css"
import DeleteComment from "./DeleteComment";
import EditCommentFormModal from "./EditIndex";
import { Link } from "react-router-dom";



function ShowAllComments({ post }) {
  const dispatch = useDispatch();
  const postId = post.id;
  const comments = useSelector(state => state.comment);


  const commentValues = Object.values(comments);


  const commentsOfSinglePost = commentValues.filter(comment => comment.post_id === postId)

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId, commentsOfSinglePost.length]);

  return (
    <div>
      {Object?.keys(commentsOfSinglePost)?.map((comment, index) =>
        <div key={index} className="usernameAndComment">
          <div>
            <span>
              <Link id="username" to={`/users/${commentsOfSinglePost[comment]?.User?.id}`}>
                {commentsOfSinglePost[comment]?.User?.username}
              </Link>
            </span>
            <span>{commentsOfSinglePost[comment]?.content}</span>
          </div>
          <div>
            <EditCommentFormModal singleComment={commentsOfSinglePost[comment]} />
            <DeleteComment singleComment={commentsOfSinglePost[comment]} />
          </div>
        </div>

      )}


    </div>



  );


}

export default ShowAllComments
