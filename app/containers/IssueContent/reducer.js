/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const initialState = {
    comments: []

};

function commentsReducer(state=initialState, action) {
    switch (action.type) {
        case "CHANGE_COMMENT_LIST":
            return {
                comments: action.commentsList
            };
        default: return state;
    }
}

export default commentsReducer;