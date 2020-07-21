import React from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import AppRoutes from './AppRoutes';

import { getStoredPlants } from './actions/getStoredPlants';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: false
    }
    //console.log("Main");
    this.handleUpdate = this.handleUpdate.bind(this);

  }

  componentDidMount() {
    //console.log("Main componentDidMount");
    return getStoredPlants().then(data => {
      //console.log(data);
      this.setState({
        plants: data
      })
    });
  }

  handleUpdate(plants) {
    this.setState({
      plants: plants
    })
  }

  render () {
    return (
      <div>
        <Header />
        { this.state.plants !== false ?
          <AppRoutes plants={this.state.plants} />
          : <div className="text-center"><br /><br /><br /><Spinner /></div>
        }
      </div>
    );
  }
}

export default Main;
