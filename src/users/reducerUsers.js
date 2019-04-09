// action types
const API_CALL_USERS_REQUEST = "API_CALL_USERS_REQUEST";
const API_CALL_USERS_SUCCESS = "API_CALL_USERS_SUCCESS";
const API_CALL_USERS_FAILURE = "API_CALL_USERS_FAILURE";
const SET_USER_ID = "SET_USER_ID";

// reducer with initial state
const initialState = {
  fetching: false,
  data: null,
  error: null,
  userId: null
};

export function reducerUsers(state = initialState, action) {
  switch (action.type) {
    case API_CALL_USERS_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_USERS_SUCCESS:
      return { ...state, fetching: false, data: action.data };
    case API_CALL_USERS_FAILURE:
      return { ...state, fetching: false, data: null, error: action.error };
    case SET_USER_ID:
      return { ...state, userId: action.id };
    default:
      return state;
  }
}
