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
            repos: []
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
                if (response.response == 404) {
                    this.setState({
                        notFound: true,
                        avatarURL: defaultAvatar
                    });
                } else {
                    this.setState({
                        notFound: false,
                        js: response,
                        avatarURL: response.avatar_url
                    });
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
                if (response.response == 404) {
                    this.setState({
                        notFound: true,
                        avatarURL: defaultAvatar
                    });
                } else {
                    const repos = response.map((repo) => {
                        return repo.name
                    });
                    this.setState({
                        repos: repos
                    });
                }
            }
        );
    }

    render(){
        const menuItems = this.state.repos.map((name,index)=>{
            return (
                <MenuItem value={index} primaryText={name} key={index} style={{type: "none"}} />
            );
        });
        return(
            <Paper style={{width: '100%'}} zDepth={1}>
                <ModalWindow isOpen={true} />
                <div style={{padding: '0 10px 10px 0', textAlign:"center"}} className="container-fluid">
<div className="row center">
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <div className="box">

                    <TextField
                        hintText="GitHub User Name"
                        defaultValue=""
                        ref={me => this.inputText = me}
                        floatingLabelText="GitHub User Name"
                    />
                            <RaisedButton
                            onClick={this.onFetch}
                            label="Gets"
                        />
                                </div>
                            </div>
                        <div className="col-lg-2 col-md-2">
                            <div className="box">
                    <Avatar
                        className={styles.avatar}
                        src={this.state.avatarURL} />
                            </div>
                            </div>

                        <div className="col-lg-5 col-md-5">
                            <div className="box">
                    <SelectField value={1} maxHeight={200} className={styles.list}>
                        {menuItems}
                    </SelectField>

                    <RaisedButton
                        onClick={this.onFetchRepos}
                        label="Show"
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

