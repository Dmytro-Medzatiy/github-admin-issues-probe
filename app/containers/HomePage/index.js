/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
        <div style={{padding: '20px'}}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
          <Paper style={{width: '100%'}} zDepth={1}>
            <div style={{padding: '20px'}}>
              <h3>Test</h3>
              <RaisedButton
                  label="Click Me"
                  fullWidth={true}
                  primary={true}
                  onClick={e => alert('Hey! You clicked!')} />
            </div>
          </Paper>
        </div>
    );
  }
}
