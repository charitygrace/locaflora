import React from 'react'
import { Switch, Route } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import Plant from './pages/Plant';

class AppRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //console.log(this.props);
    //console.log(this.props.plants);
  }



  render() {
    console.log(this.props);
    //console.log(this.props.searchTerm);
    return(
      <Switch>
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
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
export default AppRoute;
