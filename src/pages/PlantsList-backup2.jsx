import React from 'react'
import SortForm from '../components/sort/SortForm'
import FilterForm from '../components/filter/FilterForm'
import PlantCard from '../components/plants/PlantCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import ViewFavorites from '../components/plants/ViewFavorites'

import { getFieldofObj } from '../actions/getFieldofObj.js';

class PlantsList extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    this.state = {
      plants: this.props.plants,
      items: [],
      start: 0,
    };
    this.plantsAll = this.props.plants;
    this.scrollCount = 20;
    this.changeSort = this.changeSort.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
  }

  componentDidMount() {
    //console.log("componentDidMount");
    const start = this.state.start
    const end = start + this.scrollCount
    this.setState({
      items: this.state.plants.slice(start, end),
      start: end,
      hasMore: this.state.plants.length > this.scrollCount ? true : false
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
    let plants = this.state.plants
    //let plants = this.state.plants
    let activePlants = plants
    let activeFiltersCount = 0
    activeFilters.forEach( (filterGroup, index, arr) => {
      //|| !(filterGroup.options.includes("all")
      if (filterGroup.options.length > 0) {
        //console.log(filterGroup.options);
        //console.log(filterGroup.options.length);
        //console.log(activeFiltersCount);
        activeFiltersCount++
        //console.log(activeFiltersCount);
        //console.log(filterGroup);
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
              //console.log("else");
              return true
            }
          });
        }
    });
    //console.log(activeFiltersCount);
    if (activeFiltersCount === 0) activePlants = plants
    //console.log(activePlants);
    this.setState({
      plants: activePlants,
      items: activePlants.slice(0, this.scrollCount),
      start: this.scrollCount,
      hasMore: activePlants.length > this.scrollCount ? true : false
    })
  }

  showFavorites(idArr) {
    //console.log('showFavorites');
    let plants = this.plantsAll
    let activePlants = [];

    console.log(idArr);

    activePlants = plants.filter( plant => idArr.includes(plant.id))

    console.log(activePlants);

    if (idArr.length === 0) activePlants = plants

    this.setState({
      plants: activePlants,
      items: activePlants.slice(0, this.scrollCount),
      start: this.scrollCount,
      hasMore: activePlants.length > this.scrollCount ? true : false
    })
  }

  handleSearch(selected) {
    //console.log('handleSearch');
    console.log(selected);
    let plants = this.plantsAll
    let term = selected[0] //[0].term
    //console.log(term);
    let activePlants = [];
    plants.forEach( item => {
      if (item.name.includes(term)) activePlants.push(item)
      else if (item.taxa.genus.includes(term)) activePlants.push(item)
      else if (item.taxa.commonName && item.taxa.commonName.includes(term)) activePlants.push(item)
      else if (item.taxa.commonAlts && item.taxa.commonAlts.includes(term)) activePlants.push(item)
      else if (item.taxa.scientificFamily && item.taxa.scientificFamily.includes(term)) activePlants.push(item)
      else if (item.taxa.commonFamily && item.taxa.commonFamily.includes(term)) activePlants.push(item)
    });
    console.log(activePlants);

    if (selected.length === 0) activePlants = plants

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
    const start = this.state.start
    const end = start + this.scrollCount
    //console.log(start);
    //console.log(end);
    //console.log(this.state.plants.length);
    let hasMore = true
    if (this.state.plants.length < (end - 1)) hasMore = false
    //console.log(hasMore);
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(this.state.plants.slice(start, end)),
        start: end,
        hasMore: hasMore
      });
    }, 1500);
  };

  render() {
    //console.log(this.state.plants);
    //console.log(this.state.items);
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <ViewFavorites onChange={this.showFavorites} />
            <SortForm onChange={this.changeSort} />
            <FilterForm onChange={this.changeFilter} />
          </div>
          <div id="plantGrid" className="col-9">
            <div className="text-right ml-2 mr-2 plant-count">{this.state.plants.length} items</div>
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
      </div>
    );
  }
}

export default PlantsList;


//            <Sidebar onChange={this.changeSort}/>
//
