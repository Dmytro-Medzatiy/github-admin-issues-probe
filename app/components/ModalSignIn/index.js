/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { checkAuthorization } from 'api/restUtilities';


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class ModalSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: "",
            login:"",
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

        const { login, password } = this.state;
        console.log("password:", password);
        checkAuthorization(login, password)
            .then(
                response => {
                    if (response) {
                        this.setState({
                            open: false,
                            error: "",
                            login:"",
                            password: ""
                        });

                        this.props.onSignInSubmit(login, password);
                        this.handleClose();

                    } else {
                        this.setState({
                            error: "Wrong Login or Password",

                        });
                    }
                }
            )



    }

    onChangeLoginField(){
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
        if (nextProps.isOpen==true) {
            this.setState({
                open:true
            });
        } else {
            this.setState({
                open:false
            });
        }
    }


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {


        return (
            <div>

                <Dialog
                    title="Enter GitHub Login and Password"

                    actionsContainerStyle={{textAlign: "center"}}
                    modal={false}
                    open= {this.state.open}
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
                        errorText={this.state.error}
                        value={this.state.login}
                        onChange={this.onChangeLoginField}
                        />
                        </div>
                        <TextField
                            hintText="Password"
                            ref={me => this.inputPassword = me}

                            errorText={this.state.error}
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