/**
 * Created by Admin on 30.08.2016.
 */

const getGitHubAuthor = () => state => state.get('githubAuthor').githubAuthor;

const getRepoList = () => state => state.get('githubAuthor').githubAuthor.repos;

const getCurrentRepoIndex = () => state => state.get('githubAuthor').currentRepoIndex;

const getAvailableLabels = () => state => state.get('githubAuthor').availableLabels;

export {
    getGitHubAuthor,
    getRepoList,
    getCurrentRepoIndex,
    getAvailableLabels
}