/**
 * Created by DMedzatiy on 31-Aug-16.
 */

import { putData } from 'api/restUtilities';
import { apiError } from 'containers/HomePage/actions';

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

export function changeCurrentIssueLabels(newLabels, issueIndex) {
    return {
        type: "CHANGE_CURRENT_ISSUE_LABELS",
        newLabels,
        issueIndex
    }
}

export function onUpdateLabels (newLabels, issueNumber) {
    return (dispatch, getState) => {
        const owner = getState().get('githubAuthor').githubAuthor.name;
        const repoIndex = getState().get('githubAuthor').currentRepoIndex;
        const repoName = getState().get('githubAuthor').githubAuthor.repos[repoIndex].repoName;
        const login = getState().get('globals').user.login;
        const password = getState().get('globals').user.password;
        const data = newLabels.map((label)=>{
            return {
                name: label.name
            }
        });
        const URL = "https://api.github.com/repos/"+owner+"/"+repoName+"/issues/"+issueNumber+"/labels";

        putData(URL, login, password, data).then(
            res=> {
                if (res==200) {
                    dispatch(changeCurrentIssueLabels(newLabels, (issueNumber-1)))
                } else {
                    dispatch(apiError("Bad response from GitHub, try to repeat your actions later"))
                }
            }
        )
    }
}