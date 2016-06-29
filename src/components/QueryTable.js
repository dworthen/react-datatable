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

    // const { location, router } = this.props;
    // const { query, pathname } = this.context.location;
    // const { filter, sortorder, sortby, hide } = query; 

    // setTimeout(() => {
    //   this.props.router.push({query: { hide: ['name'] }});
    // }, 5000);

    // Need to determine
    // this.updateData(this.props);
  }

  getNewState(newProps, location) {
    const { router } = this.props;
    let { query, pathname } = location;
    let { filter, sortorder, sortby, hide } = query; 

    let columns = _.chain(newProps.columns)
      .filter( col => {
        return !_.includes(hide, col.key);
      })
      .value();

    let data = _.chain(newProps.data);

    if(filter) {
      filter = _.chain(filter)
        .map(el => decodeURIComponent(el).split('='))
        .fromPairs();

      data = data.filter(row => {
        return filter.every((value, key) => {
          let regex = new RegExp(value, 'i');
          return /derek/i.test(row['name']);
        });
      });
    }

    return {columns, data: data.value()};
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

  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  //   console.log(this.context.location.query.hide);
  // }

  handleFilterChange() {
    var val = '';
    return function(el, ind, value) {
      val = value;
      const { router } = this.props;
      const { location } = this.context;
      const { query } = location;
      let { filter } = query;


      function checkForChange(length) {
        if(length === val.length) {
          filter = _.chain([filter || ''].concat(el.key + '=' + val))
            .compact()
            .uniq()
            .map(el => decodeURIComponent(el).split('='))
            .fromPairs()
            .toPairs()
            .filter(val => !!val[1])
            .map(el => encodeURIComponent(el.join('=')))
            .value();

          router.push({query: {...query, filter }} );
          console.log(filter);
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


// export default withRouter(QueryTable);