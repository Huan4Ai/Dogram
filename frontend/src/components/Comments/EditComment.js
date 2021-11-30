import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updataComment } from "../../store/comment";
import { getComments } from "../../store/comment";

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
  }, [dispatch, content]);


  return (
    <div>
      <h3>Edit a comment</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="description" value={content} onChange={(e) => setContent(e.target.value)} required/>
        </label>
        <div>
          <button type="submit">Edit comment</button>
        </div>
      </form>
    </div>
  )


}

export default EditCommentForm
