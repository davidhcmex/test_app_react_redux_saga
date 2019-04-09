import { all, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// function that makes the api request and returns a Promise for response
function fetchData(suffix) {
    return axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/${suffix}`
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* usersWorkerSaga() {
    try {
     
        const response = yield call(fetchData,"users");
        const person = response;
        
        // dispatch a success action to the store with the new dog
        yield put({ type: "API_CALL_USERS_SUCCESS", data: person });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_USERS_FAILURE", error });
    }
}

function* albumsWorkerSaga() {
    try {
     
        const response = yield call(fetchData,"albums");
        const albums = response;
        
        // dispatch a success action to the store with the new dog
        yield put({ type: "API_CALL_ALBUMS_SUCCESS", data: albums });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_CALL_ALBUMS_FAILURE", error });
    }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield all([
        takeLatest("API_CALL_USERS_REQUEST", usersWorkerSaga),
        takeLatest("API_CALL_ALBUMS_REQUEST", albumsWorkerSaga),
      ]);
}