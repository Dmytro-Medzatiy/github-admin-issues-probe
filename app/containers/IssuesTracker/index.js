/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeIssuesList } from './actions';
import { getRepoList } from 'containers/GitHubAuthor/selectors'; 

import RepoSwitcher from 'components/RepoSwitcher';

import Paper from 'material-ui/Paper';

import styles from './styles.css';

class IssuesTracker extends Component {
    render(){
        return(
            <Paper className={styles.content}>
                <div>
                    <RepoSwitcher repos={this.props.repoList} />
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    repoList: getRepoList()
    
});

function mapDispatchToProps(dispatch) {
    return {
        onChangeIssues: (repoId, issuesList) => dispatch(changeIssuesList(repoId, issuesList))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesTracker);