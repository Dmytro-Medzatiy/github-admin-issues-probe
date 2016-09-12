/**
 * Created by Admin on 01.09.2016.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCurrentIssue } from 'containers/IssuesTracker/selectors';
import { getAvailableLabels, getGitHubAuthor } from 'containers/GitHubAuthor/selectors';
import { getCommentsList, getShowLabelsEditor, getShowComments, getSnackBarVisibility } from './selectors';
import { getSignedUser } from 'containers/HomePage/selectors';
import { changeCommentsList, getComments, changeShowingLabelsEditor, changeCommentsVisibility, onChangeSnackbarVisibility } from './actions';
import { onUpdateLabels } from 'containers/IssuesTracker/actions';
import { onChangeLoadingWindow, onChangeAuthorizationWindow } from 'containers/HomePage/actions';

import IssueLabels from 'components/IssueLabels';
import styles from './styles.css';
import Badge from 'material-ui/Badge';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import  IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import { getData, putData } from 'api/restUtilities';
import SnackBar from 'components/SnackBar';
import LabelEditor from 'components/LabelEditor';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const marked = require('marked');

class IssueContent extends Component {
    constructor(props){
        super(props);
        this.onShowComments = this.onShowComments.bind(this);
        this.onEditLabels = this.onEditLabels.bind(this);
        this.onNewLabels = this.onNewLabels.bind(this);
        this.onCloseLabelsEditor = this.onCloseLabelsEditor.bind(this);
        this.hideSnackbar = this.hideSnackbar.bind(this);

    }

    onCloseLabelsEditor() {
        this.props.onShowLabelsEditor(false);
    }
    
    hideSnackbar() {
        this.props.showSnackBar(false);
    }

    onNewLabels(newLabels){
        this.props.showSnackBar(true);
        //push to state and post through the async action
        this.props.onChangeLabels(newLabels, this.props.currentIssue.issueNumber);
        

    }

    onEditLabels(){
        const { signedUser, currentIssue, currentRepo } = this.props;
        if (signedUser.signed && signedUser.login.toUpperCase() == currentRepo.owner.toUpperCase()) {
            this.props.onShowLabelsEditor(true);
        } else {
            if (!signedUser.signed) {
                this.props.showAuthorizationRequest(true,"To change existing labels you have to Sign Up first");
            } else {
                this.props.showAuthorizationRequest(true,"You don't have rights to edit this Issue Labels!");
            }

        }
    }

    rawMarkup(text) {
        const rawMarkup = marked(text);
        return { __html: rawMarkup};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentIssue!=undefined && nextProps.currentIssue.issueNumber!=this.props.currentIssue.issueNumber) {
            this.props.commentsVisibility(false);
            this.props.onChangeComments([]);
        }
    }

    onShowComments (){
        const { currentRepo, comments, currentIssue } = this.props;

        if (comments.length==0) {
            //fetch comments and place it in the state

            const owner = currentRepo.owner;
            const repoName = currentRepo.repoName;
            const issueNumber = currentIssue.issueNumber;
            this.props.getComments(owner, repoName, issueNumber);
            this.props.commentsVisibility(!this.props.showingComments);
        } else {
            this.props.commentsVisibility(!this.props.showingComments);
        }
    }

    render() {
        const commentStyle = {
            fontStile: '1.5rem',
            lineHeight: '1.5rem'};
        const {currentIssue, comments, showingComments} = this.props;

        if (currentIssue!= undefined) {
            let showCommentsButton = "";
            if (currentIssue.comments > 0) {
                showCommentsButton =
                    <div className="col-xs-1">
                        <IconButton tooltip={showingComments ? "Hide comments" : "Show available comments"}
                                    touch={true}
                                    style={{ height: "40px", marginTop: "-5px",marginLeft:"1em"}}
                                    tooltipPosition="top-right"
                                    onClick={this.onShowComments}>
                            {showingComments ?
                                <ActionVisibility hoverColor="#b46310"/> :
                                <ActionVisibilityOff hoverColor="#b46310"/>}
                        </IconButton>
                    </div>
            } else {
                showCommentsButton="";
            }
            let commentsContent = "";
            if (showingComments && comments.length > 0) {
                commentsContent = comments.map((comment, index) => {
                    return (
                            <div key={index}>
                                <Card className={styles.inner}>
                                    <CardHeader
                                        title={comment.user}
                                        avatar={comment.avatarURL}
                                    />
                                    <CardText >
                                        <span dangerouslySetInnerHTML={this.rawMarkup(comment.body)}/>
                                    </CardText>
                                </Card>

                            </div>
                        )
                });
            } else {
                commentsContent = "";
            }

            return (
                <div>
                    <SnackBar isOpen={this.props.snackBarVisibility}
                              message="Labels are updated. New data will be accessible in a minute..."
                              autoHideDuration={6000}
                              onClose={this.hideSnackbar}
                    />
                    <LabelEditor labels={currentIssue.labels}
                                 defaultLabels={this.props.availableLabels}
                                 onSubmitNewLabels={this.onNewLabels}
                                 onCloseEditor={this.onCloseLabelsEditor}
                                 isOpen={this.props.showLabelsEditor} />

                    <div className="row">
                        {showCommentsButton}
                        <div className="col-xs center-xs">
                            <IssueLabels labels={currentIssue.labels}
                                         onEditLabels={this.onEditLabels}
                            />
                        </div>
                    </div>
                    <Divider />
                    <Card className={styles.inner}>
                        <CardHeader
                            title={currentIssue.title}
                            subtitle={currentIssue.user.name}
                            avatar={currentIssue.user.avatarURL}
                        />
                        <CardText >
                            <span dangerouslySetInnerHTML={this.rawMarkup(currentIssue.body)}/>
                        </CardText>
                    </Card>
                    <Divider />
                    {commentsContent}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}

const mapStateToProps = createStructuredSelector({
    currentIssue: getCurrentIssue(),
    comments: getCommentsList(),
    signedUser: getSignedUser(),
    availableLabels: getAvailableLabels(),
    showLabelsEditor: getShowLabelsEditor(),
    showingComments: getShowComments(),
    snackBarVisibility: getSnackBarVisibility(),


});

function mapDispatchToProps(dispatch) {
    return {
        onChangeComments: (commentsList) => dispatch(changeCommentsList(commentsList)),
        onChangeLabels: (newLabels, issueNumber) => dispatch(onUpdateLabels(newLabels,issueNumber)),
        showLoading: (isOpen, text) => dispatch(onChangeLoadingWindow(isOpen, text)),
        getComments: (owner, repoName, issueNumber) => dispatch(getComments(owner, repoName, issueNumber)),
        onShowLabelsEditor: (flag) => dispatch(changeShowingLabelsEditor(flag)),
        commentsVisibility: (flag) => dispatch(changeCommentsVisibility(flag)),
        showAuthorizationRequest: (isOpen, text) => dispatch(onChangeAuthorizationWindow(isOpen, text)),
        showSnackBar: (flag) => dispatch(onChangeSnackbarVisibility(flag)),
        dispatch
    }
}

/*IssueContent.propTypes = {
    currentIssue: PropTypes.object.isRequired,
    comments: PropTypes.array,
    onChangeComments: PropTypes.func
};

IssueContent.defaultProps = {
    comments:[]
};*/

export default connect(mapStateToProps, mapDispatchToProps)(IssueContent);

