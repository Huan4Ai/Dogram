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

const initialState = {};
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
        const allUsers = {};
        action.users.forEach((user) => {
            allUsers[user.id] = user;
        });
    return {...allUsers}
    default:
      return state;
  }
};

export default searchReducer
