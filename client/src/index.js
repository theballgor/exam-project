import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {rootReducer} from "./redux/rootReducer";
import thunk from "redux-thunk";
import {Provider} from 'react-redux'
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
