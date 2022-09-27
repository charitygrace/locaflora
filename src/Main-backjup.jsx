import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Spinner from './components/Spinner';
//import Header from './components/Header';
import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import SiteLocation from './components/SiteLocation'

import { getStoredPlants } from './actions/getStoredPlants';
import PlantsList from './pages/PlantsList';

const Main = props => {
  const [hasPlants, setHasPlants] = useState(false);
  const [plants, setPlants] = useState([]);
  const [plantFile, setPlantFile] = useState(1);

  const country = "US"
  const state_ = "NC"

  useEffect(() => {
    const fetchPlants = async () => {
      const result = await getStoredPlants();
      setPlants(result)
      setHasPlants(true)
      // console.log("basic")
      return plants
    };
    const fetchPlantsMore = async (plants) => {   
      console.log(plants)  
      let result = []
      while (true) {
        let fileName = "plants" + plantFile + ".json"
        // console.log(fileName)
        let data = await getStoredPlants(fileName);
        // console.log(data)
        if (data == "nofile") {
          break;
        }
        // result = result.concat(data);
        setPlantFile(plantFile++)
        console.log(result)
        mergePlants(result, plants)
      } 
    };
    const mergePlants = (result, plants) => {
      console.log("mergePlants")
      console.log(result)
      console.log(plants)
      const plantsUpdate = plants.map(plant => {
        // console.log(plant.id)
        // console.log(result.find(r => r.id === plant.id))
        let data = result.find(r => r.id === plant.id)
        // console.log(data)
        if (data && plant.id == data.id) {
          // console.log("MATCH")
          // console.log(plant)
          // console.log(data)
          plant = data
          // console.log(plant)
        }
        return plant
      })
      // console.log("merge")
      console.log(plantsUpdate)
      setPlants(plantsUpdate);
    }

    fetchPlants().then(plants => fetchPlantsMore(plants))
  }, [])

  // useEffect(() => {
  //   const fetchPlantsMore = async () => {
  //     const result = await getStoredPlants("plants1.json");
  //     console.log("more")
  //     console.log(result)
  //     // setPlants({ ...plants, ...result });
  //   };
  //   fetchPlantsMore();
  // }, [hasPlants])

  // function handleUpdate(plants) {
  //   this.setState({
  //     plants: plants,
  //     hasPlants: true
  //   })
  // }
  // console.log(hasPlants);
  // console.log(plants);
  return (
    <BrowserRouter>
      <div>
        <div className="header">
          <div className="container-fluid container-main">
            {<TopBar plants={plants} />}
          </div>
          <div className="container-nav">
            <div className="container-fluid container-main">
              <Navigation />
            </div>
          </div>
        </div>
        <div className="container-fluid container-main">
          <SiteLocation country={country} state_={state_} />
          {hasPlants !== false ?
            <AppRoutes plants={plants} country={country} state_={state_} />
            : <div className="text-center"><br /><br /><br /><Spinner /></div>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Main;