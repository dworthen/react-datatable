import React from 'react';
import _ from 'lodash';

export default class Td extends React.Component {

  renderWithFormatting() {
    const { children } = this.props;
    const Formatter = this.props.formatter;
    if (!Formatter) return children;

    console.log(Formatter instanceof React.Component);

    if(typeof Formatter == 'function') {
      return <Formatter value={children} />;
    } else {
      return React.cloneElement(Formatter, {value: children});
    }

  }

  render() {
    return (
      <td id={this.props.id} className={this.props.className} >
        {this.renderWithFormatting()}
      </td>
    );
  }

}