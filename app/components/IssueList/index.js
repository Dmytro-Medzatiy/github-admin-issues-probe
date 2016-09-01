/**
 * Created by Admin on 31.08.2016.
 */

import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NotificationDoNotDisturb from 'material-ui/svg-icons/notification/do-not-disturb';

class IssueList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        };
        this.onIssueClick = this.onIssueClick.bind(this);
    }

    onIssueClick(e){
        e.preventDefault();
        e.stopPropagation();
        const issueIndex = Number(e.currentTarget.dataset.index);
        this.setState({
            selected: issueIndex
        });
        this.props.onChangeCurrentIssue(issueIndex);

    }

    render() {

        const listItems = this.props.issueList.map((issue,index)=> {
            return (
                <ListItem primaryText={issue.title}
                          rightIcon={ issue.state=="open" ?
                            <ActionInfo color="green"
                                title="Open"
                            /> :
                            <NotificationDoNotDisturb color="red" title="Closed" />
                          }
                          title={issue.state=="open" ? "Open Issue" : "Closed Issue"}
                          key={index}
                          data-index={index}
                          style={this.state.selected == index ? {backgroundColor:"#adacac"}:{}}
                          onClick={this.onIssueClick}
                />
            )
        });


        return (
            <List>
                {listItems}
            </List>
        )
    }
}

IssueList.propTypes = {
    issueList: PropTypes.array.isRequired
};

export default IssueList;
