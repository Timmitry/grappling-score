import * as React from 'react';

export default class MatchRow extends React.Component {
  render() {
    return (
      <tr key={this.props.id}>
        <td>{this.props.fighter1}</td>
        <td>{this.props.fighter2}</td>
        <td>{this.props.result}</td>
      </tr>
    );
  }
}
