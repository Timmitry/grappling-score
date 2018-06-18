import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Fighters';
import FighterRow from './FighterRow';
import './Fighters.css';

class Fighters extends React.Component {
  componentDidMount() {
    this.props.fetchData('https://localhost:5001/api/fighters');
  }

  render() {
    const { error, isLoading, fighters } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Fighters</h1>
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
            {fighters.map(fighter => (<FighterRow {...fighter}/>))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  state => state.fighters,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Fighters);
