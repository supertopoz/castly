'use strict';
const initialState = {
    images: [],
    resize: null,
    currentCanvasObjects: { 
      currentImage: null,
      imageStage: {x: 10, y: 10, width: 1280, height: 720},
      imageStageHighlight: false,
      videoHighlight: false
    }
}

const addImages = (state, action) => {
  return { ...state, images: action.payload}
}

const currentImage = (state, action) => {
  let currentCanvasObjects = state.currentCanvasObjects;
  currentCanvasObjects.currentImage = action.payload;
  return { ...state, currentCanvasObjects}
}

const resize = (state, action) => {
  return { ...state, resize: action.payload}
}

const reset = (state, action) => {
  return { ...initialState }
}

const castly = (state = initialState , action) => {
    switch (action.type) {
        case "ADD_IMAGES": return addImages(state, action);       
        case "CURRENT_IMAGE": return currentImage(state, action);            
        case "RESIZE": return resize(state, action);  
        case "RESET": return reset();                 
        break;
    }
    return state;
};

export default castly;