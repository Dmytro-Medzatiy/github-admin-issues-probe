/**
 * Created by Admin on 01.09.2016.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCurrentIssue } from 'containers/IssuesTracker/selectors';
import { getAvailableLabels } from 'containers/GitHubAuthor/selectors';
import { getCommentsList } from './selectors';
import { getSignedUser } from 'containers/HomePage/selectors';
import { changeCommentsList } from './actions';
import { onUpdateLabels } from 'containers/IssuesTracker/actions';

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
import ModalLoading from 'components/ModalLoading';
import LabelEditor from 'components/LabelEditor';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const marked = require('marked');

class IssueContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingComments: false,
            loadingComments: false,
            showLabelsEditor: false,
            authorizationRequest: false
        };
        this.onShowComments = this.onShowComments.bind(this);
        this.onEditLabels = this.onEditLabels.bind(this);
        this.onNewLabels = this.onNewLabels.bind(this);

    }

    onNewLabels(newLabels){

        this.setState({
            showLabelsEditor: false
        });
        //push to state and post through the async action
        this.props.onChangeLabels(newLabels, this.props.currentIssue.issueNumber);

    }

    onEditLabels(){
        const { signedUser, currentIssue } = this.props;
        if (signedUser.signed && signedUser.login.toUpperCase() == currentIssue.user.name.toUpperCase()) {
            this.setState({
                showLabelsEditor: true
            });
        } else {
            if (!signedUser) {
                this.setState({
                    authorizationRequest: "You have to Sign In first"
                });
            } else {
                this.setState({
                    authorizationRequest: "You don't have rights to edit this Issue Labels!"
                });
            }

        }
    }

    rawMarkup(text) {
        const rawMarkup = marked(text);
        return { __html: rawMarkup};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentIssue.issueNumber!=this.props.currentIssue.issueNumber) {
            this.setState({
                showingComments: false,
                showLabelsEditor: false
            });
            this.props.onChangeComments([]);
        }
    }

    onShowComments (){
        const { currentRepo, comments, currentIssue } = this.props;


        if (comments.length==0) {
            //fetch comments and place it in the state
            this.setState({
                loadingComments: true
            });
            const owner = currentRepo.owner;
            const repoName = currentRepo.repoName;
            const issueNumber = currentIssue.issueNumber;
            const URL = "https://api.github.com/repos/" + owner + "/" + repoName + "/issues/"+issueNumber+"/comments";
            const { login, password } = this.props.signedUser;
            getData(URL, login, password).then(
                response=> {
                    return response.map((comment) => {
                        return {
                            user: comment.user.login,
                            body: comment.body,
                            avatarURL: comment.user.avatar_url
                        }
                    });
                }
            ).then(
                response => {
                    this.props.onChangeComments(response);
                    this.setState({
                        loadingComments: false,
                        showingComments: !this.state.showingComments
                    });
                }
            ).catch(
                error => { throw new Error(error) }
            );

        } else {
            this.setState({
                showingComments: !this.state.showingComments
            });
        }

    }

    render() {
        const commentStyle = {
            fontStile: '1.5rem',
            lineHeight: '1.5rem'};
        const {currentIssue, comments} = this.props;

        const { showingComments } = this.state;


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
                    {this.state.loadingComments ? <ModalLoading  isOpen={true}
                                  text="Loading Comments, wait a moment..."
                    /> : null }
                    <LabelEditor labels={currentIssue.labels}
                                 defaultLabels={this.props.availableLabels}
                                 onSubmitNewLabels={this.onNewLabels}
                                 isOpen={this.state.showLabelsEditor} />

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
    availableLabels: getAvailableLabels()

});

function mapDispatchToProps(dispatch) {
    return {
        onChangeComments: (commentsList) => dispatch(changeCommentsList(commentsList)),
        onChangeLabels: (newLabels, issueNumber) => dispatch(onUpdateLabels(newLabels,issueNumber)),
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

