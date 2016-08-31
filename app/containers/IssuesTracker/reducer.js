/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const initialState = {
    issues: [],
    currentIssueIndex: null

};

function issuesReducer(state=initialState, action) {
    switch (action.type) {
        case "CHANGE_ISSUES_LIST":
            return {
                issues: action.issuesList,
                currentIssueIndex: null
            };
        case "CHANGE_CURRENT_ISSUES":
            return {
                ...state,
                currentIssueIndex: action.issueIndex
            }
        default: return state;
    }
}

export default issuesReducer;