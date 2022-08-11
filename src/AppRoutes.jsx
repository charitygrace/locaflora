import React from 'react'
//import { Switch, Route } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';

import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import Plant from './pages/Plant';

import About from './pages/About';
import Donate from './pages/Donate';
// import Resources from './pages/Resources';
import Contact from './pages/Contact';

function AppRoutes(props) {
  // console.log('AppRoutes')

  return (
    <Routes>
      <Route exact path="/" element={
        <Home plants={props.plants}
          country={props.country}
          state_={props.state_}
          title=""
        />}
      />
      <Route exact path="/my-favorites" element={
        <Home
          plants={props.plants}
          country={props.country}
          state_={props.state_}
          showFavorites={true}
          title="Favorites"
        />}
      />
      <Route exact path="/about" element={<About title="About localflora.info" />} />
      <Route exact path="/donate" element={<Donate title="Donate to support Native Plants" />} />
      <Route exact path="/contact" element={<Contact title="Contact localflora.info" />} />
      {/*<Route exact path="/resources" element={<Resources title="North Carolina Native Plant Resources" />} />*/}
      {/*Titles for plant pages generated on page */}
      <Route exact path="/plant/:plantSlug" element={
        <PlantWrapper
          plants={props.plants}
          country={props.country}
          state_={props.state_}
        />}
      />
      <Route component={NoMatch} />
    </Routes>
  );
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
                plants={props.plants}
                country={props.country}
                state_={props.state_}
                showFavorites={false}
              />
          }
        />

                <Route strict path="/search" render={
          props =>
            <Home {...props}
              key="searchURL"
              plants={props.plants}
              country={props.country}
              state_={props.state_}
              searchTerm={props.searchTerm}
              showFavorites={false}
            />
          }
        />
        <Route exact path="/my-favorites" render={
          props =>
            <Home {...props}
              key="favoritesURL"
              plants={props.plants}
              country={props.country}
              state_={props.state_}
              showFavorites={true}
            />
          }
        />
        <Route exact path="/plant/:plantSlug" render={
          props =>
            <Plant {...props}
              key={props.match.params.plantSlug}
              plants={props.plants}
              country={props.country}
              state_={props.state_}
            />
          }
        />
        */