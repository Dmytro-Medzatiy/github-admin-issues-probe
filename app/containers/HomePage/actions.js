/**
 * Created on 29.08.2016.
 */

export function signIn(login, password){
    return {
        type: "SIGN_IN",
        login,
        password
    };
}

export function signOut () {
    return {
        type: "SIGN_OUT"
    };
}

