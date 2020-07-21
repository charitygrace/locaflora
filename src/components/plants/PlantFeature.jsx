import React from 'react'


const PlantFeature = props =>  {
  var dd = props.dd;
  if (Array.isArray(dd)) {
    dd = dd.join(", ")
  }

  return (
    <React.Fragment>
        <dt className="col-12">{props.dt}</dt>
        <dd className="col-12">{dd}</dd>
      </React.Fragment>
  )
}

export default PlantFeature
