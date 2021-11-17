import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'posts/LOAD_POSTS';

const loadPosts = (list) => ({
  type: LOAD_POSTS,
  list
})


export const getPosts = () => async dispatch => {
  const response = await csrfFetch('/api/posts/');

  if (response.ok) {
    const list = await response.json();
    dispatch(loadPosts(list))
  }
}

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, ...action.list };



    default:
      return state
  }



}

export default postReducer
