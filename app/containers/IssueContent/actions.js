/**
 * Created by DMedzatiy on 31-Aug-16.
 */
import { getData } from 'api/restUtilities';
import { apiError } from 'containers/HomePage/actions';
import { onChangeLoadingWindow } from 'containers/HomePage/actions';


export function changeCommentsList(commentsList) {
    return {
        type: "CHANGE_COMMENT_LIST",
        commentsList
    }
}

export function onChangeSnackbarVisibility(flag) {
    return {
        type: "CHANGE_SNACKBAR_VISIBILITY",
        flag
    }
}

export function changeCommentsVisibility(flag) {
    return {
        type: "CHANGE_COMMENTS_VISIBILITY",
        flag
    }
}

export function changeShowingLabelsEditor(flag) {
    return {
        type: "CHANGE_SHOWING_LABELS_EDITOR",
        flag
    }
}

export function getComments(owner, repoName, issueNumber){
    return (dispatch, getState) => {
        dispatch(onChangeLoadingWindow(true, "Loading Comments, wait a moment..."));
        const login = getState().get('globals').user.login;
        const password = getState().get('globals').user.password;
        const URL = "https://api.github.com/repos/" + owner + "/" + repoName + "/issues/"+issueNumber+"/comments";
        getData(URL, login, password).then(
            response=> {
                return response.map((comment) => {
                    return {
                        user: comment.user.login,
                        body: comment.body,
                        avatarURL: comment.user.avatar_url
                    }
                });
            }
        ).then(
            response => {
                dispatch(changeCommentsList(response));
                dispatch(onChangeLoadingWindow(false, ""));
            }
        ).catch(
            error => { throw new Error(error) }
        );
    }
}







