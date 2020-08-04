import React from 'react'


export class FilterGroupCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: this.props.activeFilters
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    //console.log('handleChange check');
    const filterName = this.props.filterName
    const filter = this.props.filters.find( item => item.name === filterName );
    const filterValue = e.target.value;
    //console.log(filterValue);
    let activeFilters = this.state.activeFilters;
    //console.log(activeFilters);
    //console.log(activeFilter.length);
    // setup the activeFilter array as soon as something is clicked
    let match = activeFilters.find( item => item.name === filterName );
    //console.log(match);
    //console.log(match.options);
    if (filterValue === "all") {
      //console.log("1");
      match.options = filter.options
    } else if (e.target.checked) {
      //console.log("2");
      match.options = [filterValue]
      //console.log(match.options);
    } else {
      //console.log("3");
      match.options = []
      //console.log(match.options);
    }
    //console.log(activeFilters);
    this.setState({
      activeFilters: activeFilters
    })
    this.props.onChange(activeFilters);
  }

  render(){
    const filterName = this.props.filterName
    const filter = this.props.filters.find( item => item.name === filterName );
    const id = filterName + "-";
    return (
      <div>
        <h3 data-toggle="collapse" href={'#' + id + 'filter'} role="button" aria-controls={id + 'filter'}>
          <label>{filter.label}</label>
        </h3>
        <div className="collapse show" id={id + 'filter'}>
          <div className="card card-body">
            <div className="form-check" key="none">
              <input className="form-check-input" type="radio" name={"radio-" + filterName} defaultChecked value="all" id={id + "all"} data-filtername={filterName} onChange={this.handleChange} />
              <label className="form-check-label" htmlFor="all">Show All</label>
            </div>
            {filter.options.map( (option, key) => (
              <div className="form-check" key={key}>
                <input className="form-check-input" type="radio" name={"radio-" + filterName} value={option} id={id + option} data-filtername={filterName} onChange={this.handleChange} />
                <label className="form-check-label" htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default FilterGroupCheckbox

/*
<div className="form-check" key="none">
  <input className="form-check-input" type="radio" name={"radio-" + filterName} value="" id={id + "none"} data-filtername={filterName} onChange={this.handleChange} />
  <label className="form-check-label" htmlFor="">None</label>
</div>
*/
