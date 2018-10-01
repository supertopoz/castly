const pageAnimations = (state = {
    loadingBar: false,
    sideMenu: false,
    tab: '',
    isMobile: false,
    displayMobileInputs: false,
    hideWordList: true
}, action) => {
    switch (action.type) {
        case "SHOW_LOADING_BAR":
            state = {
                ...state, 
                loadingBar: action.payload,
            } 
            break;       
        case "SHOW_SIDE_MENU":
            state = {
                ...state, 
                sideMenu: action.payload,
            }
            break;
        case "SET_TABS":
        state = {
            ...state, 
            tab: action.payload,
        }
        break;
        case "IS_MOBILE":
        state = {
            ...state, 
            isMobile: action.payload,
        }
        break;
        case "DISPLAY_MOBILE_INPUTS":
        state = {
            ...state, 
            displayMobileInputs: action.payload,
        }
        break;       
        case "HIDE_WORD_LIST":
        state = {
            ...state, 
            hideWordList: action.payload,
        }
        break;
    }
    return state;
};

export default pageAnimations;

