import React from 'react';
//import Header from './components/Header';
import Spinner from './components/Spinner';
import AppRoutes from './AppRoutes';
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import SiteLocation from './components/SiteLocation'

import { getStoredPlants } from './actions/getStoredPlants';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPlants: false,
      searchTerm: "",
      plants: []
    }
    this.country="US"
    this.state_="NC"
    //console.log("Main");
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    //console.log("Main componentDidMount");
    return getStoredPlants().then(data => {
      //console.log(data);
      this.setState({
        hasPlants: true,
        activePlants: data,
        plants: data,
      })
    });
  }

  handleUpdate(plants) {
    this.setState({
      plants: plants
    })
  }

  handleSearch(termArr) {
    //console.log(termArr);
    this.setState({
      searchTerm: termArr
    })
  }

  render () {
    //console.log(this.state.searchTerm);
    return (
      <div>
        <div className="header">
          <div className="container-fluid container-main">
            <TopBar plants={this.state.plants} onChange={this.handleSearch} />
          </div>
          <div className="container-nav">
            <div className="container-fluid container-main">
              <div className="row">
                  <Navbar />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid container-main">
          <SiteLocation country={this.country} state_={this.state_} />
          {this.state.searchTerm}
          { this.state.hasPlants !== false ?
            <AppRoutes plants={this.state.plants} searchTerm={this.state.searchTerm}  country={this.country} state_={this.state_} />
            : <div className="text-center"><br /><br /><br /><Spinner /></div>
          }
        </div>
      </div>
    );
  }
}

export default Main;


/*        <Header plants={this.state.plants} country={this.country} state_={this.state_} />
*/
