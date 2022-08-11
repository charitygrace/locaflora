import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from "react-router-dom";
import PlantsList from './PlantsList'

function Home(props) {
  // console.log("Home");

  let keyName = "home"
  let pageTitleName = props.title
    // let page = 1

  // const urlString = window.location.href
  // const url = new URL(urlString);
  // console.log(url.searchParams.get("q"))
  // const [search, setSearch] = useSearchParams();
  let page = 1
  // if (url.searchParams.get("page")) page = url.searchParams.get("page")
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('page'))
  console.log(searchParams.get('q'))

  // const [page, setPage] = useState(url.searchParams.get("page") ? url.searchParams.get("page") : 1);
  const [query, setQuery] = useState(searchParams.has('q') ? searchParams.get('q') : "")
  // console.log(query);

  // const query = url.searchParams.get("q");
  // const page = url.searchParams.get("page");

  // const query = search.get("q");
  // const page = search.get("page");

  const pageTitleSite = "Native Plants of North Carolina"
  let pageTitle = useRef(pageTitleSite)
  document.title = pageTitle.current

  if (props.showFavorites) keyName = "favorites"

  useEffect(() => {
    // console.log("useEffect Home");
    // setQuery(url.searchParams.get("q"))
    

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

  }, [query])
  // console.log(keyName)

  // console.log(page)
  // console.log(props.history);
  // console.log(props.history.location);
  // console.log(props.location.search);
  //const plants = props.plants
  // console.log(keyName)
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

export default Home;

/*


*/