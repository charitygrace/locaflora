import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';

import SortForm from '../components/sort/SortForm'
import FilterForm from '../components/filter/FilterForm'
import PlantCard from '../components/plants/PlantCard'
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import capitalizeFirstLetter from '../actions/capitalizeFirstLetter';
//import ViewFavorites from '../components/plants/ViewFavorites'

import { getFieldofObj } from '../actions/getFieldofObj.js';


function PlantsList(props) {
  const {
    plants,
    country,
    state_,
    showFavorites = false,
    searchTerm = [],
  } = props;

  // console.log("PlantsList");
  // console.log(props);
  const plantsAll = plants;
  const scrollCount = 24;

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get('page'))
  // console.log(searchParams.get('q'))

  const [pageTop, setPageTop] = useState(searchParams.has('page') ? searchParams.get('page') : 1);
  const [pageCurrent, setPageCurrent] = useState(searchParams.has('page') ? searchParams.get('page') : 1);
  // const [searchTerm, setSearchTerm] = useState(searchTerm)

  // console.log(searchTerm);
  // const [plants, setPlants] = useState(plants)
  // const [plantsRefined, setPlantsRefined] = useState(refinePlants(plantsAll, showFavorites, searchTerm))
  // plantsRefined is the initial list of plants that show on the page
  let plantsRefined = refinePlants(plantsAll, showFavorites, searchTerm)
  // plantsDisplay is the list that will display : this is the fuil list of plants to display based on on-page filtering
  const [plantsDisplay, setPlantsDisplay] = useState(plantsRefined)
  // const [plantsList, setPlantsList] = useState(removeItems(plantsRefined, scrollCount * (pageCurrent - 1)))
  let plantsList = removeItems(plantsDisplay, scrollCount * (pageCurrent - 1))
  // console.log(plantsList[0])

  const [start, setStart] = useState(searchParams.has('page') ? searchParams.get('page') * scrollCount - scrollCount : 0)
  const [hasMore, setHasMore] = useState(plantsList.length > scrollCount ? true : false)
  // const [items, setItems] = useState(plantsList.slice(0, scrollCount))
  const [items, setItems] = useState(plantsList.slice(0, scrollCount))
  // const [sortType, setSortType] = useState("alpha")

  // console.log(plantsRefined);
  // console.log(plantsList);
  // console.log(items);

  // useEffect(() => {
  //   // plantsList = removeItems(plantsRefined, scrollCount * (pageTop - 1))
  //   // setItems(plantsList.slice(0, scrollCount))
  //   if (searchParams.has('page') && Number(searchParams.get('page')) === 1) {
  //     searchParams.delete('page')
  //     setSearchParams(searchParams)
  //   }
  //   if (searchParams.has('sort') && searchParams.get('sort') === "name") {
  //     searchParams.delete('sort')
  //     setSearchParams(searchParams)
  //   }

  // //   // console.log("useEffect PlantsList");
  // //   // // setPageCurrent(url.searchParams.get("page") ? url.searchParams.get("page") : intialPage)
  // //   // console.log(pageCurrent)
  // //   // // setPlantsList(Number(pageCurrent - 1) === 0 ? plantsRefined : removeItems(plantsRefined, scrollCount * (pageCurrent - 1)))
  // //   // // setItems(plantsList)
  // //   // // setItems(plantsList.slice(0, scrollCount))
  // //   // // plantsList = removeItems(plantsRefined, scrollCount * (pageCurrent - 1))
  // //   // console.log(plantsList[0])
  // }, [searchParams, pageCurrent, pageTop]);

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (pageCurrent - 1) * scrollCount;
  //   const lastPageIndex = firstPageIndex + scrollCount;
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [pageCurrent]);

  function refinePlants(plants, showFavorites = 'false', searchTerm) {
    if (showFavorites) {
      let favoritesArr = []
      if (localStorage.getItem('favorites')) favoritesArr = JSON.parse(localStorage.getItem('favorites'));
      if (favoritesArr.length !== 0) plants = plants.filter(plant => favoritesArr.includes(plant.id))
    }
    if (searchTerm) {
      let term = searchTerm //[0].term
      plants = plants.filter(item => {
        // console.log(item.name);
        // console.log(term);
        // console.log(item.name.includes(term));
        if (item.name.includes(term)) return true
        if (item.name.includes(capitalizeFirstLetter(term))) return true
        else if (item.taxa.genus && item.taxa.genus.includes(term)) return true
        else if (item.taxa.commonName && (item.taxa.commonName.includes(term) || item.taxa.commonName.includes(capitalizeFirstLetter(term)))) return true
        else if (item.taxa.commonAlts && (item.taxa.commonAlts.includes(term) || item.taxa.commonAlts.includes(capitalizeFirstLetter(term)))) return true
        else if (item.taxa.scientificFamily && item.taxa.scientificFamily.includes(term)) return true
        else if (item.taxa.commonFamily && item.taxa.commonFamily.includes(term)) return true
        else return false
      });
    }
    return plants
  }

  function removeItems(array, n) {
    return array.filter((elem, i) => i >= n);
  }




  const changeSort = (sortBy, sortType) => {
    console.log('changeSort');
    // console.log(sortBy)
    //console.log(newSortBy);

    // searchParams.set("sort", sortBy);
    // setSearchParams(searchParams);
    // if (searchParams.has('page')) {
    //   searchParams.delete('page')
    //   setSearchParams(searchParams)
    // }

    var sortKey = sortBy.split('.');

    if (sortType === 'alpha') {
      // setSortType('alpha');

      plants.sort(function (a, b) {
        let a_sortBy = a[sortKey[0]];
        let b_sortBy = b[sortKey[0]];
        if (sortKey.length === 2) {
          a_sortBy = a[sortKey[0]][sortKey[1]];
          b_sortBy = b[sortKey[0]][sortKey[1]];
        }
        if (a_sortBy < b_sortBy) { return -1; }
        if (a_sortBy > b_sortBy) { return 1; }
        return 0;
      });
    }
    if (sortType === 'num') {
      // setSortType('num');
      plants.sort(function (a, b) {
        let a_sortBy = a[sortKey[0]];
        let b_sortBy = b[sortKey[0]];
        if (sortKey.length === 2) {
          a_sortBy = a[sortKey[0]][sortKey[1]];
          b_sortBy = b[sortKey[0]][sortKey[1]];
        }
        return a_sortBy - b_sortBy;
      });
    }
    console.log(plants)
    setPlantsDisplay(plants)
    // setStart(scrollCount)
    setPageCurrent(1)
    setPageTop(1)
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    setHasMore(plants.length > scrollCount ? true : false)
    setItems(plants.slice(0, scrollCount))

  }

  const changeFilter = activeFilters => {
    console.log("activeFilters");
    // let activePlants = this.state.plants
    // let plants = this.state.plants
    // console.log(activePlants);
    // console.log(plants);
    // let plants = plantsDisplay
    let activePlants = plantsRefined
    let activeFiltersCount = 0
    // console.log(activeFilters);
    activeFilters.forEach((filterGroup, index, arr) => {
      // console.log(filterGroup)
      // console.log(filterGroup.options.length)
      if (filterGroup.options.length > 0) {
        // console.log(filterGroup.options);
        activeFiltersCount++
        let filterKey = filterGroup.name;
        //console.log(filterKey);
        activePlants = activePlants.filter(plant => {
          // console.log(filterKey)
          let plantFieldArr = getFieldofObj(plant, filterKey)
          if (!Array.isArray(plantFieldArr)) plantFieldArr = [plantFieldArr]
          //console.log(filterKey);
          //console.log(plantFieldArr);
          //console.log(filterGroup.options);

          if (plantFieldArr.length === 0) {
            // console.log("equal 0");
            return false
          }
          else if (plantFieldArr.length > 0) {
            // console.log("> 0");
            //console.log(filterGroup);
            //return filterGroup.options.some(item => filterGroup.options.indexOf(item) >= 0 );
            return plantFieldArr.some(item => filterGroup.options.indexOf(item) >= 0);
          } else {
            console.log('true')
            return true
          }
        });
      }
    });
    console.log(activeFilters);
    console.log(activeFiltersCount);
    if (activeFiltersCount === 0) activePlants = plantsRefined
    console.log(activePlants);
    setPlantsDisplay(activePlants)
    setItems(activePlants.slice(0, scrollCount))
    setStart(scrollCount)
    setPageTop(1)
    setPageCurrent(1)
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    setHasMore(activePlants.length > scrollCount ? true : false)
  }

  const updatePage = (page) => {
    console.log('updatePage')
    console.log(page)
    setPageTop(page)
    setPageCurrent(page)
    plantsList = removeItems(plantsDisplay, scrollCount * (page - 1))
    setItems(plantsList.slice(0, scrollCount))

  }

  const fetchMoreData = () => {
    console.log("fetchMoreData");
    // console.log(start);
    // let thisStart = Number(start) + Number(scrollCount)
    // setStart(thisStart)
    // a fake async api call which sends
    // 20 more records in 1.5 secs
    // let activePlants = plantsRefined
    // console.log(thisStart);
    const end = start + scrollCount
    // console.log(end);
    let more = true
    if (plantsDisplay.length < (end - 1)) more = false
    console.log(plantsDisplay.length)
    console.log(end)
    // console.log(items);
    // console.log(activePlants.slice(start, end));
    setHasMore(more)
    // console.log(pageCurrent)
    searchParams.set("page", Number(pageCurrent) + 1);
    setSearchParams(searchParams);
    setPageCurrent(Number(pageCurrent) + 1)

    console.log(plantsDisplay)
    setTimeout(() => {
      // console.log(start)
      // console.log(end)
      setItems(items.concat(plantsDisplay.slice(start, end)))
      // console.log(items)
      setStart(end)
    }, 1500);
  };


  return (
    <div className="row">
      <div className="col-12 col-md-4 col-lg-3">
        <div className="offcanvas offcanvas-start offcanvas-wide show" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header d-md-none">
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div>
              <SortForm onChange={changeSort} />
              <FilterForm onChange={changeFilter} />
            </div>
          </div>
        </div>
      </div>
      <div id="plantGrid" className="plant-grid col-12 col-md-8 col-lg-9">
        {showFavorites ? (<div className="text-start ml-2 mr-2 page-title"><h2>Favorites</h2></div>) : null}
        {searchTerm ? (<div className="text-start ml-2 mr-2 page-title"><h2>Search: {searchTerm}</h2></div>) : null}
        <div className="text-end ml-2 mr-2 plant-count">{plantsDisplay.length} items</div>
        {plantsDisplay.length === 0 ? (<p className="mt-5 text-center">No Plants Match</p>) : null}
        {items.length === 0 && plantsDisplay.length !== 0 ? (<p className="mt-5 text-center">No More Plants</p>) : null}
        <div className="row gx-3">
          {/*items.map((plant, index) => {
            return <PlantCard plant={plant} key={plant.id} country={country} state_={state_} />
          })
        */}
        </div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="text-center"><Spinner /></div>}
        >
          <div className="row gx-3">
            {items.map((plant, index) => {
              return (
                <React.Fragment key={plant.id}>
                  <PlantCard plant={plant} country={country} state_={state_} />
                  {(index + 1) % scrollCount === 0 ? (<div className='text-center page-divider'>&mdash; Page {Number(pageTop) + (index + 1)/scrollCount} &mdash;</div>) : null}
                </React.Fragment>
              )
            })
            }
          </div>
        </InfiniteScroll>
      </div>
        <Pagination
          plants={plantsDisplay}
          pageCurrent={pageCurrent}
          totalCount={plantsDisplay.length}
          pageSize={scrollCount}
          onPageChange={page => updatePage(page)}
        /*sortType={sortType}*/
        />
    </div>
  );
}

export default PlantsList;