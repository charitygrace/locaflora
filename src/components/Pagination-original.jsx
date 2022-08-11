import React from 'react';
// import { Link, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Pagination(props) {
  const plants = props.plants
  // const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  const totalCount = Math.ceil(plants.length / props.scrollCount)
  // console.log(totalCount);
  const range = Array.from({ length: totalCount }, (v, k) => k + 1)

  // const [page, setPage] = useSearchParams();

  let params = (new URL(document.location)).searchParams;
  let pageCurrent = 1
  if (params.get('page')) pageCurrent = Number(params.get('page'))

  // range.forEach((pg, k) => {
  //   let i = pg * props.scrollCount - 1
  //   if (range.length - 1 === k) i = plants.length - 1
  //   let plantName = plants[i].name;
  //   let letterFirst = console.log(plantName.substring(0, 1))
  // })

  return (
    <ul className="pagination">
      <PaginationLogic plants={plants} range={range} pageCurrent={pageCurrent} />
      {/* {range.map((page, k) => (
        <li className="page-item">
          <PaginationLink plants={plants} page={page} pageCurrent={pageCurrent} />
        </li>
      )
      )} */}
    </ul>
  );
}

export default Pagination

function PaginationLink(props) {
  // console.log('PaginationLink')
  const { page, pageCurrent } = props;

  return (
    <Link
      className={`page-link  ${page === pageCurrent ? 'active' : ''}`}
      to={{
        pathname: `/?page=${page}`
      }}
    >
      {page === pageCurrent ? 'Page ' + page : page}
    </Link>
  )
}

function PaginationLogic(props) {
  console.log("PaginationLogic");
  const { plants, range, pageCurrent } = props;
  console.log(range)
  console.log(pageCurrent)
  return(
  range.map((page, k) => (
    <li className="page-item">
      <PaginationLink page={page} pageCurrent={pageCurrent} />
    </li>
    // if ((page >= pageCurrent - 3 && page <= pageCurrent) || (page <= pageCurrent + 3 && page >= pageCurrent)) {
    //   console.log('a');
    //   <PaginationLink page={page} pageCurrent={pageCurrent} />
    // // } else if (range.length - 1 === k || page === 1) {
    // //   console.log('b')
    // //   <PaginationLink page={page} pageCurrent={pageCurrent} />
    // } else {
    //   console.log('c');
    //   <PaginationLink page={page} pageCurrent={pageCurrent} />
    // }
  )))
}
// } else if (range.length - 1 === k || page === 1){
//   return (
//     <li className="page-item" key={k}>
//       <Link
//         className={`page-link  ${page === pageCurrent ? 'active' : ''}`}
//         to={{
//           pathname: `/?page=${page}`
//         }}
//       >
//         {page === pageCurrent ? 'Page ' + page : page}
//       </Link>
//     </li>
//   ) */}



{/* {range.map((page, k) => (
        (page >= pageCurrent - 3 && page <= pageCurrent) || (page <= pageCurrent + 3 && page >= pageCurrent) || range.length - 1 === k || page === 1 ?
          (<li className="page-item" key={k}>
            <Link
              className={`page-link  ${page === pageCurrent ? 'active' : ''}`}
              to={{
                pathname: `/?page=${page}`
              }}
            >
              {page === pageCurrent ? 'Page ' + page : page}
            </Link>
          </li>
          ) : null
      )
      )} */}
