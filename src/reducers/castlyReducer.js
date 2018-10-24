const initialState = {
    images: [],
    currentImage: null,
    mouse: [],
    dragging: false,
    resize: null,
    imageStage: {x: 10, y: 10, width: 1280, height: 720}
}

const addImages = (state, action) => {
  return { ...state, images: action.payload}
}

const currentImage = (state, action) => {
  return { ...state, currentImage: action.payload}
}

const imageStageDetails = (state, action) => {
  return { ...state, imageStage: action.payload}
}

const resize = (state, action) => {
  return { ...state, resize: action.payload}
}

const castly = (state = initialState , action) => {
    switch (action.type) {
        case "ADD_IMAGES": return addImages(state, action);       
        case "CURRENT_IMAGE": return currentImage(state, action);       
        case "IMAGE_STAGE_DETAILS": return imageStageDetails(state, action);       
        case "RESIZE": return resize(state, action);               
        break;
    }
    return state;
};

export default castly;