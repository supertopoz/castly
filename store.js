import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';
import pageAnimations from "./src/reducers/pageAnimationsReducer.js";
import castly from "./src/reducers/castlyReducer.js";
import canvasRecordingReducer from "./src/reducers/canvasRecordingReducer.js";


const reducer = combineReducers({ pageAnimations, castly, canvasRecordingReducer })
export default createStore(reducer, applyMiddleware(thunk, createLogger()))
