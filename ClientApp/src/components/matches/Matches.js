import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Matches';
import MatchRow from './MatchRow';

class Matches extends React.Component {
  componentDidMount() {
    this.props.fetchData('https://localhost:5001/api/matches');
  }

  fullName(fighter) {
    return `${fighter.firstName} ${fighter.lastName}`;
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
            {matches.map(match => (<MatchRow id={match.id} fighter1={this.fullName(match.fighter1)} fighter2={this.fullName(match.fighter2)} result={match.result}/>))}
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
