/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';

import LinearProgress from 'material-ui/LinearProgress';


export default class ModalLoading extends React.Component {
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
                >
                    <h4>{this.props.text}</h4>
                    <LinearProgress mode="indeterminate"  />
                </Dialog>
            </div>
        );
    }
}