import React from 'react'
import Collapsible from 'react-collapsible';


export class FilterGroupCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: this.props.activeFilters
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log('handleChange');
    console.log(e.target.value);
    console.log(e.target.checked);
    const filterName = this.props.filterName
    const filterValue = e.target.value;
    let activeFilters = this.state.activeFilters;
    //console.log(activeFilters);
    // setup the activeFilter array as soon as something is clicked
    let match = activeFilters.find( item => item.name === filterName );
    //console.log(match);
    //console.log(match.options);
    if (e.target.checked) {
      match.options.push(filterValue);
      //console.log(match.options);
    } else {
      const index = match.options.indexOf(filterValue);
      if (index > -1) {
        match.options.splice(index, 1);
      }
      //console.log(match.options);
    }
    console.log(activeFilters);
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
      <Collapsible
        trigger={filter.label}
        transitionTime={200}
        >
        {filter.options.map( (option, key) => (
          <div className="form-check" key={key}>
            <input className="form-check-input" type="checkbox" data-filtername={filterName} value={option} id={id + option} onChange={this.handleChange} />
            <label className="form-check-label" htmlFor={option}>{option}</label>
          </div>
        ))}
      </Collapsible>
    )
  }
}
export default FilterGroupCheckbox
