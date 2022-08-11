import React, { useState } from 'react'
// import Collapsible from 'react-collapsible';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';


function FilterGroupCheckbox(props) {
  const [open, setOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(props.activeFilters);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeFilters: this.props.activeFilters
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  // }
  function handleChange(e) {
    // console.log('handleChange');
    // console.log(e.target.value);
    // console.log(e.target.checked);
    const filterName = props.filterName
    const filterValue = e.target.value;
    // let activeFilters = this.state.activeFilters;
    //console.log(activeFilters);
    // setup the activeFilter array as soon as something is clicked
    let match = activeFilters.find(item => item.name === filterName);
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
    // console.log(activeFilters);
    // this.setState({
    //   activeFilters: activeFilters
    // })
    // console.log(activeFilters)
    props.onChange(activeFilters);
  }

  const filterName = props.filterName
  const filter = props.filters.find(item => item.name === filterName);
  const activeFilter = activeFilters.find(item => item.name === filterName);
  const id = filterName + "-";
  // console.log(activeFilter.options)
  // console.log(activeFilter.options.option)
  //console.log(this.props.filters);
  //console.log(filterName);
  //console.log(filter);
  return (
    <div className="filter-collapse">
      <Button
        className={"btn-link " + "open-" + open}
        onClick={() => setOpen(!open)}
        aria-controls={"filter-" + filterName}
        aria-expanded={open}
      >
        {filter.label}
      </Button>
      <Collapse in={open}>
        <div id={"filter-" + filterName}>
          {filter.options.map((option, key) => (
            <div className="form-check" key={key}>
              <input className="form-check-input" type="checkbox"
                data-filtername={filterName}
                value={option}
                id={id + option}
                onChange={handleChange}
                checked={activeFilter.options.indexOf(option) > -1 ? true : false}
              />
              <label className="form-check-label" htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  )
}
export default FilterGroupCheckbox


//   < Collapsible
// trigger = { filter.label }
// transitionTime = { 200}
//   >
// {
//   filter.options.map((option, key) => (
//     <div className="form-check" key={key}>
//       <input className="form-check-input" type="checkbox"
//         data-filtername={filterName}
//         value={option}
//         id={id + option}
//         onChange={this.handleChange}
//         checked={activeFilter.options.indexOf(option) > -1 ? true : false}
//       />
//       <label className="form-check-label" htmlFor={option}>{option}</label>
//     </div>
//   ))
// }
//       </Collapsible >