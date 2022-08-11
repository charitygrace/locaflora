import React from 'react'

export class FavoritePlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //favoritesArr: [],
      addClass: "",
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite(e) {
    e.preventDefault();
    const plant = this.props.plant
    let favoritesArr = []
    let favoritesArrJson
    //console.log(favoritesArr);
    if (localStorage.getItem('favorites')) favoritesArr = JSON.parse(localStorage.getItem('favorites'));
    if ( favoritesArr && favoritesArr.includes(plant.id) ) {
      favoritesArr = favoritesArr.filter(i => i !== plant.id);
      favoritesArrJson = JSON.stringify(favoritesArr)
      localStorage.setItem('favorites', favoritesArrJson);
    } else {
      favoritesArr.push(plant.id)
      favoritesArrJson = JSON.stringify(favoritesArr)
      localStorage.setItem('favorites', favoritesArrJson);
    }

    this.setState({
      //favoritesArr: favoritesArr,
      addClass: favoritesArr.includes(this.props.plant.id) ? "fav-active" : "",
    })
    //console.log(this.state.addClass);
    //console.log(favoritesArr);
  }

  render(){
    const plant = this.props.plant
    let favoritesArr = []
    let addClass = this.state.addClass
    if (localStorage.getItem('favorites')) favoritesArr = JSON.parse(localStorage.getItem('favorites'))
    if (favoritesArr.includes(this.props.plant.id)) addClass = "fav-active"
    //console.log(favoritesArr);
    //console.log(addClass);

    return(
      <button className={"favorite btn btn-link " + addClass} data-id={plant.id} onClick={this.toggleFavorite}>
        <svg className="icon-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.17 164.32">
          <path d="M81.08,26.57c35.2-42.69,92.22,7.33,58,49.88-29.44,36.62-58,75.54-58,75.56s-28.56-38.94-58-75.56C-11.12,33.9,45.88-16.12,81.08,26.57Z" />
        </svg>
      </button>
    )
  }
}

export default FavoritePlant
