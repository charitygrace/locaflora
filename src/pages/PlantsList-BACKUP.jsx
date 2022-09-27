import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import SortForm from '../components/sort/SortForm'
import FilterForm from '../components/filter/FilterForm'
import PlantCard from '../components/plants/PlantCard'
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import capitalizeFirstLetter from '../actions/capitalizeFirstLetter';
//import ViewFavorites from '../components/plants/ViewFavorites'

import { getFieldofObj } from '../actions/getFieldofObj.js';


const PlantsList = props => {
  const {
    plants,
    country,
    state_,
    showFavorites = false,
    searchTerm = [],
  } = props;

  // console.log("PlantsList");
  // console.log(props.plants);
  
  const [plantsAll, setPlantsAll] = useState(plants);
  const scrollCount = 24;

  useEffect(() => {
    console.log('effect')
    setPlantsAll(plants);
  }, [plants]);

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
  const [filters, setFilters] = useState([])
  // const [plantsList, setPlantsList] = useState(removeItems(plantsRefined, scrollCount * (pageCurrent - 1)))
  let plantsList = removeItems(plantsDisplay, scrollCount * (pageCurrent - 1))
  // console.log(plantsList[0])

  const [start, setStart] = useState(searchParams.has('page') ? searchParams.get('page') * scrollCount : scrollCount)
  const [hasMore, setHasMore] = useState(plantsList.length > scrollCount ? true : false)
  // const [items, setItems] = useState(plantsList.slice(0, scrollCount))
  const [items, setItems] = useState(plantsList.slice(0, scrollCount))
  // const [sortType, setSortType] = useState("alpha")

  // console.log(plantsRefined);
  // console.log(plantsList);
  // console.log(items);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        else if (item.taxa.scientificAlts && (item.taxa.scientificAlts.includes(term) || item.taxa.scientificAlts.includes(capitalizeFirstLetter(term)))) return true
        else if (item.taxa.commonAlts && (item.taxa.commonAlts.includes(term) || item.taxa.commonAlts.includes(capitalizeFirstLetter(term)))) return true
        else if (item.taxa.scientificFamily && item.taxa.scientificFamily.includes(term)) return true
        else if (item.taxa.commonFamily && item.taxa.commonFamily.includes(term)) return true
        else return false
      });
    }
    return plants
  }

  function removeItems(array, n) {
    // console.log(array)
    return array.filter((elem, i) => i >= n);
  }

  const changeSort = (sortBy, sortType) => {
    // console.log('changeSort');
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
    // console.log(plants)
    setPlantsDisplay(plants)
    // setStart(scrollCount)
    setPageCurrent(1)
    setPageTop(1)
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    setHasMore(plants.length > scrollCount ? true : false)
    setItems(plants.slice(0, scrollCount))

  }
  const removeFilter = (e, data) => {
    // console.log("removeFilter")
    const filterName = e.target.dataset.filtername
    const filterValue = e.target.dataset.filtervalue
    // console.log(filterValue)
    let match = filters.find(item => item.name === filterName);
    const index = match.options.indexOf(filterValue);
    if (index > -1) {
      match.options.splice(index, 1);
    }
    // console.log(e.target)
    // console.log(e.target.closest('button'))
    // e.target.closest('button').remove();
    setFilters(filters);
    changeFilter(filters)
  }

  const changeFilter = activeFilters => {
    // console.log("activeFilters");
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
    // console.log(activeFilters);
    // console.log(activeFiltersCount);
    if (activeFiltersCount === 0) activePlants = plantsRefined
    // console.log(activePlants);
    setPlantsDisplay(activePlants)
    setItems(activePlants.slice(0, scrollCount))
    setStart(scrollCount)
    setPageTop(1)
    setPageCurrent(1)
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    setHasMore(activePlants.length > scrollCount ? true : false)
    setFilters(activeFilters)
  }

  const updatePage = (page) => {
    // console.log('updatePage')
    setPageTop(page)
    setStart(page * scrollCount)
    setPageCurrent(page)
    plantsList = removeItems(plantsDisplay, scrollCount * (page - 1))
    setItems(plantsList.slice(0, scrollCount))
    // console.log(page)
    // console.log(start)
    // console.log((Number(page) + 1) * scrollCount)
    window.scroll(0, 0)
  }

  const fetchMoreData = () => {
    // console.log("fetchMoreData");
    // console.log(start);
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
    // console.log(plantsDisplay.length)
    // console.log(items);
    // console.log(activePlants.slice(start, end));
    setHasMore(more)
    // console.log(pageCurrent)
    searchParams.set("page", Number(pageCurrent) + 1);
    setSearchParams(searchParams);
    setPageCurrent(Number(pageCurrent) + 1)

    // console.log(plantsDisplay)
    // setTimeout(() => {
      // console.log(start)
      // console.log(end)
      setItems(items.concat(plantsDisplay.slice(start, end)))
      // console.log(items)
      setStart(end)
    // }, 1);
  };

  // console.log(filters)
  console.log(plants[1])
  return (
    <div className="row">
      <div className="col-12 col-md-4 col-lg-3">
        {/* <SortForm onChange={changeSort} />
        <FilterForm onChange={changeFilter} activeFilters={filters} /> */}

        <Button variant="primary" className="d-md-none mb-1" onClick={handleShow}>
          Filter Plants
        </Button>
        <Offcanvas show={show} onHide={handleClose} responsive="md">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter Plants</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="container-offcanvas">
            <SortForm onChange={changeSort} />
            <FilterForm onChange={changeFilter} activeFilters={filters} />
            </div>
          </Offcanvas.Body>
        </Offcanvas>

      </div>
      <div id="plantGrid" className="plant-grid col-12 col-md-8 col-lg-9">
        {showFavorites ? (<div className="text-start ml-2 mr-2 page-title"><h2>Favorites</h2></div>) : null}
        {searchTerm ? (<div className="text-start ml-2 mr-2 page-title"><h2>Search: {searchTerm}</h2></div>) : null}
        <div className="text-end ml-2 mr-2 plant-count">{plantsDisplay.length} items</div>
        <div className="row">
          <div className='col-12'>
            {filters.map((filter, index) => {
              return (
                <span key={index}>
                  {filter.options.length > 0 ?
                    filter.options.map((option, idx) => (<button key={"btn" + idx} className="btn btn-info btn-filter me-1" onClick={removeFilter} data-filtername={filter.name} data-filtervalue={option}>{option} x</button>))
                    : null}
                </span>
              )
            })
            }
          </div>
        </div>
        {plantsDisplay.length === 0 ? (<p className="mt-5 text-center">No Plants Match</p>) : null}
        {items.length === 0 && plantsDisplay.length !== 0 ? (<p className="mt-5 text-center">No More Plants</p>) : null}
        {items[1].leaves && items[1].leaves.retention ? items[1].leaves.retention : null}
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
                  {(index + 1) % scrollCount === 0 ? (<div className='text-center page-divider'>&mdash; Page {Number(pageTop) + (index + 1) / scrollCount} &mdash;</div>) : null}
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
    </div >
  );
}

export default PlantsList;