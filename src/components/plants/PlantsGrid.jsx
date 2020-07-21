import React from 'react'
import PlantCard from './PlantCard'

const PlantGrid = props => {
  return (
    <div className="row row-cols-6">
      {props.plants.map( plant => {
          return <PlantCard plant={plant} key={plant.id} />
        })
      }
    </div>
  )
}
export default PlantGrid



//return plant.isActive === true ?
