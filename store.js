import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import pageAnimations from "./src/reducers/pageAnimationsReducer.js";
import castly from "./src/reducers/castlyReducer.js";


export default createStore(
    combineReducers({ pageAnimations, castly }), {},
    applyMiddleware(createLogger())
);