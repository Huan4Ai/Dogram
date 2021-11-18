import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/post";

const CreatePost = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user.id);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const reset = () => {
    setDescription("");
    setImage(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id,
      description,
      image
    };
    let createdPost = await dispatch(createPost(data));
    if (createdPost) {
      reset();
    }

  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  return (
    <div>
      <h3>Create a post</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        <button type="submit">Create post</button>
      </form>
    </div>
  )

}

export default CreatePost
