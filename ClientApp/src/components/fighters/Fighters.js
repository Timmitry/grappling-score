import * as React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Fighters';
import FighterTable from './FighterTable';
import './Fighters.css';
import PageNavigator from "./PageNavigator";

class Fighters extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/fighters');
  }

  render() {
    const pageSize = 15;
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
        <FighterTable fighters={fighters.slice((this.props.currentPage - 1) * pageSize, this.props.currentPage * pageSize)} />
        <PageNavigator clickHandler={(pageNumber) => this.props.changePage(pageNumber)} count={this.props.fighters.length} currentPage={this.props.currentPage} pageSize={pageSize} />
      </div>
    );
  }
}

export default connect(
  state => state.fighters,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Fighters);
