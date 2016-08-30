/**
 * Created by Admin on 30.08.2016.
 */

import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RepoSwitcher extends Component {
    constructor(props){
        super(props);

    }


    render(){
        const repos = this.props.repos.map((repo,index) => {
            return (
                <MenuItem value={index} primaryText={repo} key={index} />
            );
        });
        return (
            <div className="col-xs"
                 style={{display:"flex", flexDirection:"column",justifyContent:'center'}}>
                <div className="box">
                    <SelectField value={1} maxHeight={200}>
                        {repos}
                    </SelectField>
                </div>
            </div>
        )
    }
}

export default RepoSwitcher;