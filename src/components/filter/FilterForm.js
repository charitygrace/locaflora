import React from 'react'
import FilterGroupCheckbox from './FilterGroupCheckbox'
import FilterGroupRadio from './FilterGroupRadio'
import { getFieldofObj } from '../../actions/getFieldofObj.js';
import fields from '../../data/fields.json';

//reenter these names in return() -> specify radio or checkbox


const FilterForm = props => {

  // console.log(props.activeFilters)
  const changeFilter = (activeFilters) => {
    //console.log(activeFilters);
    props.onChange(activeFilters);
  }

  // console.log(fields);
  // console.log(filterNames);
  let filters = []
  let activeFilters = []
  
  const filterNames = [
    "plantTypes",
    "lifeCycle",
    "lightNeeds",
    "soils.moistureNeeds",
    "flowers.colors",
    "flowers.seasons",
  ]

  filterNames.forEach((k, i) => {
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
  })
  if (props.activeFilters.length > 0) activeFilters = props.activeFilters


  //console.log(filters);
  return (
    <div className="filters">
      <h3>Filter By</h3>
      <p className="small"><i>Only about 800 plants have the follow info.</i></p>
      <FilterGroupRadio onChange={changeFilter} filterName="plantTypes" filters={filters} activeFilters={activeFilters} />
      <FilterGroupCheckbox onChange={changeFilter} filterName="lightNeeds" filters={filters} activeFilters={activeFilters} />
      <FilterGroupCheckbox onChange={changeFilter} filterName="soils.moistureNeeds" filters={filters} activeFilters={activeFilters} />
      <FilterGroupCheckbox onChange={changeFilter} filterName="flowers.colors" filters={filters} activeFilters={activeFilters} />
      <FilterGroupCheckbox onChange={changeFilter} filterName="flowers.seasons" filters={filters} activeFilters={activeFilters} />
    </div>

  )
}

export default FilterForm;
