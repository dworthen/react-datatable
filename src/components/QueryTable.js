import React from 'react';
import { Link, withRouter, browserHistory, hashHistory } from 'react-router';
import _ from 'lodash';

import DataTable from './DataTable';

class QueryTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
  }

  componentDidMount() {
    console.log('ComponentDidMount');
    this.props.router.listen(location => {
      console.log('hide: ', location.query.hide);
      this.setState(this.getNewState(this.props, location));
    });
  }

  getNewState(newProps, location) {
    const { router } = this.props;
    let { query, pathname } = location;
    let { filter, sortorder, sortby, hide } = query; 

    let columns = _.chain(newProps.columns)
      // .map(col => {
      //   col.filterText = '';
      //   return col;
      // })
      .filter( col => {
        return !_.includes(hide, col.key);
      });

    let data = _.chain(newProps.data);


    if(filter) {
      console.log('Filter, ', filter);
      filter = _.chain([].concat(filter))
        .map(el => decodeURIComponent(el).split('='))
        .fromPairs();

      console.log(filter.value());

      data = data.filter(row => {
        console.log('filter');
        return filter.every(function (value, key) {
          let regex = new RegExp(value, 'i');
          return regex.test(row[key] || value);
        }).value();
      });

      // columns = columns.map(col => {
      //   col.filterText = filter.has(col.key) ? filter.get(col.key).value() : '';
      //   return col;
      // });
    }

    if (sortby && sortorder) {
      columns = columns.map(col => {
        col.sort = col.key === sortby ? sortorder : true;
        return col;
      });
      data = data.sortBy(sortby, row => { return _.isString(row[sortby]) ? row[sortby].toLowerCase() : row[sortby]; });
      data = sortorder === 'desc' ? data.reverse() : data;
    }

    return {columns: columns.value(), data: data.value()};
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps');
    const { columns, data } = this.props;
    if(columns.length === 0 || data.length === 0) {
      console.log('STATE CHANGE');
      const state = this.getNewState(newProps, this.context.location);
      this.setState(state);
    }
  }

  handleFilterChange() {
    var val = '';
    return function(el, ind, value) {
      val = value;
      const { router } = this.props;
      const { location } = this.context;
      const { query } = location;
      let { filter } = query;

      el.filterText = value;
      let columns = this.state.columns;
      columns[ind] = el;
      this.setState({columns});

      function checkForChange(length) {
        if(length === val.length) {
          console.log('CHCEKFORCHANGE');
          filter = _.chain([filter || ''].concat(el.key + '=' + val))
            .compact()
            .uniq()
            .map(el => decodeURIComponent(el).split('='))
            .fromPairs()
            .toPairs()
            .filter(val => !!val[1])
            .map(el => encodeURIComponent(el.join('=')))
            .value();

            // if(val.length === 1) {
              router.push({query: {...query, filter }} );
            // } else {
            //   router.replace({...location, query: {...query, filter }});
            // }
        } 
      }
      setTimeout(checkForChange.bind(this, val.length), this.props.filterdelay);
    };
  }

  handleCloseColumn(el, ind) {
    const { router } = this.props;
    const { location } = this.context;
    const { query } = location;
    let { hide } = query; 

    hide = _.chain([el.key].concat(hide || ''))
      .compact()
      .uniq()
      .value();

    router.push({query: {...query, hide }} );
  }

  handleSort(el, ind) {
    const { router } = this.props;
    const { location } = this.context;
    const { query } = location;
    let sort = (el.sort && el.sort === 'asc') ? 'desc' : 'asc';

    router.push({...location, query: {...query, sortby: el.key, sortorder: sort}});
  }

  render() {
    return (
      <DataTable columns={this.state.columns} 
        data={this.state.data} 
        onFilter={this.handleFilterChange().bind(this)} 
        onClose={this.handleCloseColumn.bind(this)} 
        onSort={this.handleSort.bind(this)} />
    );
  }

}

QueryTable.contextTypes = {
  location: React.PropTypes.object
};

export default withRouter(QueryTable);
