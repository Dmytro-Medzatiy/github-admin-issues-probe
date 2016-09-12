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

import { getContrastYIQ } from 'api/colorIssues';

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
        const { checked } = this.state;
        const newLabels = this.props.defaultLabels.filter((label,index)=>{
            if (checked[index]) {
                return label
            }
        });
        this.props.onSubmitNewLabels(newLabels);
        this.handleClose();
    }

    onCheck(e){
        const checkBoxIndex = Number(e.currentTarget.value);
        const newValue = Boolean(e.currentTarget.checked);
        const { checked } = this.state;
        const newChecked = checked.map((value,index)=>{
            if (index==checkBoxIndex) {
                return newValue
            } else {
                return value
            }
        });
        this.setState({
            checked: newChecked
        });

    }

    componentWillReceiveProps(nextProps) {
        const { defaultLabels, labels } = nextProps;
        if (nextProps.isOpen) {
            const checked = defaultLabels.map((label)=>{
                if (labels.find((x)=>x.name==label.name)!=undefined)  {
                    return (
                        true
                    )
                } else {
                    return (
                        false
                    )
                }

            });

            this.setState({
                open: true,
                checked: checked
            });
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.props.onCloseEditor();
        this.setState({open: false});
    };

    render() {
        const chipStyle = {
            margin: 4,
        };

        const labels = this.props.defaultLabels.map((label, index) => {
            return (

                <ListItem style={{paddingTop: "5px", paddingBottom: "5px"}}
                          key={index}
                          leftCheckbox={<Checkbox
                            defaultChecked={this.state.checked[index]}
                            value={index}
                            onCheck = {this.onCheck}
                           />}>
                    <Chip style={chipStyle}
                          backgroundColor={"#"+label.color}
                          labelColor={getContrastYIQ(label.color)}>
                        {label.name}
                    </Chip></ListItem>
            )

        });


        return (
            <div>

                <Dialog
                    title="Available Labels"

                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{width:"450px"}}
                >
                    <form onSubmit={this.onLabelsSubmit}>
                        <List>
                            {labels}
                        </List>
                        <div style={{textAlign:"center"}}>
                            <RaisedButton
                                label="Cancel"
                                primary={true}
                                onTouchTap={this.handleClose}
                            />
                            <RaisedButton
                                label="Submit"
                                type="Submit"
                                secondary={true}
                                onTouchTap={this.onLabelsSubmit}
                            />
                        </div>
                    </form>

                </Dialog>
            </div>
        );
    }
}