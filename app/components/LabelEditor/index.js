/**
 * Created by Admin on 03.09.2016.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';

import { defaultLabels } from './defaultLabels';




export default class LabelEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            checked: [ ]
        };
        this.onCheck = this.onCheck.bind(this);
        this.onLabelsSubmit = this.onLabelsSubmit.bind(this);
    }

    onLabelsSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.target.value);
    }

    onCheck(e){
        console.log(e.currentTarget.value + "=" +e.currentTarget.checked);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen) {
            this.setState({
                open: true,
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
        const actions = [
            <RaisedButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton
                label="Submit"
                secondary={true}
                onTouchTap={this.handleSubmit}
            />,
        ];
        const chipStyle = {
                margin: 4,
            };

        const labels = defaultLabels.map((label,index) => {
            const checked = this.props.labels.filter((x)=>x.name==label.name).length > 0;

            return (

                <ListItem style={{paddingTop: "5px", paddingBottom: "5px"}}
                          key={index}
                          leftCheckbox={<Checkbox
                            defaultChecked={checked}
                            value={index}
                            onCheck = {this.onCheck}
                           />} >
                    <Chip style={chipStyle}
                          backgroundColor= {label.backgroundColor}
                          labelColor = {label.color}>
                        {label.name}
                    </Chip></ListItem>
            )

        });




        return (
            <div>

                <Dialog
                    title="Available Labels"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{width:"450px"}}
                >
                    <form onSubmit={this.onLabelsSubmit}>
                    <List>
                        {labels}
                    </List>
                        <button type="Submit">Submit</button>
                    </form>
                </Dialog>
            </div>
        );
    }
}