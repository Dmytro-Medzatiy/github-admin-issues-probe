/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const initialState = {
    issues: {
        repoId: "",
        issuesList: []
    }
};

function issuesReducer(state=initialState, action) {
    switch (action.type) {
        case "CHANGE_ISSUES_LIST":
            return {
                issues: {
                    repoId: action.repoId,
                    issuesList: action.issuesList
                }
            };
        default: return state;
    }
}

export default issuesReducer;