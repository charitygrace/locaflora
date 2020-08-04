import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { withRouter } from 'react-router-dom'

export function sortAlpha(a, b) {
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(termArr) {
    console.log(this.state.term);
    this.props.history.push({
      pathname: '/search',
      search: '?q=' + this.state.term
    });
    console.log(this.props.history);
    /*
    history.push({
      pathname: '/search',
      search: '?' + this.state.term
    });
    */
    //this.history.push("/search");
    //this.props.history.push('/search')
    //this.props.onChange(termArr);
  }

  render() {
    const plants = this.props.plants
    let options = [];
    plants.forEach( item => {
      options.push(item.name)
      options.push(item.taxa.commonName)
      if (!options.includes(item.taxa.genus)) options.push(item.taxa.genus)
      if (!options.includes(item.taxa.scientificFamily)) options.push(item.taxa.scientificFamily)
      if (item.taxa.commonFamily && !options.includes(item.taxa.commonFamily)) options.push(item.taxa.commonFamily)
      if (item.taxa.commonAlts.length > 0) {
        item.taxa.commonAlts.forEach(i => {
          options.push(i)
        })
      }
    })

    options.sort( function (a, b) {
      //a = a['term'].toLowerCase();
      //b = b['term'].toLowerCase();
      if(a < b) { return -1; }
      if(a > b) { return 1; }
      return 0;
    })

    //console.log(options);

    return (
      <form className="form-inline float-right" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <Typeahead
            onChange={ selected => {
              this.setState({
                term: selected[0]
              });
            }}
            clearButton
            id="findPlant"
            options={options}
            placeholder="Find a Plant"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </div>
      </form>
    )
  }
}

//export default SearchForm
export default withRouter(SearchForm)


/*
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
</div>

onChange={this.handleChange}

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
