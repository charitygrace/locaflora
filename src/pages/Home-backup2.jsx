import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from "react-router-dom";
import PlantsList from './PlantsList'

function Search(props) {
  // console.log("Search");

  let keyName = "home"
  if (props.showFavorites) keyName = "favorites"
  let pageTitleName = props.title
  const pageTitleSite = "Native Plants of North Carolina"
  let page = 1

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('page'))
  console.log(searchParams.get('q'))

  const [query, setQuery] = useState(searchParams.has('q') ? searchParams.get('q') : "")

  let pageTitle = useRef(pageTitleSite)
  document.title = pageTitle.current


    if (query) {
      // keyName = "search-" + query
      pageTitleName = "Search: " + query
    }

    // if (page) {
    //   // keyName = "search-" + page
    //   pageTitleName = "Page " + page + " " + pageTitleName
    // }
    // console.log(query)

    pageTitleName ? pageTitle.current = pageTitleName + " | " + pageTitleSite : pageTitle.current = pageTitleSite
  // useEffect(() => {

  // }, [query])

  
  return (
    <PlantsList
      key={keyName}
      plants={props.plants}
      country={props.country}
      state_={props.state_}
      showFavorites={props.showFavorites}
      searchTerm={query}
      intialPage={page}
    />
  );
}

export default Search;

/*


*/