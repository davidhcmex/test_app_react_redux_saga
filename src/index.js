import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { reducerUsers } from "./users/reducerUsers";
import { reducerAlbums } from "./albums/reducerAlbums";
import { watcherSaga } from "./sagas/";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    reducerUsers,
    reducerAlbums
  })

// create a redux store with our reducer above and middleware
let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware))
);

// run the saga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
