import * as React from 'react';
import { Link } from 'react-router-dom';

export default class MatchRow extends React.Component {
  constructor(props) {
    super(props);
  }

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
