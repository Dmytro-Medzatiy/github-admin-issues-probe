/**
 * Created on 29.08.2016.
 */
import { checkAuthorization } from 'api/restUtilities';

export function onSignInAction(isOpen) {
    return {
        type: "ON_SIGN_IN_ACTION",
        isOpen
    }
}

export function signIn(login, password) {
    return (dispatch, getState) => {
        checkAuthorization(login, password)
            .then(
                response => {
                    if (response) {
                        dispatch(setSignedUser(true, login, password, ""))
                    } else {
                        dispatch(setSignedUser(false, "","","Wrong Login or Password"));
                    }
                }
            )

    }
}

export function setSignedUser(signed, login, password, errorMessage){
    return {
        type: "SIGN_IN",
        signed,
        login,
        password,
        errorMessage
    };
}

export function signOut () {
    return {
        type: "SIGN_OUT"
    };
}

export function apiError (errorText) {
    return {
        type: "API_ERROR",
        errorText
    }
}
