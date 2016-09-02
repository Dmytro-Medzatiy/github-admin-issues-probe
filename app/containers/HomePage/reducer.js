/**
 * Created on 29.08.2016.
 */


const initialState = {
    user: {
        signed: false,
        login: "",
        password: ""

    }
};

function signInReducer (state=initialState, action){
    switch (action.type) {
        case "SIGN_IN":
            return {
                user: {
                    signed: true,
                    login: action.login,
                    password: action.password
                }
            };
        case "SIGN_OUT":
            return {
                user: {
                    signed: false,
                    login: "",
                    password: ""
                }
            };
        default:
            return state;
    }
}

export default signInReducer;