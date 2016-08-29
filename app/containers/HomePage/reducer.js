/**
 * Created on 29.08.2016.
 */

import { fromJS } from 'immutable';

const initialState = {
    user: {
        signed: false,
        name: "",
        token: "",
        avatarURL: "assets/images/default_avatar.png"

    }
};

function signInReducer (state=initialState, action){
    switch (action.type) {
        case "SIGN_IN":
            return {
                user: {
                    signed: true,
                    name: action.name,
                    token: action.token,
                    avatarURL: action.avatarURL
                }
            };
        case "SIGN_OUT":
            return {
                user: {
                    signed: false,
                    name: "",
                    token: "",
                    avatarURL: "assets/images/default_avatar.png"
                }
            };
        default:
            return state;
    }
}

export default signInReducer;