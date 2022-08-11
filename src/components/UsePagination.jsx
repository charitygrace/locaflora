import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    pageCurrent,
    sortType,
    plants
}) => {
    // if (sortType === "alpha") {
    //     const totalPageCount = Math.ceil(totalCount / pageSize)
    //     const rangePage = Array.from({ length: totalPageCount }, (v, k) => k + 1)
    //     console.log(rangePage)
    //     const rangeAlpha = rangePage.map((pg, k) => {
    //         let i = pg * pageSize - 1
    //         // console.log(range.length - pageSize)
    //         let multi = pg * pageSize
    //         // console.log(totalCount)
    //         // console.log(pg)
    //         // console.log(k)
    //         if (rangePage.length - 1 === k) i = plants.length - 1
    //         // console.log(plants.length - 1)
    //         // console.log(i)
    //         let plantName = plants[i].name;
    //         console.log(plantName.substring(0, 1))
    //         let letterFirst = plantName.substring(0, 1)
    //         return {
    //             p: pg,
    //             l: letterFirst
    //         }
    //     })
    //     console.log(rangeAlpha)
    // }
    const paginationRange = useMemo(() => {
        // const pageCount = Math.ceil(totalCount / pageSize);
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as siblingCount + pageFirst + pageLast + pageCurrent + 2*DOTS
        const totalPageNumbers = siblingCount + 5;
        
        /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(Number(pageCurrent) - siblingCount, 1);
        const rightSiblingIndex = Math.min(Number(pageCurrent) + siblingCount, totalPageCount);
        
        /*
          We do not want to show dots if there is only one position left 
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const pageFirstIndex = 1;
        const pageLastIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            // console.log(leftRange)
            return [...leftRange, DOTS, pageLastIndex];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            // console.log(rightRange)
            return [pageFirstIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            // console.log(middleRange)

            return [pageFirstIndex, DOTS, ...middleRange, DOTS, pageLastIndex];
        }
    }, [totalCount, pageSize, siblingCount, pageCurrent]);

    return paginationRange;
};
