import { csrfFetch } from "./csrf";

const GET_SINGLE_USER = "users/LOAD_USER";

const loadSingleUser = (users) => ({
  type: GET_SINGLE_USER,
  users
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
      let newState = { ...state };
      action.users.forEach(user => {
        newState[user.id] = user
      });
      return newState;


    default:
      return state
  }

}

export default userReducer
