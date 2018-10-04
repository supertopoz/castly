const initialState = {
  audioCtx: null,
  MyRecording: {},
  recorder: {},
  SoundStream: {},
}

const intilizeUserMedia = (state, action) => {
  return { ...state, myRecording: action.payload[0], audioCtx: action.payload[1]}
}

const hangman = (state = initialState , action) => {
    switch (action.type) {
        case "INITILIZE_USER_MEDIA": return intilizeUserMedia(state, action)                            
        break;
    }
    return state;
};

export default hangman;