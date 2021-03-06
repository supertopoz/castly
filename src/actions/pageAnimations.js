'use strict';
export function showLoadingBar(display = false) {
    return {
        type: "SHOW_LOADING_BAR",
        payload: display
    };
}

export function reset() {
    return {
        type: "RESET",
        payload: ''
    };
}

export function showSideMenu(display = false) {
    return {
        type: "SHOW_SIDE_MENU",
        payload: display
    };
}

export function setFileUpLoadStyle(styles = {}) {
    return {
        type: "SET_FILE_UPLOAD_STYLES",
        payload: styles
    };
}

export function isMobile(isMobile = false) {
    return {
        type: "IS_MOBILE",
        payload: isMobile
    };
}

export function showLoader(loader = false) {
    return {
        type: "SHOW_LOADER",
        payload: loader
    };
}

export function isPDF(pdf = false) {
    return {
        type: "IS_PDF",
        payload: pdf
    };
}

export function displayCanvas(display = 'none') {
    return {
        type: "DISPLAY_CANVAS",
        payload: display
    };
}

export function displayRecordButtons(display = 'none') {
    return {
        type: "DISPLAY_RECORD_BUTTONS",
        payload: display
    };
}






