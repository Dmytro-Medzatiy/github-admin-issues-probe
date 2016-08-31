/**
 * Created by Admin on 30.08.2016.
 */

const getGitHubAuthor = () => state => state.get('githubAuthor').name;

const getRepoList = () => state => state.get('githubAuthor').githubAuthor.repos;

export {
    getGitHubAuthor,
    getRepoList,
}