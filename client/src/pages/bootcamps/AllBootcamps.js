import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBootcamps } from "../../redux/actions/Bootcamps";
import LocationFilter from "../../components/bootcamp/allBootcamps/LocationFilter";
import OtherFilters from "../../components/bootcamp/allBootcamps/OtherFilters";
import SingleBootcamp from "../../components/bootcamp/allBootcamps/SingleBootcamp";
import Loader from "../../components/core/Spinner";
import Pagination from "../../components/bootcamp/allBootcamps/Pagination";

const AllBootcamps = () => {
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const dispatch = useDispatch();
  const { bootcamps, loading } = listBootcamps;
  useEffect(() => {
    dispatch(getBootcamps());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <LocationFilter />
          <h4>Filter</h4>
          <OtherFilters />
        </div>
        <div className="col-md-8">
          {!loading ? (
            bootcamps.length > 0 ? (
              bootcamps.map((bootcamp) => (
                <SingleBootcamp bootcamp={bootcamp} key={bootcamp._id} />
              ))
            ) : (
              <h2> No bootcamps found </h2>
            )
          ) : (
            <Loader text="Ha bhai" />
          )}
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default AllBootcamps;
