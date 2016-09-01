/**
 * Created by Admin on 01.09.2016.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCurrentIssue } from 'containers/IssuesTracker/selectors';
import { getCommentsList } from './selectors';
import { changeCommentsList } from './actions';
import IssueLabels from 'components/IssueLabels';
import styles from './styles.css';
import Badge from 'material-ui/Badge';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import  IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const marked = require('marked');

class IssueContent extends Component {
    constructor(props){
        super(props);

    }

    rawMarkup() {
        const rawMarkup = marked(this.props.currentIssue.body);
        return { __html: rawMarkup};
    }

    render() {
        const commentStyle = {
            fontStile: '1.5rem',
            lineHeight: '1.5rem'};
        const {currentIssue} = this.props;
        if (currentIssue!= undefined) {
            return (
                <div>
                    <div className="row">
                        <div className="col-xs">
                    <IssueLabels  labels={currentIssue.labels} />
                            </div>


                    <div className="col-xs-1">
                    <IconButton tooltip={"Show available comments"}
                        touch={true}
                        style={{ height: "40px", marginTop: "-5px",marginLeft:"1em"}}
                        tooltipPosition="top-left">
                        <ActionVisibility hoverColor="#b46310"/>
                    </IconButton>
                    </div>
                    </div>
                    <Divider />

                    <Divider />

                    <Card className={styles.inner}>
                        <CardHeader
                            title={currentIssue.title}
                            subtitle={currentIssue.user.name}
                            avatar={currentIssue.user.avatarURL}
                        />
                        <CardText >
                            <span  dangerouslySetInnerHTML={this.rawMarkup()} />
                        </CardText>
                    </Card>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}

const mapStateToProps = createStructuredSelector({
   currentIssue: getCurrentIssue(),
   comments: getCommentsList(),
});

function mapDispatchToProps(dispatch) {
    return {
        onChangeComments: (commentsList) => dispatch(changeCommentsList(commentsList)),
        dispatch
    }
}

/*IssueContent.propTypes = {
    currentIssue: PropTypes.object.isRequired,
    comments: PropTypes.array,
    onChangeComments: PropTypes.func
};

IssueContent.defaultProps = {
    comments:[]
};*/

export default connect(mapStateToProps, mapDispatchToProps)(IssueContent);

