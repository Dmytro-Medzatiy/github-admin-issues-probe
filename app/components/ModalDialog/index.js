/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class ModalDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
        };
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <RaisedButton
                label={this.props.closeButtonText}
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];

        const { title, content } = this.props

        return (
            <div>
                <Dialog
                    title= {title}
                    titleStyle={{backgroundColor: "#00bcd4", color: "white"}}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    actionsContainerStyle={{textAlign:"center"}}
                >
                    {this.props.content}
                </Dialog>
            </div>
        );
    }
}