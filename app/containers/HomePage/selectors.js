/**
 * Created on 29.08.2016.
 */

const getSignedUser = () => state => state.get('globals').user;

const getShowSignInDialog = () => state => state.get('globals').signInDialog;

export {
    getSignedUser,
    getShowSignInDialog
}