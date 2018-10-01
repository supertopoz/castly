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
export function setTabs(tab = 'game') {
    return {
        type: "SET_TABS",
        payload: tab
    };
}
export function isMobile(isMobile = false) {
    return {
        type: "IS_MOBILE",
        payload: isMobile
    };
}
export function displayMobileInputs(display = false) {
    return {
        type: "DISPLAY_MOBILE_INPUTS",
        payload: display
    };
}

export function hideWordList(display = false) {
    return {
        type: "HIDE_WORD_LIST",
        payload: display
    };
}