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
