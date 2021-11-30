import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/post";

function EditPost({ post }) {
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
    }

  };




  return (

    <div>
      <h3>Edit a post</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Edit post</button>
      </form>
    </div>
  )
}

export default EditPost;
