import React from 'react';
import Th from './Th';
import _ from 'lodash';

export default class Thead extends React.Component {

  constructor(props) {
    super(props);
  }

  renderThs() {
    return _.map(this.props.columns, (el, ind) => {
      return <Th key={ind} value={el.displayName} showFilter={el.showFilter} 
        sort={el.sort}
        hidable={el.hidable} 
        className={el.classes}
        onClose={this.handleCloseColumn.bind(this, el, ind)} 
        onFilter={this.handleFilterChange.bind(this, el, ind)} 
        onSort={this.handleSort.bind(this, el, ind)} />;
    });
  }

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
      <thead id={this.props.id} className={this.props.className}>
        <tr>
          {this.renderThs()}
        </tr>
      </thead>
    );
  }

}