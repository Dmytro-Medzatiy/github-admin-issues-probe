/**
 * Created by Admin on 01.09.2016.
 */

import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import IconButton from 'material-ui/IconButton';

class IssueLabels extends Component {
    constructor(props){
        super(props);
        this.styles = {
            chip: {
                margin: 4,

            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }
    render() {
        const labels = this.props.labels!=undefined && this.props.labels.length >0 ? this.props.labels.map((label,index) => {
            const color = "#"+label.color;
            const oppositeColors = ['#EE0701','#128A0C','#CC317C'];
            const labelColor = oppositeColors.indexOf(color.toUpperCase())>=0 ? "white": "black";
            return (<Chip key={index}
                          style={this.styles.chip}
                          backgroundColor= {color}
                          labelColor = {labelColor}
            >
                {label.name}
            </Chip>)

        }): <div></div>;
        return (
            <div>
                <div style={this.styles.wrapper}>

                    {labels}

                    <IconButton tooltip="Edit labels..."
                                touch={true}
                                style={{ height: "40px", marginTop: "-5px",marginLeft:"1em"}}
                                tooltipPosition="top-center">
                        <ActionNoteAdd hoverColor="#ff9800"/>
                    </IconButton>
                </div>

            </div>
        )
    }
}

export default IssueLabels;