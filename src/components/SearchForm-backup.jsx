import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

export function sortAlpha(a, b) {
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected: [{term:""}]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    this.props.onChange(selected);
  }

  render() {
    const plants = this.props.plants
    let options = [];
    let count = 0;
    plants.forEach( item => {
      options.push(
        { id: count,
          ids: [item.id],
          term: item.name,
        }
      )
      count++
      options.push(
        { id: count,
          ids: [item.id],
          term: item.taxa.commonName,
        }
      )
      count++
      options.push(
        { id: count,
          ids: [item.id],
          term: item.taxa.scientificFamily,
        }
      )
      count++
      if (item.taxa.commonAlts.length > 0) {
        item.taxa.commonAlts.forEach(i => {
          options.push(
            { id: count,
              ids: [item.id],
              term: i
            }
          )
          count++
        })
      }
    })
    console.log(options);

    options.sort( function (a, b) {
      a = a['term'].toLowerCase();
      b = b['term'].toLowerCase();
      if(a < b) { return -1; }
      if(a > b) { return 1; }
      return 0;
    })

    console.log(options);

    console.log(this.state.selected)
    return (
      <Typeahead
        onChange={this.handleChange}
        id="findPlant"
        labelKey="term"
        options={options}
        placeholder="Find a Plant"
      />
    )
  }
}

export default SearchForm


/*
selected={this.state.selected}

<Typeahead
    onChange={(selected) => {
      this.setState({selected});
    }}
    selected={this.state.selected}
    id="findPlant"
    labelKey="term"
    options={options}
    placeholder="Find a Plant"
/>


{ id: item.id,
  name: item.name,
  commonName: item.taxa.commonName,
  genus: item.taxa.genus,
  family: item.taxa.scientificFamily
}



<form className="form-inline float-right">
  <label className="sr-only" htmlFor="searchPlant">Find a Plant</label>
  <input type="text" className="form-control mb-2 mr-sm-2" id="searchPlant" placeholder="Find a Plant" />
  <button type="submit" className="btn btn-primary mb-2">Search</button>
</form>
*/
