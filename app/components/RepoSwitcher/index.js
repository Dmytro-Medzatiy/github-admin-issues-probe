/**
 * Created by Admin on 30.08.2016.
 */

import React, {Component} from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';

class RepoSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repo: null,
            index: null,
        };
        this.handleOnRepoChange = this.handleOnRepoChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentRepo == undefined || nextProps.currentRepo == null) {
            this.setState({
                repo: null
            });
        }
    }

    handleOnRepoChange(event, index, value) {
        this.setState({
            repo: value,
            index: index
        });
        this.props.onChangeCurrentRepo(index);
    }

    render() {
        const repos = this.props.repos.map((repo, index) => {
            return (
                <MenuItem value={index} primaryText={repo.repoName} key={index}/>
            );
        });

        return (
            <div className="container-fluid">
                <div className="row center">
                    <div className="col-xs"
                         style={{display:"flex", flexDirection:"column",justifyContent:'center'}}>
                        <div className="box">
                            <SelectField
                                value={this.state.repo}
                                onChange={this.handleOnRepoChange}
                                floatingLabelText={repos.length > 0 ? "Select repository" : "No available repos" }
                                maxHeight={200}>
                                {repos}
                            </SelectField>
                            <Badge
                                title="Repository Stars"
                                badgeContent={(this.state.repo===null||this.props.repos.length==0) ? 0 : this.props.repos[this.state.index].stars}
                                secondary={true}
                                style={{marginTop:"0.5em"}}
                            >
                                <ActionGrade hoverColor="#b4b338"/>
                            </Badge>
                            <Badge
                                title="Open Issues"
                                badgeContent={(this.state.repo===null||this.props.repos.length==0) ? 0 : this.props.repos[this.state.index].openIssues}
                                secondary={true}
                                style={{marginTop:"0.5em"}}
                            >
                                <CommunicationChat hoverColor="#b46310"/>
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RepoSwitcher;