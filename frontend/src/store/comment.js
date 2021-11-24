import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'posts/LOAD_COMMENTS';
const ADD_COMMENT = 'posts/ADD_COMMENT';
const EDIT_COMMENT = 'posts/EDIT_COMMENT';
const DELETE_COMMENT = 'posts/DELETE_COMMENT';

const loadComments = (comments, postId) => ({
  type: LOAD_COMMENTS,
  comments,
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

export const getComments = (id) => 
