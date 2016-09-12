/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const initialState = {
    comments: [],
    showingComments: false,
    showLabelsEditor: false,

};

function commentsReducer(state=initialState, action) {
    switch (action.type) {
        case "CHANGE_COMMENT_LIST":
            return {
                ...state,
                comments: action.commentsList
            };
        case "CHANGE_SHOWING_LABELS_EDITOR":
            return {
                ...state,
                showLabelsEditor: action.flag
            };
        case "CHANGE_COMMENTS_VISIBILITY":
            return {
                ...state,
                showingComments: action.flag
            };
        default: return state;
    }
}

export default commentsReducer;