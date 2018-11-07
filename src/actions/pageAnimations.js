export function showLoadingBar(display = false) {
    return {
        type: "SHOW_LOADING_BAR",
        payload: display
    };
}

export function showSideMenu(display = false) {
    return {
        type: "SHOW_SIDE_MENU",
        payload: display
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






