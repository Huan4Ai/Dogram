import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = 'posts/ADD_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';

const loadPosts = (list) => ({
  type: LOAD_POSTS,
  list
});

const addPost = (post) => ({
  type: ADD_POST,
  post
});

const editPost = (post) => ({
  type: EDIT_POST,
  post
});

const removePost = (postId) => ({
  type: DELETE_POST,
  postId
})

export const getPosts = () => async dispatch => {
  const response = await csrfFetch('/api/posts/');

  if (response.ok) {
    const list = await response.json();
    // console.log(list)
    dispatch(loadPosts(list))
  }
};

export const createPost = (post) => async (dispatch) => {
  // console.log(post);
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
  const data = await res.json();
  dispatch(addPost(data));
};

export const updatePost = (data) => async (dispatch) => {

  const response = await csrfFetch(`/api/posts/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });


  if (response.ok) {
    const post = await response.json();
    dispatch(editPost(post));
    return post;
  }

};

export const deletePost = (postId) => async (dispatch) => {

  const response = await csrfFetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removePost(data));
    return data;
  }

};



const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      let newState = { ...state };
      const posts = action.list;
      posts.forEach(post => {
        newState[post.id] = post
      });
      return newState;

    case ADD_POST:
      return { ...state, [action.post.id]: action.post };

    case EDIT_POST:
      return { ...state, [action.post.id]: action.post };

    case DELETE_POST:
      const copyState = { ...state };
      delete copyState[action.postId.id];
      return copyState;

    default:
      return state
  }

}

export default postReducer
