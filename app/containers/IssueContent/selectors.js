/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const getCommentsList = () => state => state.get('comments').comments;

const getShowLabelsEditor = () => state => state.get('comments').showLabelsEditor;

const getShowComments = () => state => state.get('comments').showingComments;


export {
    getCommentsList,
    getShowLabelsEditor,
    getShowComments
}