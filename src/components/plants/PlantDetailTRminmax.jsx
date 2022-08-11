import React from 'react'


const PlantDetailTRminmax = props =>  {
  console.log(props)
  let unit = "ft" 
  if (props.field && props.field.unit && props.field.unit.options) unit = props.field.unit.options
  let td;
  if (props.field && props.field.min) td = props.field.min + " - " + props.field.max + " " + unit

  if (td) {
    return (
      <tr>
        <th>{props.heading}</th>
        <td>{td}</td>
      </tr>
    )
  } else return null;
}

export default PlantDetailTRminmax
