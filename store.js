import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
 
//import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import pageAnimations from "./src/reducers/pageAnimationsReducer.js";
import castly from "./src/reducers/castlyReducer.js";
import canvasRecording from "./src/reducers/canvasRecordingReducer.js";



console.log('Process Environment', process.env.NODE_ENV)
const reducer = combineReducers({ pageAnimations, castly, canvasRecording })
//export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
let newStore = createStore(reducer, applyMiddleware(thunk));

if(process.env.NODE_ENV === 'dev'){	
	newStore = createStore(reducer, applyMiddleware(thunk, createLogger()));
}


export const store = newStore;
