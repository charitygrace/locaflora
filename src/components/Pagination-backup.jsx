import React from 'react';
import { usePagination, DOTS } from './UsePagination';
import { Link } from "react-router-dom";
//https://stackblitz.com/edit/react-1zaeqk?file=src%2FusePagination.js
const Pagination = props => {
  const {
    totalCount,
    siblingCount = 3,
    pageCurrent,
    pageSize,
    plants,
    sortType
  } = props;

  // console.log(sortType)
  const paginationRange = usePagination({
    pageCurrent,
    totalCount,
    siblingCount,
    pageSize,
    sortType,
    plants
  });
  // console.log(pageCurrent)
  if (pageCurrent === 0 || paginationRange.length < 2) {
    return null;
  }

  // const onNext = () => {
  //   onPageChange(pageCurrent + 1);
  // };

  // const onPrevious = () => {
  //   onPageChange(pageCurrent - 1);
  // };

  let pageLast = paginationRange[paginationRange.length - 1];

  // console.log(paginationRange)

  return (
    <ul className="pagination justify-content-end">
      {Number(pageCurrent) !== 1 ?
        (<li className={`page-item${Number(pageCurrent) === 1 ? ' disabled' : ''}`}>
          <Link
            className="page-link"
            to={{
              pathname: `/?page=${Number(pageCurrent) - 1}`
            }}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>) :
        null}
      {paginationRange.map((pageNumber, k) => {
        if (pageNumber === DOTS) {
          return <li key={pageNumber + k} className="page-item dots">&#8230;</li>;
        }
        return (
          <li key={pageNumber} className={`page-item${Number(pageNumber) === Number(pageCurrent) ? ' active' : ''}`} >
            <Link
              className="page-link"
              to={{
                pathname: `/?page=${pageNumber}`
              }}
            >
              {Number(pageNumber) === Number(pageCurrent) ?
                pageNumber + " / " + plants[pageNumber * pageSize - 19].name.substring(0, 1) + " plants" :
                pageNumber}
            </Link>
          </li>
        )
      })}
      {Number(pageCurrent) !== Number(pageLast) ?
        (<li className={`page-item${Number(pageCurrent) === Number(pageLast) ? ' disabled' : ''}`}>
          <Link
            className="page-link"
            to={{
              pathname: `/?page=${Number(pageCurrent) + 1}`
            }}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>) :
        null}
    </ul >
  )
}

export default Pagination;


//            onClick={() => onPageChange(pageNumber)}

/*
              {pageNumber === Number(pageCurrent) ?
                pageNumber + " / " + plants[pageNumber * pageSize - 19].name.substring(0, 1) + " plants" :
                plants[pageNumber * pageSize - 19].name.substring(0, 1) != plants[pageCurrent * pageSize].name.substring(0, 1) ?
                  plants[pageNumber * pageSize - 19].name.substring(0, 1) :
                  pageNumber
              }
*/