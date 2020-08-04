import React from 'react'
import SortForm from '../components/sort/SortForm'
import FilterForm from '../components/filter/FilterForm'
import PlantCard from '../components/plants/PlantCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
//import ViewFavorites from '../components/plants/ViewFavorites'

import { getFieldofObj } from '../actions/getFieldofObj.js';

class PlantsList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      plants: this.props.plants,
      searchTerm: this.props.searchTerm ? this.props.searchTerm : [],
      items: [],
      start: 0,
      showFavorites: this.props.showFavorites? this.props.showFavorites : false
    };
    this.plantsAll = this.props.plants;
    this.scrollCount = 20;
    this.changeSort = this.changeSort.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    //this.handleSearch = this.handleSearch.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    //this.showFavorites = this.showFavorites.bind(this);
  }

  componentDidMount() {
    //console.log("componentDidMount");
    let activePlants = this.state.plants;
    let plants = this.plantsAll
    //console.log(activePlants);
    //console.log(plants);
    //console.log(this.state.showFavorites);
    //console.log(this.state.searchTerm);
    if (this.state.showFavorites) {
      let favoritesArr = []
      if (localStorage.getItem('favorites')) favoritesArr = JSON.parse(localStorage.getItem('favorites'));
      activePlants = plants.filter( plant => favoritesArr.includes(plant.id))
      if (favoritesArr.length === 0) activePlants = plants
    } else if (this.state.searchTerm.length){
      let term = this.state.searchTerm[0] //[0].term
      //console.log(term);
      plants.forEach( item => {
        if (item.name.includes(term)) activePlants.push(item)
        else if (item.taxa.genus.includes(term)) activePlants.push(item)
        else if (item.taxa.commonName && item.taxa.commonName.includes(term)) activePlants.push(item)
        else if (item.taxa.commonAlts && item.taxa.commonAlts.includes(term)) activePlants.push(item)
        else if (item.taxa.scientificFamily && item.taxa.scientificFamily.includes(term)) activePlants.push(item)
        else if (item.taxa.commonFamily && item.taxa.commonFamily.includes(term)) activePlants.push(item)
      });
      console.log(activePlants);
    } else activePlants = plants

    this.setState({
      plants: activePlants,
      items: activePlants.slice(0, this.scrollCount),
      start: this.scrollCount,
      hasMore: activePlants.length > this.scrollCount ? true : false
    });

  }

  changeSort(sortBy, sortType) {
    //console.log('changeSort');
    //console.log(newSortBy);
    let plants = this.state.plants

    var sortKey = sortBy.split('.');

    if (sortType === 'alpha') {
      plants.sort( function (a, b) {
        let a_sortBy = a[sortKey[0]];
        let b_sortBy = b[sortKey[0]];
        if (sortKey.length === 2) {
          a_sortBy = a[sortKey[0]][sortKey[1]];
          b_sortBy = b[sortKey[0]][sortKey[1]];
        }
        if(a_sortBy < b_sortBy) { return -1; }
        if(a_sortBy > b_sortBy) { return 1; }
        return 0;
      });
    }
    if (sortType === 'num') {
      plants.sort( function (a, b) {
        let a_sortBy = a[sortKey[0]];
        let b_sortBy = b[sortKey[0]];
        if (sortKey.length === 2) {
          a_sortBy = a[sortKey[0]][sortKey[1]];
          b_sortBy = b[sortKey[0]][sortKey[1]];
        }
        return a_sortBy - b_sortBy;
      });
    }
    this.setState({
      plants: plants,
      items: plants.slice(0, this.scrollCount),
      start: this.scrollCount,
      hasMore: plants.length > this.scrollCount ? true : false
    })
  }

  changeFilter(activeFilters) {
    //console.log(activeFilters);
    let activePlants = this.plantsAll
    let plants = this.plantsAll
    console.log(activePlants);
    console.log(plants);

    let activeFiltersCount = 0
    activeFilters.forEach( (filterGroup, index, arr) => {
      if (filterGroup.options.length > 0) {
        console.log(filterGroup.options);
        activeFiltersCount++
        let filterKey = filterGroup.name;
        //console.log(filterKey);
          activePlants = activePlants.filter( plant => {
            let plantFieldArr = getFieldofObj(plant, filterKey)
            if (!Array.isArray(plantFieldArr)) plantFieldArr = [plantFieldArr]
            //console.log(filterKey);
            //console.log(plantFieldArr);
            //console.log(filterGroup.options);

            if (plantFieldArr.length === 0) {
              //console.log("equal 0");
              return false
            }
            else if (plantFieldArr.length > 0) {
              //console.log("> 0");
              //console.log(filterGroup);
              //return filterGroup.options.some(item => filterGroup.options.indexOf(item) >= 0 );
              return plantFieldArr.some(item => filterGroup.options.indexOf(item) >= 0 );
            } else {
              return true
            }
          });
        }
    });
    //console.log(activeFiltersCount);
    if (activeFiltersCount === 0) activePlants = plants
    console.log(activePlants);
    this.setState({
      plants: activePlants,
      items: activePlants.slice(0, this.scrollCount),
      start: this.scrollCount,
      hasMore: activePlants.length > this.scrollCount ? true : false
    })
  }

  fetchMoreData = () => {
    //console.log("fetchMoreData");
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let activePlants = this.state.plants
    const start = this.state.start
    const end = start + this.scrollCount
    //console.log(start);
    //console.log(end);
    //console.log(this.state.plants.length);
    let hasMore = true
    if (activePlants.length < (end - 1)) hasMore = false
    //console.log(hasMore);
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(activePlants.slice(start, end)),
        start: end,
        hasMore: hasMore
      });
    }, 1500);
  };

  render() {
    let activePlants = this.state.plants
    //console.log(this.state.items);
    return(
      <div className="row">
        <div className="col-3">
          <SortForm onChange={this.changeSort} />
          <FilterForm onChange={this.changeFilter} />
        </div>
        <div id="plantGrid" className="col-9">
          <div className="text-right ml-2 mr-2 plant-count">{activePlants.length} items</div>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={<div className="text-center"><Spinner /></div>}
          >
            <div className="row no-gutters">
              {this.state.items.map( (plant, index) => {
                  return <PlantCard plant={plant} key={plant.id} country={this.props.country} state_={this.props.state_} />
                })
              }
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default PlantsList;

//            <ViewFavorites onChange={this.showFavorites} />

//            <Sidebar onChange={this.changeSort}/>
//
