/**
 * Created by DMedzatiy on 31-Aug-16.
 */

export function changeIssuesList(issuesList) {
    return {
        type: "CHANGE_ISSUES_LIST",
        issuesList
    }
}

export function changeCurrentIssue(issueIndex) {
    return {
        type: "CHANGE_CURRENT_ISSUES",
        issueIndex
    }
}


