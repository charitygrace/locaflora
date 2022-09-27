import React, { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useNavigate, useSearchParams } from 'react-router-dom'

export function sortAlpha(a, b) {
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

const SearchForm = props => {
  // console.log(props)
  let term
  // let params = (new URL(document.location)).searchParams;
  // let activeQuery = params.get('q'); // is the string "Jonathan Smith".
  // console.log(activeQuery);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  // const [text, setText] = useState(searchParams.has('q') ? searchParams.get('q') : "");
  const [text, setText] = useState();
  const [query, setQuery] = useState(searchParams.has('q') ? [searchParams.get('q')] : []);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParams.has('q') ? [searchParams.get('q')] : []);

    // console.log(searchParams.has('q'))
    // console.log(searchParams.get('q'))
    // console.log(text)
    // console.log(query)
  }, [searchParams]);
  // console.log(searchParams.has('q'))
  // console.log(searchParams.get('q'))
  // console.log(text)
  // console.log(query)

  const handleSubmit = event => {
    // console.log("handleSubmit")
    event.preventDefault();
    // console.log(event)
    // console.log(event.target)
    // console.log(text)
    if (text) term = text
    if (query.length > 0) term = query[0]
    // console.log(query)
    // console.log(term)
    // if (query) term = query
    // console.log(term)
    // searchParams.delete('page');
    // if (term) setSearchParams({ q: term })
    navigate({
      pathname: '/',
      search: '?q=' + term
    });
    event.target.blur();
    window.focus();
  }
  const onKeyDown = (event) => {
    // console.log("onKeyDown")
    // console.log(e)
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }


  const plants = props.plants
  let options = [];
  // console.log(plants);
  plants.forEach(item => {
    // if (item.taxa.commonName) {
    //   options.push(item.name + " ("+ item.taxa.commonName + ")")
    //   options.push(item.taxa.commonName + " (" + item.name + ")")
    // } else options.push(item.name);
    // if (item.taxa.commonAlts && item.taxa.commonAlts.length > 0) {
    //   item.taxa.commonAlts.forEach(i => {
    //     options.push(i + " (" + item.name + ")")
    //   })
    // }
    options.push(item.name)
    if (item.taxa && item.taxa.commonName) options.push(item.taxa.commonName)
    if (item.taxa && item.taxa.commonAlts && item.taxa.commonAlts.length > 0) {
      item.taxa.commonAlts.forEach(i => {
        options.push(i)
      })
    }
    if (item.taxa && item.taxa.scientificAlts && item.taxa.scientificAlts.length > 0) {
      item.taxa.scientificAlts.forEach(i => {
        options.push(i)
      })
    }
    if (item.taxa && item.taxa.genus && !options.includes(item.taxa.genus)) options.push(item.taxa.genus)
    if (item.taxa && item.taxa.scientificFamily && !options.includes(item.taxa.scientificFamily)) options.push(item.taxa.scientificFamily)
    if (item.taxa && item.taxa.commonFamily && !options.includes(item.taxa.commonFamily)) options.push(item.taxa.commonFamily)
  })
  // console.log(options);
  options.sort(function (a, b) {
    //a = a['term'].toLowerCase();
    //b = b['term'].toLowerCase();
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  })


  // console.log(options);
  // console.log(searchParams.get('q'))
  // if (!searchParams.has('q')) setQuery("")
  // console.log(text)
  // console.log(query)
  return (
    <form className="form-inline float-right" onSubmit={handleSubmit}>
      <div className="input-group">
        <Typeahead
          allowNew
          onChange={setQuery}
          onInputChange={setText}
          newSelectionPrefix="Or just search: "
          id="findPlant"
          options={options}
          selected={query}
          placeholder="Find a Plant"
          onKeyDown={onKeyDown}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm


/*

selected => {
            this.setState({
              term: selected[0]
            });
          }


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
  <label className="visually-hidden" htmlFor="searchPlant">Find a Plant</label>
  <input type="text" className="form-control mb-2 mr-sm-2" id="searchPlant" placeholder="Find a Plant" />
  <button type="submit" className="btn btn-primary mb-2">Search</button>
</form>
*/
