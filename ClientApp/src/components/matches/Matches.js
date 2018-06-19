import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Matches';
import MatchRow from './MatchRow';

class Matches extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/matches');
  }

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
    const { error, isLoading, matches } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }

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
            {matches.map(match => (<MatchRow {...this.matchRowProps(match)} />))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => state.matches,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Matches);
