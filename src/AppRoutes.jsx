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
    //console.log(props);
    //console.log(this.props.plants);
  }



  render() {
    return(
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} render={props => <Home {...props} plants={this.props.plants} />} />
        <Route exact path="/plant/:plantSlug" render={props => <Plant {...props} plants={this.props.plants} key={props.match.params.plantSlug} />} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
export default AppRoute;
