import React from 'react';
import { Link, withRouter, browserHistory, hashHistory } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';


import Th from '../src/components/Th';
import Td from '../src/components/Td';
import Tbody from '../src/components/Tbody';
import Thead from '../src/components/Thead';
import DataTable from '../src/components/DataTable';

class Bold extends React.Component {

  render() {
    return (
      <strong>{this.props.value}</strong>
    );
  }

}


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
      // columns: _.map(window.columns, el => { 
      //   el.showFilter = true; 
      //   el.hidable = true; 
      //   el.sort = false;
      //   return el; 
      // }),
      // data: window.data
    };
  }

  componentDidMount() {
    this.setState({
      data: window.data,
      columns: _.map(window.columns, el => { 
        el.showFilter = true; 
        el.hidable = true; 
        el.sort = true;
        el.classes = classNames('hide', 'test');
        el.formatter = Bold;
        return el; 
      })
    });
    // setTimeout(() => {
    //   console.log(this.state.columns);
    //   let newColumns = _.map(this.state.columns, el => {
    //     el.showFilter = false; 
    //     el.hidable = false; 
    //     el.sort = false;
    //     return el;
    //   });
    //   this.setState({ columns: newColumns });
    // }, 5000);
    // console.log(this.state.columns);
  }

  handleFilterChange(el, ind, value) {
    console.log("from app: %s, %s, %s", el.key, ind, value);
  }

  handleCloseColumn(el, ind) {
    console.log("from app: %s, %s", el.key, ind);
  }

  handleSort(el, ind) {
    let sort = el.sort || false;
    sort = sort === "asc" ? "desc" : "asc";
    let newColumns = _.cloneDeep(this.state.columns);
    newColumns[ind].sort = sort;
    console.log(newColumns);
    this.setState({ columns: newColumns });
    console.log("from app: %s, %s, %s", el.key, ind, sort);
  }

  render() {
    const classes = classNames(['test', 'two']);
    return (
      <div>
        <h1>App Name</h1>
        <DataTable columns={this.state.columns} 
          data={this.state.data} 
          onFilter={this.handleFilterChange.bind(this)} 
          onClose={this.handleCloseColumn.bind(this)} 
          onSort={this.handleSort.bind(this)} />
      </div>
    );
  }

}