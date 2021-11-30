import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/post";
import { useHistory } from "react-router";
import "./AddPost.css"

const CreatePost = ({onClose}) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.session.user.id);
  const history = useHistory();

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
      onClose();
      reset();
      history.push("/");
    }

  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  return (
    <div className="addPostContainer">
      <h3>Create a post</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='description'>Add description:</label>
        </div>
        <div>
          <input id='description' type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <input type="file" onChange={updateFile} required />
        </div>
        <div>
          <button type="submit" id="addPostButton">Create post</button>
        </div>
      </form>
    </div>
  )

}

export default CreatePost
