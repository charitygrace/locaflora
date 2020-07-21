import React from 'react'
import PlantsList from './PlantsList'

const Home = props => {
  const plants = props.plants
  return(
    <PlantsList plants={plants}/>
  );
}

export default Home;
