import React from 'react'
import PlantCard from './PlantCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Spinner';

class PlantGrid extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.plants);
    const scrollCount = 20
    this.state = {
      endSroll: scrollCount,
      items: this.props.plants.slice(0, scrollCount)
    };
    this.fetchMoreData = this.fetchMoreData.bind(this);

  }
/*
  componentDidUpdate(prevProps) {
    if(prevProps.plants !== this.props.plants) {
      this.setState({value: this.props.value});
    }
  }
  */
  fetchMoreData = () => {
    console.log("fetchMoreData");
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let start = Number(this.state.endSroll)
    let end = start + 20
    //console.log(this.props.scrollCount);
    //console.log(start);
    console.log(end);
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(this.props.plants.slice(start, end)),
        endSroll: end
      });
    }, 1500);
  };

  render() {
    const plants = this.props.plants;
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
