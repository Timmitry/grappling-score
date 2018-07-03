import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Fighters';
import FighterTable from './FighterTable';
import './Fighters.css';
import PageNavigator from "./PageNavigator";
import WithDataFetching from '../generic/WithDataFetching';

class Fighters extends React.Component {
  render() {
    const pageSize = 15;
    const fighters = this.props.fighters.slice(
      (this.props.currentPage - 1) * pageSize,
      this.props.currentPage * pageSize
    );

    return (
      <div>
        <h1>Fighters</h1>
        <FighterTable fighters={fighters} />
        <PageNavigator
          clickHandler={(pageNumber) => this.props.changePage(pageNumber)}
          count={this.props.fighters.length}
          currentPage={this.props.currentPage}
          pageSize={pageSize}
        />
      </div>
    );
  }
}

export default connect(
  state => state.fighters,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(WithDataFetching(Fighters));

