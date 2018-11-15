const initialState = {
  audioCtx: null,
  dataStream: null,
  recorder: null,
  recordingData: null,
  canvasImage: null,
  recordButtons: ['fiber_manual_record'],
  videoData: null, 
  initialized: false,
  video: null
}

const intilizeUserMedia = (state, action) => {
  return { ...state, dataStream: action.payload[0], audioCtx: action.payload[1], video: action.payload[2], initialized: true}
}

const startRecording = (state, action) => {
  return { ...state, recorder: action.payload}
}

const stopRecording = (state, action) => {
  return { ...state, recordingData: action.payload, recorder: null}
}

const addCanvasImage = (state, action) => {
  return { ...state, canvasImage: action.payload}
}

const updateRecordButtons = (state, action) => {
  return { ...state, recordButtons: action.payload.icons}
}
const exportVideo = (state, action) => {
  return { ...state, videoData: action.payload}
}

const uninitialize = (state, action) => {
  return { ...state, initialized: false}
}

const reset = (state, action) => {
  return { ...initialState }
}


const canvasRecording = (state = initialState , action) => {
    switch (action.type) {
        case "INITILIZE_USER_MEDIA": return intilizeUserMedia(state, action);
        case "START_RECORDING": return startRecording(state, action);                            
        case "STOP_RECORDING": return stopRecording(state, action);                            
        case "ADD_CANVAS_IMAGE": return addCanvasImage(state, action);                            
        case "UPDATE_RECORD_BUTTONS": return updateRecordButtons(state, action);                            
        case "VIDEO_DATA": return exportVideo(state, action);                                                    
        case "UNINITIALIZE": return uninitialize();                                                    
        case "RESET": return reset();                                                                                                     
        break;
    }
    return state;
};

export default canvasRecording;