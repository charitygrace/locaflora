import React from 'react'
import PlantCard from './PlantCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Spinner';
//import memoize from "memoize-one";

class PlantGrid extends React.Component {
  constructor(props) {
    super(props);
    console.log("here");
    console.log(this.props);
    this.state = {
      plants:this.props.plants,
      start: 0,
      items: []
    };
    this.scrollCount = 20;
    this.fetchMoreData = this.fetchMoreData.bind(this);

  }
  componentDidMount() {
    const start = this.state.start
    const end = start + this.scrollCount
    this.setState({
      items: this.state.plants.slice(start, end),
      start: end,
      end: end + this.scrollCount,
    });
  }
  /*
  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  );
  */


  fetchMoreData = () => {
    console.log("fetchMoreData");
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    const start = this.state.start
    const end = start + this.scrollCount
    //console.log(this.props.scrollCount);
    //console.log(start);
    console.log(end);
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(this.props.plants.slice(start, end)),
        start: end,
        end: end + this.scrollCount,
      });
    }, 1500);
  };

  render() {
    //const plants = this.props.plants;
    //const plants = this.filter(this.props.plants, this.state.filterText);
    /*
    const filteredList = this.props.plants.filter(
      item => item.includes(this.state.items)
    )*/

    console.log(this.state.plants);
    console.log(this.state.items);
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={true}
        loader={<div className="text-center"><Spinner /></div>}
      >
        <div className="row row-cols-6">
          {this.state.items.map( (plant, index) => {
              return <PlantCard plant={plant} key={plant.id} />
            })
          }
        </div>
      </InfiniteScroll>
    )
  }
}
export default PlantGrid



//return plant.isActive === true ?
