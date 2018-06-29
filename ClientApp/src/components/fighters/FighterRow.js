import * as React from 'react';
import { Link } from 'react-router-dom';

export default class FighterRow extends React.Component {
  render() {
    return (
      <tr key={this.props.id}>
          <td>{this.props.rank}</td>
          <td><Link to={`/fighters/${this.props.id}`}>{this.props.firstName}</Link></td>
          <td>{this.props.lastName}</td>
          <td>{Math.round(this.props.score)}</td>
        </tr>
    );
  }
}
