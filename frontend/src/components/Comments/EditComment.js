import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updataComment } from "../../store/comment";
import { getComments } from "../../store/comment";
import "./EditComment.css"

function EditCommentForm({ singleComment, onClose }) {

  const dispatch = useDispatch();

  const id = singleComment.id;
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

    let editedComment = await dispatch(updataComment(data));

    if (editedComment) {
      reset();
      onClose();
    }

  }

  useEffect(() => {
    dispatch(getComments(post_id))
  }, [dispatch, post_id, content]);


  return (
    <div className="editCommentContainer">
      <h3>Edit a comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='comment'>Comment:</label>
        </div>
        <div>
          <input id='comment' type="text" value={content} onChange={(e) => setContent(e.target.value)} required/>
        </div>
        <div>
          <button type="submit" id="editButton">Edit comment</button>
        </div>
      </form>
    </div>
  )


}

export default EditCommentForm
