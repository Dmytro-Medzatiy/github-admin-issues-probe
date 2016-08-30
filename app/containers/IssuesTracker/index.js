/**
 * Created by DMedzatiy on 30-Aug-16.
 */

import React, { Component } from 'react';
import RepoSwitcher from 'components/RepoSwitcher';

import Paper from 'material-ui/Paper';

import styles from './styles.css';

class IssuesTracker extends Component {
    render(){
        return(
            <Paper className={styles.content}>
                <div>
                    <RepoSwitcher repos={['none']} />
                </div>
            </Paper>
        )
    }
}

export default IssuesTracker;