import React from 'react';
import _ from 'lodash';

import DataTable from './DataTable';

export default class QueryTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
  }

  componentWillMount() {
    // Need to determine
    const { query } = this.props.location;
    const { filter, sortorder, sortby } = query; 
    console.log(query);
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
    return (
      <DataTable columns={this.state.columns} 
        data={this.state.data} 
        onFilter={this.handleFilterChange.bind(this)} 
        onClose={this.handleCloseColumn.bind(this)} 
        onSort={this.handleSort.bind(this)} />
    );
  }

}