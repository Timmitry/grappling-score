import React from 'react';
import FighterRow from './FighterRow';

export default class FighterTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {this.props.fighters.map(fighter => (<FighterRow {...fighter}/>))}
        </tbody>
      </table>
    );
  }
}
