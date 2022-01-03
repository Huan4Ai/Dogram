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

  const current_username = useSelector((state) => state.session.user.username);

  const [content, setContent] = useState(singleComment.content);

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

  const handleCancelClick = (e) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    dispatch(getComments(post_id))
  }, [dispatch, post_id, content]);


  return (
    <form onSubmit={handleSubmit} className="editCommentContainer">
      <p id="usernameTitle">{current_username}</p>
      <div>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="editCommentInput" placeholder="Edit your comment here." required />
      </div>
      <div className="editCommentButtons">
        <button type="submit" id="submitButtonModal">Submit</button>
        <button type="button" onClick={handleCancelClick} id="cancelButtonModal">Cancel</button>
      </div>
    </form>
  )


}

export default EditCommentForm
