import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Matches';
import MatchRow from './MatchRow';
import WithDataFetching from "../generic/WithDataFetching";

class Matches extends React.Component {
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
      <div>
        <h1>Matches</h1>
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
      </div>
    );
  }
}

export default connect(
  state => state.matches,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(WithDataFetching(Matches));
