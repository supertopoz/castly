import * as actions from "./canvasRecordingActions";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
  audioCtx: null,
  dataStream: null,
  recorder: null,
  recordingData: null,
  canvasImage: null
}

const store = mockStore({ initialState })

describe('async actions', () => {

  it('should dispatch actions of set audio context', () => {
    const expectedActions = [ {type: "SET_AUDIO_CONTEXT", payload: {}} ]
    const data = {}
    store.dispatch(actions.setAudioContext(data))
    expect(store.getActions()).toEqual(expectedActions)
  })
// it('should create an action to change the canvas image', () => {
    
//     const data = 'background.png'
//     const expectedActions = [{ type: 'SET_AUDIO_CONTEXT', payload: data}]
//     store.dispatch(actions.addCanvasImage(data))
//     expect(store.getActions(data)).toEqual(expectedActions)
//   })  
})



describe('canvas recording actions', () => {
  it('should create an action to set Audio context', () => {
    const data = { someObject: {}}
    const expectedAction = { type: 'SET_AUDIO_CONTEXT', payload: {"someObject":{}}}
    expect(actions.setAudioContext(data)).toEqual(expectedAction)
  })  

  // it('should create an action to change the canvas image', () => {
  //   const data = 'background.png'
  //   const expectedAction = { type: 'SET_AUDIO_CONTEXT', payload: data}
  //   expect(actions.setAudioContext(data)).toEqual(expectedAction)
  // })
})