import React from 'react'
import PlantsGrid from '../components/plants/PlantsGrid'
import SortForm from '../components/sort/SortForm'
import FilterForm from '../components/filter/FilterForm'
import { getFieldofObj } from '../actions/getFieldofObj.js';

class PlantsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: this.props.plants,
    };
    this.changeSort = this.changeSort.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
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
    })
  }

  changeFilter(activeFilters) {
    //console.log(activeFilters);
    //let plants = this.props.plants
    let plants = this.props.plants
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
      plants: activePlants
    })
  }

  render() {
    console.log(this.state.plants);
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <SortForm onChange={this.changeSort} />
            <FilterForm onChange={this.changeFilter} />
          </div>
          <div id="plantGrid" className="col-9">
            <div className="text-end">{this.state.plants.length} items</div>
            <PlantsGrid plants={this.state.plants} />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default PlantsList;


//            <Sidebar onChange={this.changeSort}/>
//
