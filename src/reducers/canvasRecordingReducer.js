const initialState = {
  audioCtx: null,
  myRecording: null,
  recorder: null,
  recordingData: null,
  SoundStream: {},
}

const intilizeUserMedia = (state, action) => {
  return { ...state, myRecording: action.payload[0], audioCtx: action.payload[1]}
}

const startRecording = (state, action) => {
  return { ...state, recorder: action.payload}
}

const stopRecording = (state, action) => {
  return { ...state, recordingData: action.payload}
}

const canvasRecording = (state = initialState , action) => {
    switch (action.type) {
        case "INITILIZE_USER_MEDIA": return intilizeUserMedia(state, action)  
        case "START_RECORDING": return startRecording(state, action)                            
        case "STOP_RECORDING": return stopRecording(state, action)                            
        break;
    }
    return state;
};

export default canvasRecording;