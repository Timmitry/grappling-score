import * as React from 'react';
import { Link } from 'react-router-dom';
// import IFighter from '../../interfaces/IFighter';

// interface IFighterDetailState extends IFighter {
//   isLoaded: boolean,
//   error: Error | null,
// }

export default class FighterDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: parseInt(this.props.match.params.number, 10),
      firstName: '',
      lastName: '',
      score: 0,
      error: null,
      isLoaded: false,
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(`http://localhost:5000/api/fighters/${this.state.id}`);
      const fighter = await response.json();
      this.setState({ isLoaded: true, ...fighter });
    } catch(error) {
      this.setState({ isLoaded: true, error });
    }
  }

  render() {
    return (
      <div>
        <p>First Name: {this.state.firstName}</p>
        <p>Last Name: {this.state.lastName}</p>
        <p>Score: {this.state.score}</p>
        <p><Link to={'/fighters'}>Back to fighters page</Link></p>
      </div>
    );
  }
}
