import React from 'react'

const Breadcrumbs = props =>  (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="/locaflora">Home</a></li>
      {/*<li className="breadcrumb-item">
        <a href="/">??</a>
      </li>
      */}
      <li className="breadcrumb-item active" aria-current="page">{props.plant.name}</li>
    </ol>
  </nav>
)

export default Breadcrumbs
