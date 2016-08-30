/**
 * Created by Admin on 30.08.2016.
 */

const initialState = {
    githubAuthor: {
        user: "",
        id: "",
        avatarURL: "",
        repos: []
    }
};

function githubAuthorReducer(state=initialState,action) {
    switch (action.type) {
        case "CHANGE_GITHUB_AUTHOR":
            return {
                githubAuthor: {
                    name: action.name,
                    id: action.id,
                    avatarURL: action.avatarURL,
                    repos: action.repos
                }
            };
        default: {
            return state;
        };
    }
};

export default githubAuthorReducer;
