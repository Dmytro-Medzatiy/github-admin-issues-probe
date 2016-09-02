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


class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
            <div style={{padding: '20px'}}>
                <AppBar
                    title={<span className={styles.title}><FormattedMessage {...messages.title} /></span>}
                    iconElementLeft={<IconButton><ActionInfo /></IconButton>}
                    iconElementRight={<FlatButton label="Sign In" />}
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