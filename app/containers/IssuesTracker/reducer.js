/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const initialState = {
    issues: [],
    currentIssueIndex: null,
    pagination: {
        next: null,
        prev: null,
        first: null,
        last: null,
        perPage: 10
    }
};

function issuesReducer(state=initialState, action) {
    switch (action.type) {
        case "CHANGE_ISSUES_LIST":
            return {
                ...state,
                issues: action.issuesList,
                currentIssueIndex: null
            };
        case "CHANGE_CURRENT_ISSUES":
            return {
                ...state,
                currentIssueIndex: action.issueIndex
            };
        case "CHANGE_CURRENT_ISSUE_LABELS":
            return {
                ...state,
                issues: state.issues
                    .slice(0,action.issueIndex)
                    .concat(Object.assign({},state.issues[action.issueIndex],{labels:action.newLabels}))
                    .concat(state.issues.slice(action.issueIndex+1)),
                currentIssueIndex: action.issueIndex
            };
        default: return state;
    }
}

export default issuesReducer;