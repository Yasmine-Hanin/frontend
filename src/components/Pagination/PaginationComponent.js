import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

const PaginationComponent = ({
  pageCount,
  handlePageChange,
  startIndex,
  endIndex,
  total,
  forcePage,
}) => {
  return (
    <>
      <div className="catalog-pagination">
        <ReactPaginate
          forcePage={forcePage}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          previousClassName="disactive"
          previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        />
      </div>
      <div className="push-right">
        <p>
          Results {startIndex + 1} - {endIndex} of {total}
        </p>
      </div>
    </>
  );
};

export default PaginationComponent;
