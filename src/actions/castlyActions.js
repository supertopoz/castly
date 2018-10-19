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

export function setMouse(mouse) {	
    return {
        type: "SET_MOUSE",
        payload: mouse
    };
}
            	
export function setDragging(dragging) {	
    return {
        type: "DRAGGING",
        payload: dragging
    };
}

export const addCanvasImage = (image, x, y) => { 
  return (dispatch) => {
  // This is the hidden Canvas
  const hiddenCanvas = window.document.getElementById('canvas');
  const context = hiddenCanvas.getContext('2d');
  // context.save();
  // context.setTransform(1, 0, 0, 1, 0, 0);
  // context.clearRect(0, 0, canvas.width, canvas.height);
  // context.restore();
  context.fillRect(0, 0, context.canvas.width, context.canvas.height); 
  context.fillStyle = '#03A9F4';
  context.drawImage(image, x, y, image.width, image.height)
  }
  dispatch({
          type: "CURRENT_IMAGE",
          payload: image
        });
}
