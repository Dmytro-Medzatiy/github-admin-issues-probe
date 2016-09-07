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
    signInDialog: false
};

function signInReducer (state=initialState, action){
    switch (action.type) {
        case "SIGN_IN":
            return {
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
        default:
            return state;
    }
}

export default signInReducer;