const iconStyles = {
    position: "absolute",
    left: "0",
    top: "50%",
    height: "100%",
    width: "100%",
    textAlign: "center",
    marginTop: "-19px",
    color: "#FFF",
    cursor: "pointer"
}

const fileUploadButton = {
    display: "grid",
    alignTtems: "center",
    justifyContent: "center",
    backgroundColor: "#b818ff",
    borderRadius: "999em",
    width: "56px",
    height: "56px",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
    lineHeight: "1",
    fontSize: "36px",
    position: "absolute",
    top: "25px",
    right: "30px",
    color: "white",
    cursor: "pointer"
}


const pageAnimations = (state = {
    loadingBar: false,
    sideMenu: false,
    isMobile: false,
    showLoader: false,
    fileUpLoadStyles: { iconStyles, fileUploadButton}
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
        case "SET_FILE_UPLOAD_STYLES":
        state = {
            ...state, 
            fileUpLoadStyles: action.payload,
        }
        break;     
    }
    return state;
};

export default pageAnimations;

