import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'posts/LOAD_COMMENTS';
const ADD_COMMENT = 'posts/ADD_COMMENT';
const EDIT_COMMENT = 'posts/EDIT_COMMENT';
const DELETE_COMMENT = 'posts/DELETE_COMMENT';

const loadComments = (allComments, postId) => ({
  type: LOAD_COMMENTS,
  allComments,
  postId
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
});

const removeComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
});

export const getComments = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}/comments`);

  if (response.ok) {
    const allComments = await response.json();

    dispatch(loadComments(allComments, id));
  };


};

export const createComment = (data, postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(addComment(comment));
    return comment;
  }


};

export const updataComment = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)

  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(editComment(comment));
    return comment;
  }

};

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeComment(data));
  }

};


const commentReducer = (state = {}, action) => {

  switch (action.type) {
    case LOAD_COMMENTS:
      let newComments = { ...state };
      action.allComments.forEach((comment) => {
        newComments[comment.id] = comment;
      });
      return newComments

    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };

    case EDIT_COMMENT:
      return { ...state, [action.comment.id]: action.comment };

    case DELETE_COMMENT:
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;

    default:
      return state
  }
}

export default commentReducer;
