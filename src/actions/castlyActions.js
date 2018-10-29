export function addImages(images = []) {	
    return {
        type: "ADD_IMAGES",
        payload: images
    };
}

export function currentImage(image) { 
    return {
        type: "CURRENT_IMAGE",
        payload: image
    };
}

export function imageStageDetails(details) { 
    return {
        type: "IMAGE_STAGE_DETAILS",
        payload: details
    };
}

export function resize(resize) {	
    return {
        type: "RESIZE",
        payload: resize
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

export const addCanvasImage = (image) => {
  return (dispatch) => {
  dispatch({
          type: "CURRENT_IMAGE",
          payload: image
        });
  }
 
}
