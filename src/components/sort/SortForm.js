import React from 'react'
//import SortOption from './SortOption'

export class SortForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const sortBy = e.target.value;
    const sortType = e.target[e.target.selectedIndex].getAttribute('data-sorttype');
    this.props.onChange(sortBy,sortType);
  }
  render() {
    return (
      <div className="form-group row">
        <label htmlFor="select-sort-by" className="col-sm-4 col-form-label">Sort by</label>
        <div className="col-sm-8">
          <select id="select-sort-by" className="custom-select" onChange={this.handleChange}>
            <option value="name" data-sorttype="alpha">Scientific Name</option>
            <option value="height.max" data-sorttype="num">Height - Maximum</option>
            <option value="taxa.commonName" data-sorttype="alpha">Common Name</option>
          </select>
        </div>
      </div>
    )
  }
}

export default SortForm;
