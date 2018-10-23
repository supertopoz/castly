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



export const addCanvasImage = (image, x, y, corner) => {
  return (dispatch) => {
  // This is the hidden Canvas
  const hiddenCanvas = window.document.getElementById('canvas');
  const ctx = hiddenCanvas.getContext('2d');
  // ctx.save();
  // ctx.setTransform(1, 0, 0, 1, 0, 0);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.restore();
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
  ctx.fillStyle = '#03A9F4';

  ctx.drawImage(image, x, y, image.width, image.height)
  ctx.beginPath();
  ctx.setLineDash([5, 3]);
  ctx.strokeRect(x, y, image.width,image.height);
  ctx.stroke();
  if(corner){
    ctx.drawImage(corner, (x + image.width), (y + image.height), 40, 40)
  }


  }
  dispatch({
          type: "CURRENT_IMAGE",
          payload: image
        });
}
