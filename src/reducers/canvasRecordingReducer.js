const initialState = {
  audioCtx: null,
  dataStream: null,
  recorder: null,
  recordingData: null,
  canvasImage: null,
  recordButtons: ['INITILIZE'],
  newStart: false,
  videoData: null
}

const intilizeUserMedia = (state, action) => {
  return { ...state, dataStream: action.payload[0], audioCtx: action.payload[1]}
}

const startRecording = (state, action) => {
  return { ...state, recorder: action.payload}
}

const stopRecording = (state, action) => {
  return { ...state, recordingData: action.payload}
}

const addCanvasImage = (state, action) => {
  return { ...state, canvasImage: action.payload}
}

const updateRecordButtons = (state, action) => {
  if(action.payload.newStart){
    return { ...initialState}
  }
  return { ...state, recordButtons: action.payload.icons}
}
const exportVideo = (state, action) => {
  return { ...state, videoData: action.payload}
}

const canvasRecording = (state = initialState , action) => {
    switch (action.type) {
        case "INITILIZE_USER_MEDIA": return intilizeUserMedia(state, action);
        case "START_RECORDING": return startRecording(state, action);                            
        case "STOP_RECORDING": return stopRecording(state, action);                            
        case "ADD_CANVAS_IMAGE": return addCanvasImage(state, action);                            
        case "UPDATE_RECORD_BUTTONS": return updateRecordButtons(state, action);                            
        case "VIDEO_DATA": return exportVideo(state, action);                            
        break;
    }
    return state;
};

export default canvasRecording;