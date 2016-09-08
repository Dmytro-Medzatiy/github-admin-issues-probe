/**
 * Created by DMedzatiy on 31-Aug-16.
 */

const getIssuesList = () => state => state.get('issues').issues;

const getCurrentIssueIndex = () => state => state.get('issues').currentIssueIndex;

const getCurrentIssue = () => state => state.get('issues').currentIssueIndex!= null ?
    state.get('issues').issues[state.get('issues').currentIssueIndex] : null;


export {
    getIssuesList,
    getCurrentIssueIndex,
    getCurrentIssue
}