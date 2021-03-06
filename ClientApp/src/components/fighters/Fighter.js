import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Fighter';

class Fighter extends React.Component {
  async componentDidMount() {
    this.props.fetchData(`/api/fighters/${this.props.match.params.number}`)
  }

  render() {
    const { error, isLoading, firstName, lastName, score, rank } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{firstName} {lastName}</h1>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Score: {score}</p>
        <p>Rank: {rank}</p>
        <p><Link to={'/fighters'}>Back to fighters page</Link></p>
      </div>
    );
  }
}

export default connect(
  state => state.fighter,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Fighter);
