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
import * as actions from './actions';
import { getSignedUser } from './selectors';


import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FlatButton from 'material-ui/FlatButton';
import ModalDialog from 'components/ModalDialog';



class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        const modalContent =
            <div>
                <h4>General Info </h4>
                <p>This tool was created in learning purpose. The main aim of this tool is to show
                information about GitHub user repositories, existing issues, issue comments and
                labels</p>
                <h4>Security issue</h4>
                <p>For managing issue labels you have to SignIn with your GitHub login and password. Take into account
                    that this tool does not have any additional security modules - your password will be transferred thru the
                    standard HTTP request. This tool does not store any passwords or other user information, but if you don't
                    sure don't use your real data.</p>
                <p>Without authorization you still can view information about any existing GitHub user, repos and issues</p>
                <h4>Main workflow</h4>
                <ul>
                    <li>Enter GitHub user name and click on "GET INFO" or push "Enter" button</li>
                    <li>Choose user repository from the given list</li>
                    <li>If repo has issues, choose one from the list</li>
                    <li>You can show/hide comments</li>
                    <li>You can manage labels if you are signed and you are the owner/admin of this repo</li>
                </ul>
            </div>;

        return (
            <div style={{padding: '20px'}}>
                <AppBar
                    title={<span className={styles.title}><FormattedMessage {...messages.title} /></span>}
                    iconElementLeft={<IconButton><ActionInfo /></IconButton>}
                    iconElementRight={<FlatButton label="Sign In" />}
                />
                <ModalDialog title="GitHub Issue Admin Tool"
                             closeButtonText="Let's start!"
                             content={modalContent}
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
    user: getSignedUser()
});

function mapDispatchToProps(dispatch) {
    return {
        onSignIn: (user, token, avatarURL) => dispatch(signIn(user, token, avatarURL)),
        onSignOut: () => dispatch(signOut()),
        dispatch
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);