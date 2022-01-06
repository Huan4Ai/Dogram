import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/post";
import { useEffect } from "react";
import { getSinglePost } from "../../store/post";
import "./EditPost.css";

function EditPost({ post, onClose }) {
  const dispatch = useDispatch();
  const id = post.id;
  const user_id = post.user_id;
  const photo_url = post.photo_url;
  const username = post?.User.username;

  const [description, setDescription] = useState(post.description);

  const reset = () => {
    setDescription("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id,
      user_id,
      description,
      photo_url
    };

    let editedPost = await dispatch(updatePost(data));

    if (editedPost) {
      reset();
      onClose();
    }

  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    dispatch(getSinglePost(post?.id))
  }, [dispatch, post?.id]);


  return (

    // <div className="editPostContainer">
    //   <h3>Edit a post</h3>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor='edit'>Edit description:</label>
    //     </div>
    //     <div>
    //       <input id='edit' type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
    //     </div>
    //     <div>
    //       <button type="submit" id="editPostButton">Edit</button>
    //     </div>
    //   </form>
    // </div>
    <form onSubmit={handleSubmit} className="editCommentContainer">
      <p id="usernameTitle">{username}</p>
      <div>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="editCommentInput" required />
      </div>
      <div className="editCommentButtons">
        <button type="submit" id="submitButtonModal">Update post</button>
        <button type="button" onClick={handleCancelClick} id="cancelButtonModal">Cancel</button>
      </div>
    </form>
  )
}

export default EditPost;
