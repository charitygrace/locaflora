import React, { useState } from 'react'
// import Collapsible from 'react-collapsible';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';


function FilterGroupRadio(props) {
  const [open, setOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(props.activeFilters);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeFilters: this.props.activeFilters,
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  // }

  function handleChange(e) {
    //console.log('handleChange check');
    const filterName = props.filterName
    // const filter = this.props.filters.find( item => item.name === filterName );
    const filterValue = e.target.value;
    //console.log(filterValue);
    // let activeFilters = this.state.activeFilters;
    //console.log(activeFilters);
    //console.log(activeFilter.length);
    // setup the activeFilter array as soon as something is clicked
    let match = activeFilters.find(item => item.name === filterName);
    //console.log(match);
    //console.log(match.options);
    // console.log(match.options)
    if (e.target.checked) {
      //console.log("2");
      match.options = [filterValue]
      //console.log(match.options);
    } else {
      //console.log("3");
      match.options = []
      //console.log(match.options);
    }
    //console.log(activeFilters);
    // this.setState({
    //   activeFilters: activeFilters
    // })
    props.onChange(activeFilters);
  }

  const filterName = props.filterName
  const filter = props.filters.find(item => item.name === filterName);
  const activeFilter = activeFilters.find(item => item.name === filterName);
  const id = filterName + "-";
  // console.log(filter)
  // console.log(filterName)
  // console.log(activeFilter)
  // console.log(activeFilter.options.length)
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
          <div className="form-check" key="all">
            <input className="form-check-input" type="radio"
              name={"radio-" + filterName} value="all" id="all"
              data-filtername={filterName}
              onChange={handleChange}
              checked={activeFilter.options.length > 0 ? false : true}
            />
            <label className="form-check-label" htmlFor="all">All</label>
          </div>
          {filter.options.map((option, key) => (
            <div className="form-check" key={key}>
              <input className="form-check-input" type="radio"
                name={"radio-" + filterName}
                value={option} id={id + option}
                data-filtername={filterName}
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
export default FilterGroupRadio

/*      <div className="form-check" key="all">
        <input className="form-check-input" type="radio"
          name={"radio-" + filterName} value="all" id="all"
          data-filtername={filterName}
          onChange={handleChange}
          checked={activeFilter.options.length > 0 ? false : true}
        />
        <label className="form-check-label" htmlFor="all">All</label>
      </div>
      {filter.options.map((option, key) => (
        <div className="form-check" key={key}>
          <input className="form-check-input" type="radio"
            name={"radio-" + filterName}
            value={option} id={id + option}
            data-filtername={filterName}
            onChange={handleChange}
            checked={activeFilter.options.indexOf(option) > -1 ? true : false}

          />
          <label className="form-check-label" htmlFor={option}>{option}</label>
        </div>
      ))}
      */