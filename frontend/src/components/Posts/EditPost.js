import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/post";
import "./EditPost.css"

function EditPost({ post, onClose }) {
  const dispatch = useDispatch();
  const id = post.id;
  const user_id = post.user_id;
  const photo_url = post.photo_url;

  const [description, setDescription] = useState("");

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
    console.log(data)
    let editedPost = await dispatch(updatePost(data));

    if (editedPost) {
      reset();
      onClose();
    }

  };




  return (

    <div className="editPostContainer">
      <h3>Edit a post</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='edit'>Edit description:</label>
        </div>
        <div>
          <input id='edit' type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <button type="submit" id="editPostButton">Edit</button>
        </div>
      </form>
    </div>
  )
}

export default EditPost;
