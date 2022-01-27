import React from 'react';
import { getPageArray } from '../../../utils/pages';

const Pagination = ({totalPages, page, changePage}) => {
  let pagesArray = getPageArray(totalPages);

  return (
    <div className="pages__wrapper">
      {pagesArray.map(p =>
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? 'page__button page__button_current' : 'page__button'}>
          {p}
        </span>
      )}
    </div>
  );
};

export default Pagination;