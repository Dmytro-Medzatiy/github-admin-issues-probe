/**
 * Created by D.Medzatiy on 29.08.2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeGitHubAuthor, changeCurrentRepo } from './actions';
import { getGitHubAuthor, getRepoList, getCurrentRepoIndex } from './selectors';
import { getSignedUser } from 'containers/HomePage/selectors';
import { createStructuredSelector } from 'reselect';

import Paper from 'material-ui/Paper';

import GithubAuthorInput from 'components/GithubAuthorInput';

class GitHubAuthor extends Component {
    constructor(props) {
        super(props);
        this.onSubmitAuthor = this.onSubmitAuthor.bind(this);
        this.onChangeCurrentRepo = this.onChangeCurrentRepo.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Get repos of Signed User if currentGitHubAuthor is empty
        if (nextProps.signedUser.login != this.props.signedUser.login &&
            nextProps.signedUser.login.length>0 && this.props.githubAuthor.name.length == 0 ) {
                this.props.onChangeGitHubAuthor(nextProps.signedUser.login);
        }
    }

    onChangeCurrentRepo(index) {
        this.props.onChangeRepo(index);
    }

    onSubmitAuthor(userName) {
        this.props.onChangeGitHubAuthor(userName);
    }

    render(){
        const { githubAuthor, repoList, currentRepoIndex } = this.props;
        return(
            <Paper style={{width: '100%', minWidth:'360px',padding: '0 10px 10px 0', textAlign:"center"}} zDepth={1}>
                <div className="container-fluid">
                     <GithubAuthorInput author={githubAuthor.name}
                                        repos={repoList}
                                        currentRepo={currentRepoIndex}
                                        src={githubAuthor.avatarURL}
                                        onAuthorSubmit={this.onSubmitAuthor}
                                        onChangeCurrentRepo={this.onChangeCurrentRepo}
                     />
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    githubAuthor: getGitHubAuthor(),
    repoList: getRepoList(),
    currentRepoIndex: getCurrentRepoIndex(),
    signedUser: getSignedUser()
});

function mapDispatchToProps(dispatch){
    return {
        onChangeGitHubAuthor: (authorName) => dispatch(changeGitHubAuthor(authorName)),
        onChangeRepo: (index) => dispatch(changeCurrentRepo(index)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHubAuthor);
