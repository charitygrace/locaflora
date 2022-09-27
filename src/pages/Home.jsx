import React from 'react'
import { useSearchParams } from "react-router-dom";
import PlantsList from './PlantsList'

function Home(props) {
  // console.log("Home");
  // console.log(props.plants)

  let keyName = "home"
  if (props.showFavorites) keyName = "favorites"
  const pageTitleName = props.title
  const pageTitleSite = "Native Plants of North Carolina"

  pageTitleName ? document.title = pageTitleName + " | " + pageTitleSite : document.title = pageTitleSite


  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('page'))
  // console.log(searchParams.get('q'))

  const query = searchParams.get('q')
  if (query) keyName = query
  // console.log(keyName);

  return (
    <PlantsList
      key={keyName}
      plants={props.plants}
      country={props.country}
      state_={props.state_}
      showFavorites={props.showFavorites}
      searchTerm={query}
    />
  );
}

export default Home;

/*


*/