import React from 'react'
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected: [{term:""}]
    }
    // this.handleSearch = this.handleSearch.bind(this);
  }

  // handleSearch(termArr) {
  //   console.log(termArr);
  //   this.props.onChange(termArr);
  // }
  render() {
    // console.log(this.props.plants);
    return (
      <div className="row">
        <div className="col-12 col-sm-6 text-end order-sm-2">
          <SearchForm plants={this.props.plants} />
        </div>
        <div className="col-12 col-sm-6 mt-1 mt-sm-0">
          <Link to="/my-favorites" className="btn btn-primary">Review Favorites</Link>
        </div>
      </div>
    )
  }
}

export default TopBar

  //           <SearchForm plants={this.props.plants} onChange={this.handleSearch} /></div>

