import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom';

import Home from './pages/Home';
import Plant from './pages/Plant';

import About from './pages/About';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import NoMatch from './pages/NoMatch';

const AppRoutes = props => {
  // console.log('AppRoutes')
  // console.log(props)

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
      {/*Titles for plant pages generated on page */}
      <Route exact path="/plant/:plantSlug" element={
        <PlantWrapper
          plants={props.plants}
          country={props.country}
          state_={props.state_}
        />}
      />
      <Route path="*" element={<NoMatch />} />
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
