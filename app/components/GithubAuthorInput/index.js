/**
 * Created by DMedzatiy on 05-Sep-16.
 */

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RepoSwitcher from 'components/RepoSwitcher';
import Avatar from 'material-ui/Avatar';

class GithubAuthorInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.author,
            errorMessage: ""
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitAuthor = this.onSubmitAuthor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.author.length > 0) {
            this.setState({
                userName: nextProps.author
            });
        }
    }

    onInputChange() {
        this.setState({
            userName: this.inputText.input.value
        });
    }

    onSubmitAuthor(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onAuthorSubmit(this.state.userName);
    }


    render() {
        return (

            <div className="row center-xs">
                <div className="col-lg-2">
                    <div className="box">
                        <Avatar src={this.props.src} style={{margin: "1em 2em 0 0"}}/>
                    </div>
                </div>
                <div className="col-lg-4">
                    <form onSubmit={this.onSubmitAuthor}>
                        <TextField
                            hintText="GitHub Author Name"
                            ref={me => this.inputText = me}
                            floatingLabelText="GitHub Author Name"
                            value={this.state.userName}
                            errorText={this.state.errorMessage}
                            onChange={this.onInputChange}
                        />
                    </form>
                </div>
                <div className="col-lg-2"
                     style={{display: "flex",flexDirection: "column", justifyContent: "center"}}>
                    <FlatButton
                        onClick={this.onSubmitAuthor}
                        style={{marginLeft: "1em", marginTop: "1.5em"}}
                        label="Get repos"
                    />
                </div>
                <div className="col-lg-4">
                    <RepoSwitcher repos={this.props.repos}
                                  onChangeCurrentRepo={this.props.onChangeCurrentRepo}
                                  currentRepo={this.props.currentRepo}

                    />
                </div>
            </div>
        )
    }
}

export default GithubAuthorInput;