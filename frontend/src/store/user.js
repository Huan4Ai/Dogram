import { csrfFetch } from "./csrf";

const GET_SINGLE_USER = "users/LOAD_USER";
const CREATE_FOLLOW = "users/CREATE_FOLLOW";


const loadSingleUser = (user) => ({
  type: GET_SINGLE_USER,
  user
});



export const getSingleUser = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(loadSingleUser(user));
  }

};

const userReducer = (state = {}, action) => {
  switch (action.type) {

    case GET_SINGLE_USER:
      return { ...state, ...action.user };

    default:
      return state
  }

}

export default userReducer
