import React from 'react'


export const PaginationText = (props) =>  {
  return (
    <span>
      {props.alphaStart.substring(0, 1) != props.alphaPrior.substring(0, 1) ? " / " + props.alphaStart.substring(0, 1) : null}
      {props.alphaStart.substring(0, 1) != props.alphaPrior.substring(0, 1) && props.alphaStart.substring(0, 1) != props.alphaEnd.substring(0, 1)
        ? " - " : props.alphaStart.substring(0, 1) != props.alphaEnd.substring(0, 1) ? " / ": null}
      {props.alphaStart.substring(0, 1) != props.alphaEnd.substring(0, 1) ? props.alphaEnd.substring(0, 1) : null}
      {/* {props.alphaStart.substring(0, 1) != props.alphaEnd.substring(0, 1) ?  " / " + props.alphaStart.substring(0, 1) + " — " + props.alphaEnd.substring(0, 1) : null } */}
    </span>
  )
}

/*
                  plants[pageNumber * pageSize - 1] &&
                    plants[pageNumber * pageSize - (pageSize)].name.substring(0, 1) !== plants[pageNumber * pageSize - 1].name.substring(0, 1) ?
                    pageNumber + " / " + plants[(Number(pageNumber)) * pageSize - 1].name.substring(0, 1) :
                    Number(pageNumber) === Number(pageCurrent) ? pageNumber + " / " + plants[pageNumber * pageSize - (pageSize)].name.substring(0, 1) + " plants" :
                      pageNumber
*/