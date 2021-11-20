import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../store/post";

function EditPost({ post }) {
  console.log(post)
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const reset = () => {
    setDescription("");
    setImage(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description,
      image
    };
    let editedPost = await dispatch(updatePost(data));
    if (editedPost) {
      reset();
    }

  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }


  return (

    <div>
      <h3>Edit a post</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        <button type="submit">Edit post</button>
      </form>
    </div>
  )
}

export default EditPost;
