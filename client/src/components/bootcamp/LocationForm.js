import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBootcampsInRadius } from "../../redux/actions/Bootcamps";
import { useHistory } from "react-router-dom";

const LocationForm = ({ showcase = false }) => {
  const [zip, setZip] = useState(0);
  const [dist, setDist] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getBootcampsInRadius(zip, dist));
    history.push(`/all/bootcamps?zipcode=${zip}&miles=${dist}`);
    setDist(0);
    setZip(0);
  };

  console.log(zip,dist)

  return (
    <form>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              value={dist}
              onChange={(e) => setDist(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Miles From"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Enter Zipcode"
            />
          </div>
        </div>
      </div>
      <button
        onClick={onSubmitHandler}
        className={`btn btn-block ${!showcase ? "btn-outline-primary" : 'btn-primary'}`}
      >
        Find Bootcamps
      </button>
    </form>
  );
};

export default LocationForm;
