import { createStore, applyMiddleware, compose } from "redux";
import reducer from './reducer';

import thunk from "redux-thunk";
// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
            ? a => a
            : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
const persister = '/';

export { store, persister };
