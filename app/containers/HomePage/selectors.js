/**
 * Created on 29.08.2016.
 */

const getSignedUser = () => state => state.get('globals').user;

const getShowSignInDialog = () => state => state.get('globals').signInDialog;

const getLoadingWindowState = () => state => state.get('globals').loadingWindow;

export {
    getSignedUser,
    getShowSignInDialog,
    getLoadingWindowState
}