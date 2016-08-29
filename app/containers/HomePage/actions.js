/**
 * Created on 29.08.2016.
 */

export function signIn(user, token, avatarURL){
    return {
        type: "SIGN_IN",
        user,
        token,
        avatarURL
    };
}

export function signOut () {
    return {
        type: "SIGN_OUT"
    };
}

