'use strict';
export function addImages(images = []) {	
    return {
        type: "ADD_IMAGES",
        payload: images
    };
}

export const addCanvasImage = (image) => {
  return (dispatch) => {
  dispatch({
          type: "CURRENT_IMAGE",
          payload: image
        });
  }
}

export function resize(resize) {	
    return {
        type: "RESIZE",
        payload: resize
    };
}

export function reset() {
    return {
        type: "RESET",
        payload: ''
    };
}

//128:72
//256:144
//384:216
//512:288
//640:360
//768: 432
//896: 504
//1024: 576
//1152:648
//1280:720


