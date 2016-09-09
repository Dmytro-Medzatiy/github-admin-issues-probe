/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeIssuesList, changeCurrentIssue, onGetIssues } from './actions';
import { onChangeLoadingWindow } from 'containers/HomePage/actions';
import { getRepoList, getCurrentRepoIndex } from 'containers/GitHubAuthor/selectors';
import { getCurrentIssueIndex, getCurrentIssue, getPaginationState } from './selectors';

import { getSignedUser } from 'containers/HomePage/selectors';

import RepoSwitcher from 'components/RepoSwitcher';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import IssueList from 'components/IssueList';
import IssueLabels from 'components/IssueLabels';
import { getData, fetchIssues } from 'api/restUtilities';
import IssueContent from 'containers/IssueContent';
import ModalLoading from 'components/ModalLoading';
import IssuesPagination from 'components/IssuesPagination';

import styles from './styles.css';

class IssuesTracker extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            issues: []
        };
        this.getNewIssues = this.getNewIssues.bind(this);
        this.onChangeCurrentIssue = this.onChangeCurrentIssue.bind(this);
        this.onFetch = this.onFetch.bind(this);
    }

    onFetch() {
        this.getNewIssues(8, "init");
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.currentRepoIndex!=this.props.currentRepoIndex && nextProps.currentRepoIndex!=null) {
            //this.props.showLoading(true, "Loading Issues, wait a moment...");
            this.setState({

                issues: []
            });
            //this.getIssues(nextProps.currentRepoIndex,"initial");
        } else {
            if (nextProps.currentRepoIndex==null) {
                this.setState({
                    issues: []
                });
                this.props.onChangeIssues([]);
            }
        }
    }

    onChangeCurrentIssue(issueIndex){
        this.props.changeCurrentIssue(issueIndex);
    }

    getNewIssues(repoIndex, type) {

        const {repoList} = this.props;
        const currentRepo = repoList[repoIndex];
        const owner = currentRepo.owner;
        const repoName = currentRepo.repoName;

        this.props.getIssues(owner, repoName, type);

    }

    render() {
        const {currentRepoIndex, repoList, pagination } = this.props;

        const message = currentRepoIndex == null ?
            "Choose Author and Repository first...":
            "There is no issues at this repo...";

        const list =  ((this.state.issues.length > 0 ) ?
            <IssueList issueList={this.state.issues}
                       onChangeCurrentIssue={this.onChangeCurrentIssue}
                       style={{height:"200px",overflow:"scrolling"}}
            /> :
            <h4 style={{padding:"15px", color: "#4b606b"}}>{message}</h4>);

        const issueContent = this.props.currentIssue != undefined ?
            <IssueContent currentRepo={repoList[currentRepoIndex]} /> : <h4 style={{margin:"2em"}}>Choose Issue</h4>;

        return (
            <div className="container" style={{marginTop:"0.5em"}}>
                <div className="row">
                    <div className="col-xs">
                        <div className="box" >
                            <Paper >
                                <div style={{textAlign: "left", backgroundColor: "#ff9800", color: "white"}}>
                                    <h4 style={{padding:"15px 0 15px 15px", margin:"0"}}>Issues</h4>
                                </div>

                                <IssuesPagination pagination={pagination}

                                />
                                <Divider />
                                <button onClick={this.onFetch} >
                                    onFetch
                                </button>
                                {list}

                            </Paper>
                        </div>
                    </div>
                    <div className="col-xs-8">
                        <div className="box">
                            <Paper style={this.props.currentIssueIndex!=null ? {display: "block"} : {display:"none"}}>
                                <div style={{textAlign: "left", backgroundColor: "#ff9800", color: "white"}}>
                                    <h4 style={{padding:"15px 0 15px 15px", margin:"0"}}>
                                        Issue #{this.props.currentIssueIndex+1}
                                    </h4>
                                </div>
                                {issueContent}
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = createStructuredSelector({
    repoList: getRepoList(),
    currentRepoIndex: getCurrentRepoIndex(),
    currentIssueIndex: getCurrentIssueIndex(),
    currentIssue: getCurrentIssue(),
    signedUser: getSignedUser(),
    pagination: getPaginationState()
    
});

function mapDispatchToProps(dispatch) {
    return {
        onChangeIssues: (issuesList) => dispatch(changeIssuesList(issuesList)),
        changeCurrentIssue: (issueIndex) => dispatch(changeCurrentIssue(issueIndex)),
        showLoading: (isOpen, text) => dispatch(onChangeLoadingWindow(isOpen,text)),
        getIssues: (owner, repoName, type) => dispatch(onGetIssues(owner, repoName, type)),
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesTracker);