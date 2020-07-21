import React from 'react'
import FilterGroupCheckbox from './FilterGroupCheckbox'
import FilterGroupRadio from './FilterGroupRadio'
import { getFieldofObj } from '../../actions/getFieldofObj.js';
import fields from '../../data/fields.json';

const filterNames = [
  "plantTypes",
  "lifeCycle",
  "lightNeeds",
  "flowers.colors",
  "flowers.seasons"
]

export class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(activeFilters) {
    //console.log(activeFilters);
    this.props.onChange(activeFilters);
  }

  render() {
    //console.log(fields);
    //console.log(filterNames);
    let filters = []
    let activeFilters = []
    filterNames.forEach( (k, i) => {
      let fieldsObj = getFieldofObj(fields, k)
      //console.log(fieldsArr);
      filters.push(
        {
          name: k,
          label: fieldsObj.label,
          options: fieldsObj.options
        }
      )
      activeFilters.push(
        {
          name: k,
          options: []
        }
      )
    });

    //console.log(filters);
    return (
      <div className="bg-light">
        <legend>Filter By</legend>
        <FilterGroupRadio onChange={this.changeFilter} filterName="plantTypes" filters={filters} activeFilters={activeFilters} />
        <FilterGroupCheckbox onChange={this.changeFilter} filterName="lightNeeds" filters={filters} activeFilters={activeFilters} />
        <FilterGroupCheckbox onChange={this.changeFilter} filterName="flowers.colors" filters={filters} activeFilters={activeFilters} />
        <FilterGroupCheckbox onChange={this.changeFilter} filterName="flowers.seasons" filters={filters} activeFilters={activeFilters} />
        <FilterGroupRadio onChange={this.changeFilter} filterName="lifeCycle" filters={filters} activeFilters={activeFilters} />
      </div>

    )
  }
}

export default FilterForm;

/*
{filters.map( (filter, key) => (
  <FilterGroupCheckbox onChange={this.changeFilter} filter={filter} activeFilters={activeFilters} key={key} />
))}
*/
