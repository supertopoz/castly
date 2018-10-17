const initialState = {
    images: [],
    currentImage: null,
    mouse: [],
    dragging: false
}

const addImages = (state, action) => {
  return { ...state, images: action.payload}
}

const currentImage = (state, action) => {
  return { ...state, currentImage: action.payload}
}

const setMouse = (state, action) => {
  return { ...state, mouse: action.payload}
}

const setDragging = (state, action) => {
  return { ...state, dragging: action.payload}
}

const castly = (state = initialState , action) => {
    switch (action.type) {
        case "ADD_IMAGES": return addImages(state, action);       
        case "CURRENT_IMAGE": return currentImage(state, action);       
        case "SET_MOUSE": return setMouse(state, action);       
        case "DRAGGING": return setDragging(state, action);       
        break;
    }
    return state;
};

export default castly;