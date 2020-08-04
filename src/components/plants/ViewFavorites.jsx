import React from 'react'

export function sortAlpha(a, b) {
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

class ViewFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //selected: [{term:""}]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //console.log("handleClick");
    let favoritesArr = []
    if (localStorage.getItem('favorites')) favoritesArr = JSON.parse(localStorage.getItem('favorites'));
    //console.log(favoritesArr);
    this.props.onChange(favoritesArr);
  }

  render() {
    return (
      <button onClick={this.handleClick} className="btn btn-primary">Review Favorites</button>
    )
  }
}

export default ViewFavorites
