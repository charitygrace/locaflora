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
    //const filter = this.props.filters.find( item => item.name === filterName );
    const filterValue = e.target.value;
    //console.log(filterValue);
    let activeFilters = this.state.activeFilters;
    //console.log(activeFilters);
    //console.log(activeFilter.length);
    // setup the activeFilter array as soon as something is clicked
    let match = activeFilters.find( item => item.name === filterName );
    //console.log(match);
    //console.log(match.options);
    if (e.target.checked) {
      match.options.push(filterValue);
      //console.log(match.options);
    } else {
      match.options.pop(filterValue);
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
    //console.log(this.props.filters);
    //console.log(filterName);
    //console.log(filter);
    return (
      <div>
        <h3 data-toggle="collapse" href={'#' + id + 'filter'} role="button" aria-controls={id + 'filter'}>
          <label>{filter.label}</label>
        </h3>
        <div className="collapse show" id={id + 'filter'}>
          <div className="card card-body">
            {filter.options.map( (option, key) => (
              <div className="form-check" key={key}>
                <input className="form-check-input" type="checkbox" data-filtername={filterName} value={option} id={id + option} onChange={this.handleChange} />
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
