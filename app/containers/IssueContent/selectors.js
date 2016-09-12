/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const getCommentsList = () => state => state.get('comments').comments;

const getShowLabelsEditor = () => state => state.get('comments').showLabelsEditor;

const getShowComments = () => state => state.get('comments').showingComments;

const getSnackBarVisibility = () => state => state.get('comments').snackBarVisibility;


export {
    getCommentsList,
    getShowLabelsEditor,
    getShowComments,
    getSnackBarVisibility
}