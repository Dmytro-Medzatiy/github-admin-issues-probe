/**
 * Created by D.Medzatiy on 29.08.2016.
 */

import React, { Component } from 'react';

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

import { getDataUnauthorized } from 'api/restUtilities';

class RepoSwitcher extends Component {
    constructor(props){
        super(props);
        this.onFetch = this.onFetch.bind(this);
        this.onFetchRepos = this.onFetchRepos.bind(this);

        this.state = {
            notFound: true,
            js: "",
            avatarURL: defaultAvatar,
            repos: [],
            error:''
        };
    }

    onFetch(){
        const userName = this.inputText.input.value;
        const fetchOptions = {
            "method": "GET"
        };
        const URL = 'https://api.github.com/users/'+userName;
        getDataUnauthorized(URL).then(
            response=> {
                if (response.notFound) {
                    this.setState({
                        notFound: true,
                        js: {},
                        avatarURL: defaultAvatar,
                        repos: [],
                        error: 'Not Found'
                    });
                    this.inputText.errorText='Not Found';
                } else {
                    this.setState({
                        notFound: false,
                        js: response,
                        avatarURL: response.avatar_url,
                        error:''
                    });
                    this.onFetchRepos();
                }
            }

        );

    }

    onFetchRepos(){
        const userName = this.inputText.input.value;
        const fetchOptions = {
            "method": "GET"
        };
        const URL = 'https://api.github.com/users/'+userName+'/repos';
        getDataUnauthorized(URL,fetchOptions).then(
            response=> {
                    const repos = response.map((repo) => {
                        return repo.name
                    });
                    this.setState({
                        repos: repos
                    });
                }

        );
    }

    render(){

        return(
            <Paper style={{width: '100%', minWidth:'360px',padding: '0 10px 10px 0', textAlign:"center"}} zDepth={1}>

                <div className="container-fluid">
                    <div className="row center-xs">

                        <div className="col-xs" >
                            <div className="box">

                                <Avatar  src={this.state.avatarURL} className={styles.avatar} />
                                <TextField
                                    hintText="GitHub User Name"
                                    defaultValue=""
                                    ref={me => this.inputText = me}
                                    floatingLabelText="GitHub User Name"
                                    errorText={this.state.error}
                                />
                                <FlatButton
                                    style={{marginLeft: "1em"}}
                                    onClick={this.onFetch}
                                    label="Get repos"
                                />

                            </div>
                        </div>


                        </div>

                </div>


            </Paper>
        );
    }

}

export default RepoSwitcher;

