/**
 * Created by Admin on 30.08.2016.
 */

const getGitHubAuthor = () => state => state.get('githubAuthor').githubAuthor.name;

const getRepoList = () => state => state.get('githubAuthor').githubAuthor.repos;

const getCurrentRepoIndex = () => state => state.get('githubAuthor').currentRepoIndex;

export {
    getGitHubAuthor,
    getRepoList,
    getCurrentRepoIndex
}