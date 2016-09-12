/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class ModalDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: this.props.isOpen,

        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen != this.state.open) {
            this.setState({
                open: nextProps.isOpen,
            });
        }
    }

    handleClose = () => {
        this.props.onClose();
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

        const { title, content } = this.props;

        return (
            <div>
                <Dialog
                    title= {title}
                    titleStyle={{backgroundColor: "#00bcd4", color: "white"}}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    actionsContainerStyle={{textAlign:"center"}}
                >
                    {content}
                </Dialog>
            </div>
        );
    }
}