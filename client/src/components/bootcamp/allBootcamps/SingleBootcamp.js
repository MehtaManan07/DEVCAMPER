import React from "react";
import { Link } from "react-router-dom";
const SingleBootcamp = ({ bootcamp }) => {
  const picture = bootcamp.photo.startsWith("photo")
    ? `/img/${bootcamp.photo}`
    : bootcamp.photo;
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={picture} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/bootcamp/${bootcamp.slug}/${bootcamp._id}`}>
                {bootcamp.name}
                <span className="float-right badge badge-success">8.8</span>
              </Link>
            </h5>
            <span className="badge badge-dark mb-2">
              {bootcamp.location.city}, {bootcamp.location.state}
            </span>
            <p className="card-text">{bootcamp.careers.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBootcamp;
