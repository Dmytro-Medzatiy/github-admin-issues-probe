/**
 * Created by Admin on 30.08.2016.
 */

import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import ActionGrade from 'material-ui/svg-icons/action/grade';

class RepoSwitcher extends Component {
    constructor(props){
        super(props);
        this.state = {
            repo: null,
            index: null,

        };
        this.handleOnRepoChange = this.handleOnRepoChange.bind(this);

    }

    handleOnRepoChange (event, index, value) {

        console.log(this.props.repos[index].stars);
        this.setState({
            repo: value,
            index: index
        });
    }

    render(){
        const repos = this.props.repos.map((repo,index) => {
            return (
                <MenuItem value={index} primaryText={repo.repoName} key={index} />
            );
        });

        return (
            <div className="container-fluid">
            <div className="row ">
            <div className="col-xs"
                 style={{display:"flex", flexDirection:"column",justifyContent:'center'}}>
                <div className="box">
                    <SelectField
                        value={this.state.repo}
                        onChange={this.handleOnRepoChange}
                        hintText="Get Author info or SignIn first"
                        floatingLabelText="Select repository"
                        maxHeight={200}>
                        {repos}
                    </SelectField>
                    <Badge
                        badgeContent={(this.state.repo===null) ? 0 : this.props.repos[this.state.index].stars}
                        secondary={true}
                        style={{marginTop:"0.5em"}}
                    >
                        <ActionGrade />
                    </Badge>
                </div>
            </div>
            </div>
            </div>
        )
    }
}

export default RepoSwitcher;