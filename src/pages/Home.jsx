import React from 'react'
import PlantsList from './PlantsList'

const Home = props => {
  console.log("here");
  console.log(props);
  console.log(props.history);
  console.log(props.history.location);
  console.log(props.location.search);
  //const plants = props.plants
  return(
    <PlantsList
      plants={props.plants}
      country={props.country}
      state_={props.state_}
      searchTerm={props.location.search}
      showFavorites={props.showFavorites}
 />
  );
}

export default Home;
