import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Matches';
import WithDataFetching from "../generic/WithDataFetching";
import MatchTable from "./MatchTable";
import PageNavigator from "../fighters/PageNavigator";

class Matches extends React.Component {
  render() {
    const pageSize = 15;
    const matches = this.props.matches.slice(
      (this.props.currentPage - 1) * pageSize,
      this.props.currentPage * pageSize
    );

    return (
      <div>
        <h1>Matches</h1>
        <MatchTable matches={matches} />
        <PageNavigator
          clickHandler={(pageNumber) => this.props.changePage(pageNumber)}
          count={this.props.matches.length}
          currentPage={this.props.currentPage}
          pageSize={pageSize}
        />
      </div>
    );
  }
}

export default connect(
  state => state.matches,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(WithDataFetching(Matches));
