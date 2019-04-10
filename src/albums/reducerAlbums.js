// action types
const API_CALL_ALBUMS_REQUEST = "API_CALL_ALBUMS_REQUEST";
const API_CALL_ALBUMS_SUCCESS = "API_CALL_ALBUMS_SUCCESS";
const API_CALL_ALBUMS_FAILURE = "API_CALL_ALBUMS_FAILURE";
const SET_MAX_NUMBER = "SET_MAX_NUMBER";

// reducer with initial state
const initialState = {
  fetching: false,
  data: null,
  error: null,
  maxNumber: 30
};

export function reducerAlbums(state = initialState, action) {
  switch (action.type) {
    case API_CALL_ALBUMS_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_ALBUMS_SUCCESS:
      return { ...state, fetching: false, data: action.data };
    case API_CALL_ALBUMS_FAILURE:
      return { ...state, fetching: false, data: null, error: action.error };
    case SET_MAX_NUMBER:
      return { ...state, maxNumber: action.maxNumber };
    default:
      return state;
  }
}
