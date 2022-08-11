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
      <div className="mb-3 row">
        <label htmlFor="select-sort-by" className="col-sm-3 col-form-label">Sort</label>
        <div className="col-sm-9">
          <select id="select-sort-by" className="custom-select form-select" onChange={this.handleChange}>
            <option value="name" data-sorttype="alpha">Scientific Name</option>
            {/*<option value="height.max" data-sorttype="num">Height - Maximum</option>*/}
            <option value="taxa.commonName" data-sorttype="alpha">Common Name</option>
          </select>
        </div>
      </div>
    )
  }
}

export default SortForm;
