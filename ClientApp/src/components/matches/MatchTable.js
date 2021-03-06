import React from 'react';
import MatchRow from './MatchRow';

export default class MatchTable extends React.Component {
  fullName(fighter) {
    return `${fighter.firstName} ${fighter.lastName}`;
  }

  matchRowProps(match) {
    return {
      id: match.id,
      fighter1: `${match.fighter1.firstName} ${match.fighter1.lastName}`,
      fighter2: `${match.fighter2.firstName} ${match.fighter2.lastName}`,
      result: match.result,
    };
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Fighter 1</th>
            <th>Fighter 2</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {this.props.matches.map(match => (<MatchRow {...this.matchRowProps(match)} />))}
        </tbody>
      </table>
    );
  }
}
