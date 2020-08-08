import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBootcamp } from "../../redux/actions/Bootcamps";
import Loader from "../../components/core/Spinner";
import BootcampCourse from "../../components/bootcamp/BootcampCourse";

const Bootcamp = () => {
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { bootcamp, loading, error } = listBootcamps;
  const { id } = useParams();
  const tick = "fas fa-check text-success";
  const cross = "fas fa-times text-danger"
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamp(id));
  }, []);
  return (
    <section className="bootcamp mt-5">
      {bootcamp === null || loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            {/* <!-- Main col --> */}
            <div className="col-md-8">
              <h1>{bootcamp.name}</h1>
              {/* <!-- Description -->  */}
              <p>{bootcamp.description}</p>
              {/* <!-- Avg cost --> */}
              <p className="lead mb-4">
                Average Course Cost:
                <span className="text-primary">${bootcamp.averageCost}</span>
              </p>
              {/* <!-- Courses --> */}
              {bootcamp.courses.map((course) => (
                <BootcampCourse course={course} key={course._id} />
              ))}
            </div>
            {/* <!-- Sidebar --> */}
            <div className="col-md-4">
              {/* <!-- Image --> */}
              <img src={`/img/${bootcamp.photo}`} className="img-thumbnail" alt="" />
              {/* <!-- Rating --> */}
              <h1 className="text-center my-4">
                <span className="badge badge-secondary badge-success rounded-circle p-3">
                  8.8
                </span>
                Rating
              </h1>
              {/* <!-- Buttons --> */}
              <a href="reviews.html" className="btn btn-dark btn-block my-3">
                <i className="fas fa-comments"></i> Read Reviews
              </a>
              <a
                href="add-review.html"
                className="btn btn-light btn-block my-3"
              >
                <i className="fas fa-pencil-alt"></i> Write a Review
              </a>
              <a
                href={bootcamp.website}
                target="_blank"
                className="btn btn-secondary btn-block my-3"
              >
                <i className="fas fa-globe"></i> Visit Website
              </a>
              <Link className="btn btn-success btn-block my-3" to={`/manage/bootcamp/${bootcamp._id}`}> Manage Bootcamp </Link>
              {/* <!-- Perks --> */}
              <ul className="list-group list-group-flush mt-1">
                <li className="list-group-item">
                  <i className={bootcamp.housing ? tick : cross}></i> Housing
                </li>
                <li className="list-group-item">
                  <i className={bootcamp.jobAssistance ? tick : cross}></i> Job Assistance
                </li>
                <li className="list-group-item">
                  <i className={bootcamp.jobGuarantee ? tick : cross}></i> Job Guarantee
                </li>
                <li className="list-group-item">
                  <i className={bootcamp.acceptGi ? tick : cross}></i> Accepts GI Bill
                </li>
              </ul>
              {/* <!-- Map --> */}
              <div id="map" style={{ width: "100%", height: "300px" }}></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Bootcamp;
