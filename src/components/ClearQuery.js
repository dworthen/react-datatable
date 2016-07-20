import React from 'react';
import { Link, withRouter, browserHistory, hashHistory } from 'react-router';
import _ from 'lodash';

class ClearQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(e) {
    e.preventDefault();
    const { router } = this.props;
    const { location } = this.context;
    let { query } = location;
    delete query[this.props.param];

    router.push({...location, ...query});
  }

  render() {
    return (
      <a href="" onClick={this.handleClick.bind(this)}>{this.props.children}</a>
    );
  }
}

ClearQuery.contextTypes = {
  location: React.PropTypes.object
};

export default withRouter(ClearQuery);