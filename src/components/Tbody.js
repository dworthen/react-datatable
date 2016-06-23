import React from 'react';
import Td from './Td';
import _ from 'lodash';


export default class Tbody extends React.Component {

  renderWithFormatting() {
    const { columns, data } = this.props;
    return _.map(data, (el, ind) => {
      return (
        <tr key={ind}>
          {_.map(columns, (col, i) => {
            const { formatter } = col;
            if(formatter) {
              return <Td key={i} className={col.classes} formatter={formatter}>{el[col.key]}</Td>;
            } 
            return <Td>{el[col.key]}</Td>;
          })}
        </tr>
      );
    });
  }

  render() {
    return (
      <tbody id={this.props.id} className={this.props.className}>
        {this.renderWithFormatting()}
      </tbody>
    );
  }

}