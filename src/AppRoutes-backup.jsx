import React from 'react'
//import { Switch, Route } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';

import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import Plant from './pages/Plant';

class AppRoutes extends React.Component {
  constructor(props) {
    // console.log(props)
    super(props);
    this.state = {

    }
    //console.log(this.props);
    //console.log(this.props.plants);
  }



  render() {
    // console.log(this.props);
    //console.log(this.props.searchTerm);
    return(
      <Routes>
        <Route exact path="/" element={
            <Home plants={this.props.plants} 
                  country={this.props.country} 
                  state_={this.props.state_} 
                  showFavorites={false}
            />}
        />
        <Route exact path="/my-favorites" element={
            <Home 
              plants={this.props.plants}
              country={this.props.country}
              state_={this.props.state_}
              showFavorites={true}
            />}
        />
        <Route exact path="/plant/:plantSlug" element={
            <PlantWrapper
              plants={this.props.plants}
              country={this.props.country}
              state_={this.props.state_}
            />}
        />
        <Route component={NoMatch} />
      </Routes>
    );
  }
}
export default AppRoutes;


const PlantWrapper = props => {
  // console.log(useParams)
  const { plantSlug } = useParams();
  // const item = this.state.starters.find((item) => item.id === Number(id));
  // console.log(plantSlug);
  return <Plant
    key={plantSlug}
    plants={props.plants}
    country={props.country}
    state_={props.state_}
  />
};

/*

        <Route exact path="/" render={
            props =>
              <Home {...props}
                key="homeURL"
                plants={this.props.plants}
                country={this.props.country}
                state_={this.props.state_}
                showFavorites={false}
              />
          }
        />

                <Route strict path="/search" render={
          props =>
            <Home {...props}
              key="searchURL"
              plants={this.props.plants}
              country={this.props.country}
              state_={this.props.state_}
              searchTerm={this.props.searchTerm}
              showFavorites={false}
            />
          }
        />
        <Route exact path="/my-favorites" render={
          props =>
            <Home {...props}
              key="favoritesURL"
              plants={this.props.plants}
              country={this.props.country}
              state_={this.props.state_}
              showFavorites={true}
            />
          }
        />
        <Route exact path="/plant/:plantSlug" render={
          props =>
            <Plant {...props}
              key={props.match.params.plantSlug}
              plants={this.props.plants}
              country={this.props.country}
              state_={this.props.state_}
            />
          }
        />
        */