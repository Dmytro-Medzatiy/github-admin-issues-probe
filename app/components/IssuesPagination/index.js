/**
 * Created by Admin on 09.09.2016.
 */

import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavigationLastPage from 'material-ui/svg-icons/navigation/last-page';

class IssuesPagination extends Component {
    constructor(props){
        super(props);
        const { next, prev, first, last, perPage } = this.props.pagination;
        this.state = {
            selectValue: perPage,
            next,
            prev,
            first,
            last
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { next, prev, first, last } = nextProps.pagination;
        if (this.state.next!=next||this.state.first!=first||this.state.last!=last||this.state.prev!=prev ) {
            this.setState({
                next,
                first,
                last,
                prev
            });
        }
    }

    handleChange(event, index, value){
        this.setState({
            selectValue: value
        });

    }

    render(){
        const { next, prev, first, last, selectValue} = this.state;

       return(
           <div style={{textAlign: "center"}}>
               <IconButton tooltip="First Page"
                           touch={true}
                           tooltipPosition="top-center"
                           disabled={first==null? true: false}
               >
                   <NavigationFirstPage hoverColor="#ff9800" />
               </IconButton>
               <IconButton tooltip="Prev"
                           touch={true}
                           tooltipPosition="top-center"
                           disabled={prev==null? true: false}

               >
                   <NavigationChevronLeft hoverColor="#ff9800" />
               </IconButton>
               <SelectField
                   value={selectValue}
                   onChange={this.handleChange}
                   autoWidth={false}
                   style={{width: "85px"}}
                   title="Issues per Page"
               >
                   <MenuItem value={10} primaryText="10" />
                   <MenuItem value={20} primaryText="20" />
                   <MenuItem value={50} primaryText="50" />
                   <MenuItem value={100} primaryText="100" />

               </SelectField>
               <IconButton tooltip="Next"
                           touch={true}
                           tooltipPosition="top-center"
                           disabled={next==null? true: false}
               >
                   <NavigationChevronRight hoverColor="#ff9800" />
               </IconButton>
               <IconButton tooltip="Last Page"
                           touch={true}
                           tooltipPosition="top-center"
                           disabled={last==null? true: false}
               >
                   <NavigationLastPage hoverColor="#ff9800" />
               </IconButton>
           </div>
       );
    }
}

export default IssuesPagination;