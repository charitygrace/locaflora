import React from 'react';
import { useSearchParams } from 'react-router-dom'
import { usePagination, DOTS } from './UsePagination';
import { PaginationText } from './PaginationText';

// import { Link } from "react-router-dom";
//https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    pageAlpha = false,
    pageCurrent,
    pageSize,
    plants,
    sortType
  } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(sortType)
  const paginationRange = usePagination({
    pageCurrent,
    totalCount,
    siblingCount,
    pageSize,
    sortType,
    plants
  });
  // console.log(plants)
  // console.log(pageCurrent)
  if (pageCurrent === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    console.log('onNext');
    searchParams.set("page", Number(pageCurrent) + 1);
    setSearchParams(searchParams);
    onPageChange(Number(pageCurrent) + 1);
  };

  const onPrevious = () => {
    console.log('onPrevious');
    searchParams.set("page", Number(pageCurrent) - 1);
    setSearchParams(searchParams);
    onPageChange(Number(pageCurrent) - 1);
  };

  const onPageClick = (pageNumber) => {
    // console.log('onPageClick');
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
    onPageChange(pageNumber);
  };

  let pageLast = paginationRange[paginationRange.length - 1];

  // console.log(paginationRange)

  return (
    <div className='nav-pages'>
      <ul className="pagination justify-content-end">
        {Number(pageCurrent) !== 1 ?
          (<li className={`page-item${Number(pageCurrent) === 1 ? ' disabled' : ''}`}>
            <button
              className="page-link"
              aria-label="Previous"
              onClick={onPrevious}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>) :
          null}
        {paginationRange.map((pageNumber, k) => {
          if (pageNumber === DOTS) {
            return <li key={pageNumber + k} className="page-item dots">&#8230;</li>;
          }
          return (
            <li key={pageNumber} className={`page-item${Number(pageNumber) === Number(pageCurrent) ? ' active' : ''}`} >
              <button
                className="page-link"
                onClick={() => onPageClick(pageNumber)}
              >
                {pageNumber}
                {pageAlpha === true ? <PaginationText
                  alphaPrior={pageNumber * pageSize - (pageSize + 1) >= 0 ? plants[pageNumber * pageSize - (pageSize + 1)].name : "z"}
                  alphaStart={plants[pageNumber * pageSize - (pageSize)].name}
                  alphaEnd={pageNumber * pageSize - 1 < plants.length ? plants[pageNumber * pageSize - 1].name : plants[plants.length - 1].name} /> : null }
                {/*
                  plants[pageNumber * pageSize - 1] &&
                    plants[pageNumber * pageSize - (pageSize)].name.substring(0, 1) !== plants[pageNumber * pageSize - 1].name.substring(0, 1) ?
                    pageNumber + " / " + plants[(Number(pageNumber)) * pageSize - 1].name.substring(0, 1) :
                    Number(pageNumber) === Number(pageCurrent) ? pageNumber + " / " + plants[pageNumber * pageSize - (pageSize)].name.substring(0, 1) + " plants" :
                      pageNumber
          */}
              </button>
            </li>
          )
        })}
        {Number(pageCurrent) !== Number(pageLast) ?
          (<li className={`page-item${Number(pageCurrent) === Number(pageLast) ? ' disabled' : ''}`}>
            <button
              className="page-link"
              aria-label="Next"
              onClick={onNext}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>) :
          null}
      </ul >
    </div>
  )
}

export default Pagination;


// plants[(pageNumber - 1) * pageSize].name.substring(0, 1) + "-" + plants[(Number(pageNumber)) * pageSize - 1].name.substring(0, 1) :

//            onClick={() => onPageChange(pageNumber)}

/*
              {pageNumber === Number(pageCurrent) ?
                pageNumber + " / " + plants[pageNumber * pageSize - 19].name.substring(0, 1) + " plants" :
                plants[pageNumber * pageSize - 19].name.substring(0, 1) != plants[pageCurrent * pageSize].name.substring(0, 1) ?
                  plants[pageNumber * pageSize - 19].name.substring(0, 1) :
                  pageNumber
              }


name.substring(0, 1) + " plants"


                {Number(pageNumber) === Number(pageCurrent) ?
                  plants[pageNumber * pageSize - (pageSize)].name.substring(0, 1) === plants[pageNumber * pageSize - 1].name.substring(0, 1) ?                 
                  pageNumber + " / " + plants[pageNumber * pageSize - (pageSize)].name.substring(0, 1) + " plants" : pageNumber + " / " + plants[pageNumber * pageSize - (pageSize)].name.substring(0, 1) + " - " + plants[pageNumber * pageSize - 1].name.substring(0, 1) + " plants" :
                  pageNumber}

              */