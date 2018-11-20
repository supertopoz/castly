import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
//import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import pageAnimations from "./src/reducers/pageAnimationsReducer.js";
import castly from "./src/reducers/castlyReducer.js";
import canvasRecording from "./src/reducers/canvasRecordingReducer.js";


const reducer = combineReducers({ pageAnimations, castly, canvasRecording })
//export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default createStore(reducer, applyMiddleware(thunk));
