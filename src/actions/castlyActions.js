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



export const addCanvasImage = (image, imageStage, resize) => {
  console.log('added image')
  return (dispatch) => {
  // This is the hidden Canvas
  const hiddenCanvas = window.document.getElementById('canvas');
  const ctx = hiddenCanvas.getContext('2d');
  var newImageHeight = imageStage.height;
  var newImageWidth = image.width * (imageStage.height/image.height)
  // ctx.save();
  // ctx.setTransform(1, 0, 0, 1, 0, 0);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.restore();
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
  //ctx.fillStyle = '#03A9F4';
  ctx.beginPath();
    ctx.fillRect(imageStage.x, imageStage.y, imageStage.width, imageStage.height)
    ctx.drawImage(image, imageStage.x+ imageStage.width/2 - newImageWidth/2, imageStage.y, (newImageWidth), newImageHeight)
  ctx.stroke();
  if(resize){
    ctx.drawImage(resize, (imageStage.x + imageStage.width), (imageStage.y + imageStage.height), 40, 40)
  }


  }
  dispatch({
          type: "CURRENT_IMAGE",
          payload: image
        });
}
