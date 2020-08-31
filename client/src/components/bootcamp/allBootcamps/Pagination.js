import React from "react";
import { useSelector } from "react-redux";

const Pagination = () => {
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { error, loading, bootcamps } = listBootcamps;
  return (
    <>
      {loading || bootcamps.length <= 0 ? (
        ""
      ) : (
        <nav aria-label="Page justify-content-center navigation example">
          <ul className="pagination">
            <li className="page-item">
              <span className="page-link">Previous</span>
            </li>
            <li className="page-item">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <span className="page-link">2</span>
            </li>
            <li className="page-item">
              <span className="page-link">3</span>
            </li>
            <li className="page-item">
              <span className="page-link">Next</span>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
