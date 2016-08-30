/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class ModalWindow extends React.Component {
    state = {
        open: this.props.isOpen,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Discard"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Alert" onTouchTap={this.handleOpen} />
                <Dialog
                    bodyStyle={{width: "15%", maxWidth: "none", backgroundColor: "black"}}
                    contentStyle={{backgroundColor: "black"}}
                    style={{backgroundColor: "transparent"}}

                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
<CircularProgress />
                </Dialog>
            </div>
        );
    }
}