/**
 * Created by Admin on 31.08.2016.
 */

import React, {Component, PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NotificationDoNotDisturb from 'material-ui/svg-icons/notification/do-not-disturb';

class IssueList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
        this.onIssueClick = this.onIssueClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentIssueIndex != this.state.selected) {
            this.setState({
                selected: nextProps.currentIssueIndex
            });
        }
    }

    onIssueClick(e) {
        e.preventDefault();
        e.stopPropagation();
        const issueIndex = Number(e.currentTarget.dataset.index);
        this.setState({
            selected: issueIndex
        });
        this.props.onChangeCurrentIssue(issueIndex);

    }

    render() {

        const listItems = this.props.issueList.map((issue, index)=> {
            const issueTitle = "Issue #" + issue.issueNumber;
            return (
                <ListItem primaryText={issueTitle}
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
                          secondaryText={issue.title}
                          secondaryTextLines={2}
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
