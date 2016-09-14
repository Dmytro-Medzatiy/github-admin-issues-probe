/**
 * Created by Admin on 30.08.2016.
 */

import { getData, getRepoList } from 'api/restUtilities';


export function setNewGitHubAuthor(name, id, avatarURL, repos, errorMessage) {
    return {
        type: "CHANGE_GITHUB_AUTHOR",
        name,
        id,
        avatarURL,
        repos,
        errorMessage
    }
}

export function changeGitHubAuthor(author) {
    return (dispatch, getState) => {
        const URL = 'https://api.github.com/users/' + author;
        const signedUser = getState().get('globals').user;
        const login = signedUser.login;
        const password = signedUser.password;

        getData(URL, login, password).then(
            response=> {
                if (response.notFound) {
                    const error = "Wrong GitHub User Name";
                    dispatch(setNewGitHubAuthor(author,"","",[],error));
                } else {
                    const author = response.login;
                    const id = response.id;
                    const avatarURL = response.avatar_url;
                    const error = "";
                    getRepoList(author, login, password).then(
                        repos=> {
                            dispatch(setNewGitHubAuthor(author, id, avatarURL, repos, error));
                        }
                    );

                }
            }
        );
    }
}


export function changeCurrentRepoIndex(repoIndex) {
    
    return {
        type: "CHANGE_CURRENT_REPO_INDEX",
        repoIndex
    }
}

export function setAvailableLabels(labels) {
    return {
        type: "SET_AVAILABLE_LABELS",
        labels
    }
}

export function changeCurrentRepo(repoIndex){
    return (dispatch, getState) => {

        const githubAuthor = getState().get('githubAuthor').githubAuthor;
        const author = githubAuthor.name;
        const repoName = githubAuthor.repos[repoIndex].repoName;

        const signedUser = getState().get('globals').user;
        const login = signedUser.login;
        const password = signedUser.password;

        const URL = "https://api.github.com/repos/"+author+"/"+repoName+"/labels";

        //get Available Labels for new current repo
        getData(URL, login, password).then(
            response=> {
                return response.map((label) => {
                    return {
                        name: label.name,
                        color: label.color
                    }
                });
            }
        ).then(
            labels => {
                dispatch(setAvailableLabels(labels));
                dispatch(changeCurrentRepoIndex(repoIndex));
            }
        ).catch(
            error => { throw new Error(error) }
        );
    }
}