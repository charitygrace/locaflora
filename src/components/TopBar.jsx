import React from 'react'
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected: [{term:""}]
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(termArr) {
    //console.log(termArr);
    this.props.onChange(termArr);
  }
  render(){
    //console.log(this.props.plants);
    return (
      <div className="row">
        <div className="col-6">
          <Link to="/my-favorites" className="btn btn-primary">Review Favorites</Link>
        </div>
        <div className="col-6 text-right">
          <SearchForm plants={this.props.plants} onChange={this.handleSearch} />
        </div>
      </div>
    )
  }
}

export default TopBar
