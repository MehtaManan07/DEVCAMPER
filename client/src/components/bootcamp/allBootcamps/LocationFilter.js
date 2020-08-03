import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBootcampsInRadius } from "../../../redux/actions/Bootcamps";
import { useHistory } from "react-router-dom";

const LocationFilter = () => {
  const [zip, setZip] = useState(undefined);
  const [dist, setDist] = useState(undefined);
  const history = useHistory()
  const dispatch = useDispatch();
  return (
    <div className="card card-body mb-4">
      <h4 className="mb-3">By Location</h4>
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
        <button onClick={(e) => {
          e.preventDefault();
          dispatch(getBootcampsInRadius(zip,dist))
          history.push(`/all/bootcamps?zipcode=${zip}&miles=${dist}`)
          setDist(null)
          setZip(null)
        }} className="btn btn-outline-primary btn-block"> Find Bootcamps </button>
      </form>
    </div>
  );
};

export default LocationFilter;
