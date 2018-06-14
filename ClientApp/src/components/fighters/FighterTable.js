import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Fighters';
import FighterRow from './FighterRow';
import './FighterTable.css';

// interface IFighterTableProps extends IFighterState {
//   fetchData: (url: string) => void,
// }

class FighterTable extends React.Component {
  componentDidMount() {
    this.props.fetchData('https://localhost:5001/api/fighters');
  }

  render() {
    const { error, isLoading, fighters } = this.props.fighters;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }

    const sortedFightersWithIndex = fighters
      .slice()
      .sort((fighter1, fighter2) => fighter2.score - fighter1.score)
      .map((fighter, index) => ({...fighter, rank: index + 1}));

    return (
      <div>
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
            {sortedFightersWithIndex.map(fighter => (<FighterRow {...fighter}/>))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    fighters: state.fighters,
    error: state.error,
    isLoading: state.isLoading,
  }
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actionCreators, dispatch)
  // {
  //   fetchData: (url) => dispatch(fightersFetchData(url))
  // }
);

export default connect(mapStateToProps, mapDispatchToProps)(FighterTable);
