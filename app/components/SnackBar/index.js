/**
 * Created by DMedzatiy on 12-Sep-16.
 */

import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autoHideDuration: 5000,
            open: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen!=this.state.open) {
            this.setState({
                open: nextProps.isOpen
            });
        }
    }
    
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleActionTouchTap = () => {
        this.setState({
            open: false,
        });
        
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
        this.props.onClose();
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.props.message}
                    autoHideDuration={this.props.autoHideDuration}
                    onActionTouchTap={this.handleActionTouchTap}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}
