import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updataComment } from "../../store/comment";
import { getComments } from "../../store/comment";

function EditCommentIndex({ singleComment }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const id = singleComment.id;
  const userIdPassed = singleComment.user_id;
  const user_id = useSelector((state) => state.session.user.id);
  const post_id = singleComment.post_id;

  const [content, setContent] = useState("");

  const reset = () => {
    setContent("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id,
      user_id,
      post_id,
      content
    };
    console.log(data);
    let editedComment = await dispatch(updataComment(data));

    if (editedComment) {
      reset();
    }


  }

  useEffect(() => {
    dispatch(getComments(post_id))
  }, [dispatch, post_id, content]);

  if (userIdPassed === user_id) {
    return (
      <div>
        <h3>Edit a comment</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="description" value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
          <button type="submit">Edit comment</button>
        </form>
      </div>
    )

  } else {
    return null
  }


}

export default EditCommentIndex
