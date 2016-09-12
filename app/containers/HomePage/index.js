/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import GitHubAuthor from 'containers/GitHubAuthor';
import Footer from 'components/Footer';
import IssuesTracker from 'containers/IssuesTracker';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signIn, signOut, onSignInAction, onChangeLoadingWindow, onChangeAuthorizationWindow } from './actions';
import { getSignedUser, getShowSignInDialog, getLoadingWindowState, getAuthorizationRequest } from './selectors';


import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FlatButton from 'material-ui/FlatButton';
import ModalDialog from 'components/ModalDialog';
import ModalSignIn from 'components/ModalSignIn';
import ModalLoading from 'components/ModalLoading';



class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props){
        super(props);
        this.onSignInAction = this.onSignInAction.bind(this);
        this.onSignInSubmit = this.onSignInSubmit.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.onSignInClose = this.onSignInClose.bind(this);
        this.onAuthorizationRequestClose = this.onAuthorizationRequestClose.bind(this);

    }

    onAuthorizationRequestClose() {
        this.props.changeAuthorizationRequest(false,"");
    }

    onSignInAction(){
        this.props.onSignInAction(true);
    }

    onSignInClose() {
        this.props.onSignInAction(false);
    }

    onSignOut() {
        this.props.onSignOut();
    }

    onSignInSubmit(login, password) {
        this.props.onSignIn(login, password);
    }

    render() {
        const modalContent =
            <div>
                <h4>General Info </h4>
                <p>This tool was created in learning purpose. The main aim of this tool is to show
                information about GitHub user repositories, existing issues, issue comments and
                labels</p>
                <h4>Security issue</h4>
                <p>For managing issue labels you have to Sign In with your GitHub login and password. Take into account
                    that this tool does not have any additional security modules - your password will be transferred thru the
                    standard HTTP request in base64 encoding. This tool does not store any passwords or other user information.</p>
                <p>Without authorization you still can view information about any existing GitHub user, repos and issues
                but you will be limited by 60 request per hour</p>
                <h4>Main workflow</h4>
                <ul>
                    <li>Sign In or use tool without signing in</li>
                    <li>Enter GitHub user name and click on "GET INFO" or push "Enter" button</li>
                    <li>Choose user repository from the given list</li>
                    <li>If repo has issues, choose one from the list</li>
                    <li>You can show/hide comments</li>
                    <li>You can manage labels if you are signed and you are the owner/admin of this repo</li>
                </ul>
            </div>;

        const { user } = this.props;

        return (
            <div style={{padding: '20px'}}>
                <ModalDialog title="GitHub Issue Admin Tool"
                             closeButtonText="Let's start!"
                             content={modalContent}
                             isOpen={true}

                />
                <ModalDialog title="Authorization needed"
                             closeButtonText="OK"
                             content={this.props.authorizationRequest.text}
                             isOpen={this.props.authorizationRequest.showing}
                             onClose={this.onAuthorizationRequestClose}
                />
                <ModalSignIn isOpen={this.props.showSignInDialog}
                             errorMessage={user.errorMessage}
                             onSignInSubmit={this.onSignInSubmit}
                             onSignInClose = {this.onSignInClose}
                />
                <ModalLoading  isOpen={this.props.loadingWindowState.isOpen}
                               text={this.props.loadingWindowState.text}
                />

                <AppBar
                    title={<span className={styles.title}><FormattedMessage {...messages.title} /></span>}
                    iconElementLeft={<IconButton><ActionInfo /></IconButton>}

                    iconElementRight={
                        this.props.user.signed ?
                        <FlatButton label="Sign Out" onTouchTap={this.onSignOut}/>:
                        <FlatButton label="Sign In" onTouchTap={this.onSignInAction} />}

                />
                <GitHubAuthor />
                <IssuesTracker />
            </div>
        );
    }
}

HomePage.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    user: getSignedUser(),
    showSignInDialog: getShowSignInDialog(),
    loadingWindowState: getLoadingWindowState(),
    authorizationRequest: getAuthorizationRequest()
});

function mapDispatchToProps(dispatch) {
    return {
        onSignIn: (login, password) => dispatch(signIn(login, password)),
        onSignOut: () => dispatch(signOut()),
        onSignInAction: (isOpen) => dispatch(onSignInAction(isOpen)),
        onChangeLoadingWindow: (isOpen, text) => dispatch(onChangeLoadingWindow(isOpen, text)),
        changeAuthorizationRequest: (isOpen, text) => dispatch(onChangeAuthorizationWindow(isOpen,text)),
        dispatch
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);