import React from 'react'


export const PlantDetailTR = props =>  {
  let td;
  let field;
  let note;
  let paren;
  if (Array.isArray(props.field)) {
    // console.log("isArray");
    field = props.field.join(", ")
  } else if (field !== "undefined" && field !== "") field = props.field
  td = field

  if (props.note && props.note.length > 0 && props.note !== "undefined" && props.note !== "") {
    if (Array.isArray(props.note) &&  props.note.length > 0) {
      note = props.note.join(", ")
    } else note = props.note
    td = field + " (" + note + ")"
  }
  // console.log(td);

  if (props.check === true && props.note && props.note.length > 0 && props.note !== "undefined" && props.note !== "") {
    if (props.note) paren = props.check_note + ": " + note
    else paren = props.check_note
    td = field + " (" + paren + ")"
  }
  // console.log(td);
  if (td && td !== " ()" && td !== " (pH: )") {
    return (
      <tr>
        <th>{props.heading}</th>
        <td>{td}</td>
      </tr>
    )
  } else return null;
}

export default PlantDetailTR