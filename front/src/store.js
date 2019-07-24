import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
//const initialState = {};
// json-server --watch db.json
const store = createStore(rootReducer, {},compose(composeWithDevTools(applyMiddleware(...middleware))));

export default store;
