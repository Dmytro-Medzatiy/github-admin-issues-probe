/**
 * Created by DMedzatiy on 31-Aug-16.
 */

import { putData, fetchIssues } from 'api/restUtilities';
import { onChangeLoadingWindow } from 'containers/HomePage/actions';


export function onChangePerPage(perPageValue) {
    return {
        type: "CHANGE_PER_PAGE_VALUE",
        perPageValue
    }
}

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
                    dispatch(changeCurrentIssueLabels(newLabels, (issueNumber-1)));
                } 
            }
        )
    }
}

export function onGetIssues(owner, repoName, type, filter="all") {
    return (dispatch, getState) => {
        dispatch(onChangeLoadingWindow(true,"Loading Issues, wait a moment..."));
        const login = getState().get('globals').user.login;
        const password = getState().get('globals').user.password;
        const pagination = getState().get('issues').pagination;
        const perPage = pagination.perPage;
        const initialParameters = "?state=" + filter + "&direction=asc&per_page=" + perPage + "&page=1";
        let URL = "";
        switch (type) {
            case "init":
                URL = "https://api.github.com/repos/" + owner + "/" + repoName + "/issues" + initialParameters;
                break;
            case "next":
                URL = pagination.next;
                break;
            case "prev":
                URL = pagination.prev;
                break;
            case "last":
                URL = pagination.last;
                break;
            case "first":
                URL = pagination.first;
                break;
            default:
                URL = undefined;
        }
        fetchIssues(URL, login, password)
            .then(
                response => {
                    //set pagination
                    const links = response.links;
                    let paginations = {
                        next: null,
                        first: null,
                        last: null,
                        prev: null,
                        perPage: perPage
                    };
                    links.forEach((link)=> {
                        paginations[link.rel]= link.link;
                    });
                    dispatch(setPagination(paginations));
                    
                    //set new issues

                    const issues = response.jsonData.map((issueData)=> {
                        const commentsURL = issueData.comments_url;
                        const title = issueData.title;
                        const user = {
                            name: issueData.user.login,
                            avatarURL: issueData.user.avatar_url
                        };
                        const labels = issueData.labels.map((label)=>{
                            return {
                                name: label.name,
                                color: label.color
                            }
                        });
                        const state = issueData.state;
                        const comments = issueData.comments;
                        const body = issueData.body;
                        const issueNumber = issueData.number;

                        return {
                            title,
                            commentsURL,
                            user,
                            labels,
                            state,
                            comments,
                            body,
                            issueNumber
                        };
                    });

                    dispatch(changeIssuesList(issues));
                    dispatch(onChangeLoadingWindow(false,""));
                }
            );
    }
}

export function setPagination(paginationState) {
    return {
        type: "SET_PAGINATION",
        paginationState
    }
}