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
import useWindowDimensions from '../actions/useWindowDimensions';

import { getFieldofObj } from '../actions/getFieldofObj.js';


const PlantsList = props => {
  // console.log("PlantsList");
  const {
    plants,
    country,
    state_,
    showFavorites = false,
    searchTerm = [],
  } = props;

  const scrollCount = 24;
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageTop, setPageTop] = useState(searchParams.has('page') ? searchParams.get('page') : 1);
  const [pageCurrent, setPageCurrent] = useState(searchParams.has('page') ? searchParams.get('page') : 1);
  const [start, setStart] = useState(searchParams.has('page') ? searchParams.get('page') * scrollCount : scrollCount)
  const [pageAlpha, setPageAlpha] = useState(showFavorites === true || (searchTerm && searchTerm.length > 0) ? false : true);

  const plantsBase = refinePlants(plants, showFavorites, searchTerm)
  const [plantsDisplay, setPlantsDisplay] = useState(plantsBase)
  const [filters, setFilters] = useState([])
  const [plantsList, setPlantsList] = useState(removeItems(plantsDisplay, scrollCount * (pageCurrent - 1)))
  // let plantsList = removeItems(plantsDisplay, scrollCount * (pageCurrent - 1))

  const [hasMore, setHasMore] = useState(plantsList.length > scrollCount ? true : false)
  const [items, setItems] = useState(plantsList.slice(0, scrollCount))

  // Sidebar
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { height, width } = useWindowDimensions();
  const [siblings, setSiblings] = useState(width > 400 ? 3 : 1)

  useEffect(() => {
    // console.log('effect')
    setPlantsDisplay(plantsBase)
    setPlantsList(removeItems(plantsBase, scrollCount * (pageCurrent - 1)))
    setItems(
      removeItems(
        plantsBase,
        scrollCount * (pageCurrent - 1)
      ).slice(0, scrollCount))
    setHasMore(plantsList.length > scrollCount ? true : false)
  }, [plants]);


  useEffect(() => {
    // console.log("effect width")
    setSiblings(width > 700 ? 3 : width > 585 ? 2 : 1)
  }, [width]);


  function refinePlants(plants, showFavorites = 'false', searchTerm) {
    // console.log("refinePlants")
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
        if (item.taxa) {
          if (item.taxa.genus && item.taxa.genus.includes(term)) return true
          if (item.taxa.commonName && (item.taxa.commonName.includes(term) || item.taxa.commonName.includes(capitalizeFirstLetter(term)))) return true
          if (item.taxa.scientificAlts && (item.taxa.scientificAlts.includes(term) || item.taxa.scientificAlts.includes(capitalizeFirstLetter(term)))) return true
          if (item.taxa.commonAlts && (item.taxa.commonAlts.includes(term) || item.taxa.commonAlts.includes(capitalizeFirstLetter(term)))) return true
          if (item.taxa.scientificFamily && item.taxa.scientificFamily.includes(term)) return true
          if (item.taxa.commonFamily && item.taxa.commonFamily.includes(term)) return true
        }
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
    let match = filters.find(item => item.name === filterName);
    const index = match.options.indexOf(filterValue);
    if (index > -1) {
      match.options.splice(index, 1);
    }
    setFilters(filters);
    changeFilter(filters)
  }

  const changeFilter = activeFilters => {
    console.log("changeFilter")
    let activePlants = plantsBase
    let activeFiltersCount = 0
    activeFilters.forEach((filterGroup, index, arr) => {
      if (filterGroup.options.length > 0) {
        activeFiltersCount++
        let filterKey = filterGroup.name;
        activePlants = activePlants.filter(plant => {
          let plantFieldArr = getFieldofObj(plant, filterKey)
          if (!Array.isArray(plantFieldArr)) plantFieldArr = [plantFieldArr]
          if (plantFieldArr.length === 0) {
            return false
          }
          else if (plantFieldArr.length > 0) {
            return plantFieldArr.some(item => filterGroup.options.indexOf(item) >= 0);
          } else {
            console.log('true')
            return true
          }
        });
      }
    });
    // console.log(activeFilters)
    // console.log(activePlants)
    // console.log(activeFiltersCount)
    if (activeFiltersCount === 0) {
      activePlants = plantsBase
      setPageAlpha(true);
    } else setPageAlpha(false);
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

  const fetchMoreData = () => {
    // console.log('fetchMoreData')
    // console.log(start)
    const end = start + scrollCount
    // let more = true
    // if (plantsDisplay.length < (end - 1)) more = false
    setHasMore(plantsDisplay.length >= (end - 1) ? true : false)
    setItems(items.concat(plantsDisplay.slice(start, end)))
    // setStart(end)
    setStart(start => start + scrollCount)
  };

  const updatePage = (page) => {
    // console.log("updatePage")
    setPageTop(page)
    setStart(page * scrollCount)
    setPageCurrent(page)
    const activePlants = removeItems(plantsDisplay, scrollCount * (page - 1))
    setPlantsList(activePlants)
    setItems(activePlants.slice(0, scrollCount))
    setHasMore(activePlants.length > scrollCount ? true : false)
    window.scroll(0, 0)
  }

  const handleScroll = (e) => {
    // console.log("handleScroll")
    const spacing = 250
    const activePageDiv = document.getElementById("page_" + pageCurrent)
    const prevPage = Number(pageCurrent) - 1
    const nextPage = Number(pageCurrent) + 1
    const nextPageDiv = document.getElementById("page_" + nextPage)

    // console.log(start)
    // console.log(pageCurrent)
    // console.log(nextPage)
    // console.log(nextPageDiv)
    // console.log(activePageDiv.getBoundingClientRect().top)
    // console.log(nextPageDiv.getBoundingClientRect().top)
    if (nextPageDiv && nextPageDiv.getBoundingClientRect().top - spacing < 0) {
      setPageCurrent(nextPage)
      searchParams.set("page", nextPage)
      setSearchParams(searchParams);
    }
    if (pageTop != pageCurrent && activePageDiv && activePageDiv.getBoundingClientRect().top - spacing > 0) {
      setPageCurrent(prevPage)
      searchParams.set("page", prevPage)
      setSearchParams(searchParams);
    }

  }

  // console.log(plantsList.length)
  // console.log(hasMore)
  return (
    <div className="row">
      <div className="col-12 col-md-4 col-lg-3">
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
      <div id="plantGrid" className="plant-grid col-12 col-md-8 col-lg-9" >
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
        <div id={"page_" + pageTop}></div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          onScroll={handleScroll}
          loader={<div className="text-center"><Spinner /></div>}
        >
          <div className="row gx-3">
            {items.map((plant, index) => {
              return (
                <React.Fragment key={plant.id}>
                  <PlantCard plant={plant} country={country} state_={state_} />
                  {(index + 1) % scrollCount === 0 ? (<div id={"page_" + (Number(pageTop) + (index + 1) / scrollCount)} className='text-center page-divider'>&mdash; Page {Number(pageTop) + (index + 1) / scrollCount} &mdash;</div>) : null}
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
        pageAlpha={pageAlpha}
        totalCount={plantsDisplay.length}
        pageSize={scrollCount}
        onPageChange={page => updatePage(page)}
        siblingCount={siblings}
      /*sortType={sortType}*/
      />
    </div >
  );
}

export default PlantsList;