import * as React from 'react';
import { Link } from 'react-router-dom';

// interface IFighterRowProps extends IFighter {
//   rank: number;
// }

export default class FighterRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr key={this.props.id}>
          <td>{this.props.rank}</td>
          <td><Link to={`/fighters/${this.props.id}`}>{this.props.firstName}</Link></td>
          <td>{this.props.lastName}</td>
          <td>{this.props.score}</td>
        </tr>
    );
  }
}
