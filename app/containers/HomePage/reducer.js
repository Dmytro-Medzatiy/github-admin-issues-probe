/**
 * Created on 29.08.2016.
 */


const initialState = {
    user: {
        signed: false,
        login: "",
        password: "",
        errorMessage: ""
    },
    signInDialog: false,
    loadingWindow: {
        isOpen: false,
        text: ""
    },
    authorizationRequest: {
        open: false,
        text: ""
    },
    helpWindowVisibility: true
};

function signInReducer (state=initialState, action){
    switch (action.type) {
        case "CHANGE_HELP_PAGE_VISIBILITY":
            return {
                ...state,
                helpWindowVisibility: action.visibility
            };
        case "SIGN_IN":
            return {
                ...state,
                user: {
                    signed: action.signed,
                    login: action.login,
                    password: action.password,
                    errorMessage: action.errorMessage
                },
                signInDialog: !action.signed

            };
        case "SIGN_OUT":
            return {
                ...state,
                user: {
                    signed: false,
                    login: "",
                    password: "",
                    errorMessage: ""
                }
            };
        case "ON_SIGN_IN_ACTION":
            return {
                ...state,
                signInDialog: action.isOpen
            };
        case "ON_LOADING_WINDOW":
            return {
                ...state,
                loadingWindow: {
                    isOpen: action.isOpen,
                    text: action.text
                }
            };
        case "ON_AUTHORIZATION_WINDOW":
            return {
                ...state,
                authorizationRequest: {
                    open: action.isOpen,
                    text: action.text
                }
            };
        default:
            return state;
    }
}

export default signInReducer;