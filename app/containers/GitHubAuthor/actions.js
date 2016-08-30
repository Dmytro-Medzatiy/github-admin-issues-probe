/**
 * Created by Admin on 30.08.2016.
 */

export function changeGitHubAuthor(name, id, avatarURL, repos) {
    return {
        type: "CHANGE_GITHUB_AUTHOR",
        name,
        id,
        avatarURL,
        repos
    }
}

