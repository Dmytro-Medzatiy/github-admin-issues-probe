/**
 * Created by D.Medzatiy on 29.08.2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeGitHubAuthor, changeCurrentRepoIndex, getCurrentRepoLabels } from './actions';
import { getGitHubAuthor, getRepoList, getCurrentRepoIndex } from './selectors';
import { getSignedUser } from 'containers/HomePage/selectors';
import { createStructuredSelector } from 'reselect';

import styles from './styles.css';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import defaultAvatar from 'assets/images/default_avatar.jpg';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ModalWindow from 'components/ModalWindow';

import { getData } from 'api/restUtilities';
import RepoSwitcher from 'components/RepoSwitcher';


class GitHubAuthor extends Component {
    constructor(props) {
        super(props);
        this.onSubmitAuthor = this.onSubmitAuthor.bind(this);
        this.getRepoList = this.getRepoList.bind(this);

        this.onChangeCurrentRepo = this.onChangeCurrentRepo.bind(this);
        this.getAuthorData = this.getAuthorData.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        console.log("newProps", nextProps.signedUser, this.props.signedUser, this.props.githubAuthor);
        if (nextProps.signedUser.login != this.props.signedUser.login &&
            nextProps.signedUser.login.length>0 && this.props.githubAuthor==undefined ) {
            this.setState({
                authorName: nextProps.signedUser.login
            });
            this.getAuthorData(nextProps.signedUser.login);
        }
    }

    onChangeTextField() {
        const inputValue = this.inputText.input.value;
        this.setState({
            authorName: inputValue
        });
    }

    onChangeCurrentRepo(index) {
        this.props.onNewRepo(index);
        this.props.onGetLabels(index);
    }

    onSubmitAuthor(e) {
        e.preventDefault();
        e.stopPropagation();
        const userName = this.state.authorName.trim();
        this.getAuthorData(userName);
    }

    getAuthorData(author) {
        const URL = 'https://api.github.com/users/' + author;
        const {login, password} = this.props.signedUser;
        getData(URL, login, password).then(
            response=> {
                if (response.notFound) {
                    this.setState({
                        notFound: true,
                        avatarURL: defaultAvatar,
                        error: 'Not Found'
                    });
                    this.props.newGitHubAuthor("", "", "", []);
                } else {
                    const author = response.login;
                    const id = response.id;
                    const avatarURL = response.avatar_url;


                    this.getRepoList(author).then(
                        repos=> {
                            this.props.newGitHubAuthor(author, id, avatarURL, repos);
                        }
                    );

                }
            }
        );
    }

    getRepoList(author){
        const {login, password} = this.props.signedUser;
        const URL = 'https://api.github.com/users/'+author+'/repos';
        return getData(URL, login, password).then(
            response=> {
                return response.map((repo) => {
                            return {
                                repoName: repo.name,
                                owner: repo.owner.login,
                                description: repo.description,
                                stars: repo.stargazers_count,
                                openIssues: repo.open_issues_count
                            }



                });
            }
        ).catch(
            error => { throw new Error(error) }
        );
    }

    render(){

        return(
            <Paper style={{width: '100%', minWidth:'360px',padding: '0 10px 10px 0', textAlign:"center"}} zDepth={1}>
                <div className="container-fluid">
                    <div className="row center-xs">
                        <div className="col-lg-2">
                            <div className="box">
                                <Avatar src={this.state.avatarURL} className={styles.avatar}/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="box">
                                <form onSubmit={this.onSubmitAuthor}>
                                    <TextField
                                        hintText="GitHub Author Name"
                                        ref={me => this.inputText = me}
                                        floatingLabelText="GitHub Author Name"
                                        errorText={this.state.error}
                                        value={this.state.authorName}
                                        onChange={this.onChangeTextField}
                                    />
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4"
                             style={{display: "flex",flexDirection: "column", justifyContent: "center"}}>
                            <FlatButton
                                onClick={this.onSubmitAuthor}
                                style={{marginLeft: "1em", marginTop: "1.5em"}}
                                label="Get info"
                            />
                        </div>
                        <div>
                            <RepoSwitcher
                                repos={this.props.repoList}
                                onChangeCurrentRepo={this.onChangeCurrentRepo}
                                currentRepo={this.props.currentRepoIndex}
                            />
                        </div>
                    </div>
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
        newGitHubAuthor: (user, id, avatarURL, repos) => dispatch(changeGitHubAuthor(user, id, avatarURL, repos)),
        onNewRepo: (index) => dispatch(changeCurrentRepoIndex(index)),
        onGetLabels: (index) => dispatch(getCurrentRepoLabels(index)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GitHubAuthor);
