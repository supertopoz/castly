const initialState = {
    images: [],

}

const addImages = (state, action) => {
  return { ...state, images: action.payload}
}

const castly = (state = initialState , action) => {
    switch (action.type) {
        case "ADD_IMAGES": return addImages(state, action)        
        break;
    }
    return state;
};

export default castly;