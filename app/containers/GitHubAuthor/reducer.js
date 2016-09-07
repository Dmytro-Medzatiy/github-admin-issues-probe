/**
 * Created by Admin on 30.08.2016.
 */

import defaultAvatar from 'assets/images/default_avatar.jpg';

const initialState = {
    githubAuthor: {
        name: "",
        id: "",
        avatarURL: defaultAvatar,
        repos: [],
        errorMessage: ""
    },
    currentRepoIndex: null,
    availableLabels: []
};

function githubAuthorReducer(state=initialState,action) {
    switch (action.type) {
        case "CHANGE_GITHUB_AUTHOR":
            return {
                githubAuthor: {
                    name: action.name,
                    id: action.id,
                    avatarURL: action.avatarURL.length > 0 ? action.avatarURL : defaultAvatar,
                    repos: action.repos,
                    errorMessage: action.errorMessage
                },
                currentRepoIndex: null
            };
        case "CHANGE_CURRENT_REPO_INDEX":
            return {
                ...state,
                currentRepoIndex: action.repoIndex
            };
        case "SET_AVAILABLE_LABELS":
            return {
                ...state,
                availableLabels: action.labels
            };
        default: {
            return state;
        };
    }
};

export default githubAuthorReducer;
