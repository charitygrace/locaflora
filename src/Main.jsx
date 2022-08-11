import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Spinner from './components/Spinner';
//import Header from './components/Header';
import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import SiteLocation from './components/SiteLocation'

import { getStoredPlants } from './actions/getStoredPlants';

class Main extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      hasPlants: false,
      // searchTerm: "",
      plants: []
    }
    this.country = "US"
    this.state_ = "NC"
    //console.log("Main");
    this.handleUpdate = this.handleUpdate.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // console.log("Main componentDidMount");
    return getStoredPlants().then(data => {
      //console.log(data);
      this.setState({
        hasPlants: true,
        // activePlants: data,
        plants: data,
      })
    });
  }

  handleUpdate(plants) {
    this.setState({
      plants: plants,
      hasPlants: true
    })
  }

  // handleSearch(termArr) {
  //   //console.log(termArr);
  //   this.setState({
  //     searchTerm: termArr
  //   })
  // }

  render() {
    //console.log(this.state.searchTerm);
    return (
      <BrowserRouter>
        <div>
          <div className="header">
            <div className="container-fluid container-main">
              <TopBar plants={this.state.plants} />
            </div>
            <div className="container-nav">
              <div className="container-fluid container-main">
                  <Navigation />
              </div>
            </div>
          </div>
          <div className="container-fluid container-main">
            <SiteLocation country={this.country} state_={this.state_} />
            {/* {this.state.searchTerm} */}
            {this.state.hasPlants !== false ?
              <AppRoutes plants={this.state.plants} country={this.country} state_={this.state_} />
              : <div className="text-center"><br /><br /><br /><Spinner /></div>
            }
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;


/*        <Header plants={this.state.plants} country={this.country} state_={this.state_} />
*/
