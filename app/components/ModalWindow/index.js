/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class ModalWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.isOpen,
        };
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



                    contentStyle={{textAlign:"center"}}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <h4>{this.props.text}</h4>
                    <LinearProgress mode="indeterminate"  />
                </Dialog>
            </div>
        );
    }
}