import React from 'react'


const SortOption = (props) =>  {
  return (
    <option value={props.sortBy} data-sorttype={props.sortType}>{props.name}</option>
  )
}
export default SortOption
