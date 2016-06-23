import React from 'react';
import _ from 'lodash';

import Thead from './Thead';
import Tbody from './Tbody';

export default class DataTable extends React.Component {

  handleFilterChange(el, ind, value) {
    this.props.onFilter(el, ind, value);
  }

  handleCloseColumn(el, ind) {
    this.props.onClose(el, ind);
  }

  handleSort(el, ind) {
    this.props.onSort(el, ind);
  }

  render() {
    return (
      <table id={this.props.id} className={this.props.className}>
        <Thead columns={this.props.columns} 
          onClose={this.handleCloseColumn.bind(this)} 
          onFilter={this.handleFilterChange.bind(this)} 
          onSort={this.handleSort.bind(this)} />
        <Tbody columns={this.props.columns} data={this.props.data} />
      </table>
    );
  }

}