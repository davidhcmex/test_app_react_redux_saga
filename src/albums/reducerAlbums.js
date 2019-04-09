// action types
const API_CALL_ALBUMS_REQUEST = "API_CALL_ALBUMS_REQUEST";
const API_CALL_ALBUMS_SUCCESS = "API_CALL_ALBUMS_SUCCESS";
const API_CALL_ALBUMS_FAILURE = "API_CALL_ALBUMS_FAILURE";

// reducer with initial state
const initialState = {
  fetching: false,
  data: null,
  error: null
};

export function reducerAlbums(state = initialState, action) {
  switch (action.type) {
    case API_CALL_ALBUMS_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_ALBUMS_SUCCESS:
    
      return { ...state, fetching: false, data: action.data };
    case API_CALL_ALBUMS_FAILURE:
      return { ...state, fetching: false, data: null, error: action.error };
    default:
      return state;
  }
}