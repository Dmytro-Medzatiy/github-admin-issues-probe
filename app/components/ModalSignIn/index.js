/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {checkAuthorization} from 'api/restUtilities';

export default class ModalSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            errorMessage: "",
            login: "",
            password: ""
        };
        this.onChangeLoginField = this.onChangeLoginField.bind(this);
        this.onChangePasswordField = this.onChangePasswordField.bind(this);
        this.onSignInSubmit = this.onSignInSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onSignInSubmit(e) {
        e.stopPropagation();
        e.preventDefault();

        const {login, password} = this.state;

        this.props.onSignInSubmit(login, password);
    }

    onChangeLoginField() {
        const inputValue = this.inputLogin.input.value;
        this.setState({
            login: inputValue
        });
    }

    onChangePasswordField() {
        const inputValue = this.inputPassword.input.value;
        this.setState({
            password: inputValue
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen == true) {
            this.setState({
                open: true
            });
        } else {
            this.setState({
                open: false
            });
        }

        if (nextProps.errorMessage != this.state.errorMessage) {
            this.setState({
                errorMessage: nextProps.errorMessage
            });
        }
    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.props.onSignInClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    title="Enter GitHub Login and Password"
                    actionsContainerStyle={{textAlign: "center"}}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    titleStyle={{backgroundColor: "#00bcd4", color: "white"}}
                >
                    <form onSubmit={this.onSignInSubmit}
                          style={{textAlign:"center"}}
                    >
                        <div>
                            <TextField
                                hintText="GitHub Login"
                                ref={me => this.inputLogin = me}
                                floatingLabelText="GitHub Login"
                                errorText={this.state.errorMessage}
                                value={this.state.login}
                                onChange={this.onChangeLoginField}
                            />
                        </div>
                        <TextField
                            hintText="Password"
                            ref={me => this.inputPassword = me}

                            errorText={this.state.errorMessage}
                            value={this.state.password}
                            onChange={this.onChangePasswordField}
                            type="password"
                        />
                        <div style={{marginTop:"1em"}}>
                            <RaisedButton
                                label="Cancel"
                                primary={true}
                                onTouchTap={this.handleClose}
                                style={{marginRight:"1em"}}
                            />
                            <RaisedButton
                                label="Submit"
                                secondary={true}
                                type="Submit"
                            />
                        </div>
                    </form>
                </Dialog>
            </div>
        );
    }
}