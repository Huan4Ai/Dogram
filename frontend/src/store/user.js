import { csrfFetch } from "./csrf";

const GET_SINGLE_USER = "users/LOAD_USER";
const CREATE_FOLLOW = "users/CREATE_FOLLOW";

const loadSingleUser = (user) => ({
  type: GET_SINGLE_USER,
  user,
});

const createFollowAction = (follow) => ({
  type: CREATE_FOLLOW,
  follow,
});

export const getSingleUser = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(loadSingleUser(user));
  }
};

export const createFollowThunk = (data, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}/followers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const follow = await response.json();
    dispatch(createFollowAction(follow));
  }
};

export const deleteFollowThunk =
  (followerId, followingId) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/users/${followerId}/following/${followingId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const bool = response.json();
      return bool;
    }
  };

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return { ...state, ...action.user };

    default:
      return state;
  }
};

export default userReducer;
