import { csrfFetch } from "./csrf";

const GET_USERS = "search/GET_USERS";

const search_Users = (users) => ({
  type: GET_USERS,
  users
});

export const searchUsers = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/search`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data})
  });

  if (response.ok) {
    const users = await response.json();
    dispatch(search_Users(users));
  }

};

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, ...action.users };


    default:
      return state
  }




}

export default searchReducer
