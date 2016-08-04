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

  fixTableHeader(table) {
    if(!table || !this.props.fixHeader) return;
    console.log('TABLE');
    let thead = table.querySelector('thead');
    let theadOffset = thead.getBoundingClientRect().top;
    let tableHeight = +getComputedStyle(table)
                   .getPropertyValue('height')
                   .split('px')[0];
    let tableOffset = table.getBoundingClientRect().top;
    let tableCells = document.querySelectorAll('th, td');

    for (var i = 0, l = tableCells.length; i < l; i++) {  
      var cell = tableCells[i];  
      cell.width = getComputedStyle(cell).getPropertyValue('width');
    }   

    function fixTableHeader(e) {  

      let originalStyle = thead.style;
      // If viewer has scrolled past the first row 
      // then fix/stick it to the top of the page
      if( window.pageYOffset > theadOffset ) {
        thead.style.position = 'fixed';
        thead.style.top = 0;
      }

      // If viewer has scrolled back above or past the table
      // then unfreeze the first row.
      if ( window.pageYOffset < theadOffset || 
        window.pageYOffset > (tableOffset + tableHeight)) {
        thead.style = originalStyle;
      }

    }

    window.addEventListener('scroll', fixTableHeader, false);  

  }

  render() {
    return (
      <table id={this.props.id} className={this.props.className} ref={this.fixTableHeader.bind(this)}>
        <Thead columns={this.props.columns} 
          onClose={this.handleCloseColumn.bind(this)} 
          onFilter={this.handleFilterChange.bind(this)} 
          onSort={this.handleSort.bind(this)} />
        <Tbody columns={this.props.columns} data={this.props.data} />
      </table>
    );
  }

}