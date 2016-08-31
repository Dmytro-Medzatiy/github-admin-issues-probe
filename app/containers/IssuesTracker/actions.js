/**
 * Created by DMedzatiy on 31-Aug-16.
 */

export function changeIssuesList(repoId, issuesList) {
    return {
        type: "CHANGE_ISSUES_LIST",
        repoId,
        issuesList
    }
}


