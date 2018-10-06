import canvasRecording from './canvasRecordingReducer';

const initialState = {
  audioCtx: null,
  dataStream: null,
  recorder: null,
  recordingData: null,
  canvasImage: null,
  recordButtons: ['INITILIZE']
}


describe('canvas recording reducer', () => {
  it('should return the initial state', () => {
    expect(canvasRecording(undefined, {})).toEqual(initialState)
  })
  it('should handle INITILIZE_USER_MEDIA', () => {
    const initialState = { audioCtx: null, dataStream: null}
    const obj1 = { item1: {}, item2: {} }    
    const obj2 = { item1: {}, item2: {} }
    const payload = [obj1, obj2]

    const targetState = {
      audioCtx: { item1: {},item2: {}},
      dataStream: { item1: {},item2: {}}
  }
    expect(
      canvasRecording(initialState, {
        type: 'INITILIZE_USER_MEDIA',
        payload: payload
      })
    ).toEqual(targetState)
  })
  it('should handle START_RECORDING', () => {
    const initialState1 = { recorder: null}
    const obj1 = { item1: {}, item2: {} }    
    const payload = obj1

    const targetState = {
      recorder: { item1: {},item2: {}}
  }
    expect(
      canvasRecording(initialState1, {
        type: 'START_RECORDING',
        payload: payload
      })
    ).toEqual(targetState)
  })  
  it('should handle STOP_RECORDING', () => {
    const initialState1 = { recordingData: null}
    const obj1 = { item1: {}, item2: {} }    
    const payload = obj1

    const targetState = {
      recordingData: { item1: {},item2: {}}
  }
    expect(
      canvasRecording(initialState1, {
        type: 'STOP_RECORDING',
        payload: payload
      })
    ).toEqual(targetState)
  })
  it('should handle ADD_CANVAS_IMAGE', () => {
    const initialState1 = { canvasImage: null}
    const payload = 'blank.png'    
    const targetState = { canvasImage: 'blank.png'}
    expect(
      canvasRecording(initialState1, {
        type: 'ADD_CANVAS_IMAGE',
        payload: payload
      })
    ).toEqual(targetState)
  })  
  it('should handle UPDATE_RECORD_BUTTONS', () => {
  	const initialState1 = { recordButtons: ['INITILIZE']}
    const payload = ['pause','stop'] 
    const targetState = { recordButtons: ['pause', 'stop']}
    expect(
      canvasRecording(initialState1, {
        type: 'UPDATE_RECORD_BUTTONS',
        payload: payload
      })
    ).toEqual(targetState)
  })
})