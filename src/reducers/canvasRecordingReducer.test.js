import canvasRecording from './canvasRecordingReducer';

const initialState = {
  audioCtx: null,
  myRecording: null,
  recorder: null,
  recordingData: null,
  SoundStream: {},
}


describe('canvas recording reducer', () => {
  it('should return the initial state', () => {
    expect(canvasRecording(undefined, {})).toEqual(initialState)
  })
  it('should handle INITILIZE_USER_MEDIA', () => {
    const initialState = { audioCtx: null, myRecording: null}
    const obj1 = { item1: {}, item2: {} }    
    const obj2 = { item1: {}, item2: {} }
    const payload = [obj1, obj2]

    const targetState = {
      audioCtx: { item1: {},item2: {}},
      myRecording: { item1: {},item2: {}}
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
})