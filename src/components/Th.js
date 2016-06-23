import React from 'react';
import * as FA from 'font-awesome/css/font-awesome.css';
import classNames from 'classnames';

export default class Th extends React.Component {

  handleChange(e) {
    const { value } = e.target;
    this.props.onFilter(value);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.onClose(this.props.value);
  }

  handleSort(e) {
    e.preventDefault();
    this.props.onSort(this.props.value);
  }

  render() {
    const input = (
      <span><br/><input type="text" onChange={this.handleChange.bind(this)} /></span>
    );
    const hideButton = (
      <a href="" onClick={this.handleClose.bind(this)}>
        <i class="fa fa-close"></i>
      </a>
    );
    const label = (
      <span onClick={this.handleSort.bind(this)}>
        {this.props.value}
      </span>
    );
    const sortClasses = classNames({
      "fa": true,
      "fa-sort-desc": this.props.sort == "desc",
      "fa-sort-asc": this.props.sort == "asc",
      "fa-sort": this.props.sort
    });
    const sort = (
      <i className={sortClasses}></i>
    );
    return (
      <th className={this.props.className}>
        {this.props.hidable ? hideButton : null} 
        {label} {sort}
        {this.props.showFilter ? input : null}
      </th>
    );
  }

}