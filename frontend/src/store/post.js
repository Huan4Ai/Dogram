import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = 'posts/ADD_POST';

const loadPosts = (list) => ({
  type: LOAD_POSTS,
  list
});

const addPost = (post) => ({
  type: ADD_POST,
  post
});


export const getPosts = () => async dispatch => {
  const response = await csrfFetch('/api/posts/');

  if (response.ok) {
    const list = await response.json();
    dispatch(loadPosts(list))
  }
}

export const createPost = (post) => async (dispatch) => {
  const { user_id, description, image } = post;
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("description", description);

  if (image) formData.append("image", image);

  const res = await csrfFetch('/api/posts/', {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const post = await res.json();
  dispatch(addPost(post));



};

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, ...action.list };

    case ADD_POST:
      return { ...state, [action.post.id]: action.post };


    default:
      return state
  }



}

export default postReducer
