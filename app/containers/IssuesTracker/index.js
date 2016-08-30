/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class IssuesTracker extends Component {
    render(){
        return(
            <Paper className="content">
                <div>
                    {this.props.issuesList}
                </div>
            </Paper>
        )
    }
}

export default IssuesTracker;