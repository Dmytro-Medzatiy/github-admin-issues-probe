/**
 * Created on 29.08.2016.
 */

const getSignedUser = () => state => state.get('globals').user;

const getShowSignInDialog = () => state => state.get('globals').signInDialog;

const getLoadingWindowState = () => state => state.get('globals').loadingWindow;

const getAuthorizationRequest = () => state => state.get('globals').authorizationRequest;

const getHelpWindowVisibility = () => state => state.get('globals').helpWindowVisibility;

export {
    getSignedUser,
    getShowSignInDialog,
    getLoadingWindowState,
    getAuthorizationRequest,
    getHelpWindowVisibility
}