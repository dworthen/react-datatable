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

  renderWithFormatting() {
    const { children } = this.props;
    const Formatter = this.props.formatter;
    if (!Formatter) return children;
    
    if(typeof Formatter == 'function') {
      return <Formatter value={children} />;
    } else {
      return React.cloneElement(Formatter, {value: children});
    }

  }

  render() {
    return (
      <span onClick={this.handleClick.bind(this)}>
        {this.renderWithFormatting()}
      </span>
    );
  }
}

ClearQuery.contextTypes = {
  location: React.PropTypes.object
};

export default withRouter(ClearQuery);