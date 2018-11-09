const initialState = {
    loadingBar: false,
    sideMenu: false,
    isMobile: false,
    showLoader: false,
}


const pageAnimations = (state = initialState, action) => {
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
        case "IS_MOBILE":
        state = {
            ...state, 
            isMobile: action.payload,
        }
        break;           
        case "SHOW_LOADER":
        state = {
            ...state, 
            showLoader: action.payload,
        }
        break;     
        case "RESET":
        state = {
            ...initialState
        }
        break;     
    }
    return state;
};

export default pageAnimations;

