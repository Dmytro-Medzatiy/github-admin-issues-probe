/**
 * Created by Admin on 30.08.2016.
 */
import { getData } from 'api/restUtilities';

export function changeGitHubAuthor(name, id, avatarURL, repos) {
    return {
        type: "CHANGE_GITHUB_AUTHOR",
        name,
        id,
        avatarURL,
        repos
    }
}

export function changeCurrentRepoIndex(repoIndex) {

    return {
        type: "CHANGE_CURRENT_REPO_INDEX",
        repoIndex
    }
}

export function setAvailableLabels(labels) {
    console.log(labels);
    return {
        type: "SET_AVAILABLE_LABELS",
        labels
    }
}

export function getCurrentRepoLabels(repoIndex){
    return (dispatch, getState) => {
        const author = getState().get('githubAuthor').githubAuthor.name;

        const repoName = getState().get('githubAuthor').githubAuthor.repos[repoIndex].repoName;

        const login = getState().get('user').user.login;
        const password = getState().get('user').user.password;

        const URL = 'https://api.github.com/repos/ipselon/bootstrap-prepack/labels';
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
                dispatch(setAvailableLabels(labels))
            }
        ).catch(
            error => { throw new Error(error) }
        );
    }
}