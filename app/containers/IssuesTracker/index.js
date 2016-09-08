/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeIssuesList, changeCurrentIssue } from './actions';
import { onChangeLoadingWindow } from 'containers/HomePage/actions';
import { getRepoList, getCurrentRepoIndex } from 'containers/GitHubAuthor/selectors';
import { getCurrentIssueIndex, getCurrentIssue } from './selectors';
import { getSignedUser } from 'containers/HomePage/selectors';

import RepoSwitcher from 'components/RepoSwitcher';

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import IssueList from 'components/IssueList';
import IssueLabels from 'components/IssueLabels';
import { getData, fetchIssues } from 'api/restUtilities';
import IssueContent from 'containers/IssueContent';
import ModalLoading from 'components/ModalLoading';

import styles from './styles.css';

class IssuesTracker extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            issues: []
        };
        this.getIssues = this.getIssues.bind(this);
        this.onChangeCurrentIssue = this.onChangeCurrentIssue.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.currentRepoIndex!=this.props.currentRepoIndex && nextProps.currentRepoIndex!=null) {
            this.props.showLoading(true, "Loading Issues, wait a moment...");
            this.setState({
                loading:true,
                issues: []
            });
            this.getIssues(1,nextProps.currentRepoIndex);
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

    getIssues(issueIndex, repoIndex) {
        const {repoList} = this.props;
        const currentRepo = repoList[repoIndex];

        const owner = currentRepo.owner;
        const repoName = currentRepo.repoName;
        const fetchURL = "https://api.github.com/repos/" + owner + "/" + repoName + "/issues/";
        const fetchOptions = {
            "method": "GET",
            "headers": {
                "Authorization": "token "
            }
        };
        const { login, password } = this.props.signedUser;

        getData(fetchURL+issueIndex.toString(), login, password).then(
            response=> {
                if (response.notFound) {
                    this.props.showLoading(false,"");
                    this.setState({
                        loading: false
                    });
                    this.props.onChangeIssues(this.state.issues);

                } else {
                    const commentsURL = response.comments_url;
                    const title = response.title;
                    const user = {
                        name: response.user.login,
                        avatarURL: response.user.avatar_url
                    };
                    const labels = response.labels.map((label)=>{
                        return {
                            name: label.name,
                            color: label.color
                        }
                    });
                    const state = response.state;
                    const comments = response.comments;
                    const body = response.body;
                    const issueNumber = response.number;
                    const closedBy = (response.closed_by!=null) ?
                    {
                        name: response.closed_by.login,
                        avatarURL: response.closed_by.avatar_url
                    } : null;
                    const issue = {
                        title,
                        commentsURL,
                        user,
                        labels,
                        state,
                        comments,
                        body,
                        issueNumber,
                        closedBy
                    };

                    this.setState({
                        issues: this.state.issues.concat(issue)
                    });
                     this.getIssues(issueIndex+1,repoIndex);
                }
            }
        ).catch(
            error => { throw new Error(error) }
        );

    }

    render() {
        const {currentRepoIndex, repoList} = this.props;

        const message = currentRepoIndex == null ?
            "Choose Author and Repository first...":
            "There is no issues at this repo...";

        const list =  ((this.state.issues.length > 0 ) ?
            <IssueList issueList={this.state.issues}
                       onChangeCurrentIssue={this.onChangeCurrentIssue}
                       style={{height:"200px",overflow:"scrolling"}}
            /> :
            <h4 style={{padding:"15px", color: "#4b606b"}}>{message}</h4>);


        const waiter = this.state.loading ?
            (<div style={{textAlign:"center"}}>
                <h4>Loading issues...</h4>
                <CircularProgress color="#ff9800"/>

            </div>) : null;
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
    signedUser: getSignedUser()
    
});

function mapDispatchToProps(dispatch) {
    return {
        onChangeIssues: (issuesList) => dispatch(changeIssuesList(issuesList)),
        changeCurrentIssue: (issueIndex) => dispatch(changeCurrentIssue(issueIndex)),
        showLoading: (isOpen, text) => dispatch(onChangeLoadingWindow(isOpen,text)),
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesTracker);