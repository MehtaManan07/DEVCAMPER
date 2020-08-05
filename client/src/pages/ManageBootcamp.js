import React, { useEffect } from "react";
import image from "../img/image_1.jpg";
import { useParams, Link } from "react-router-dom";
import { getBootcamp } from "../redux/actions/Bootcamps";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/core/Spinner";

const ManageBootcamp = () => {
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { bootcamp, loading, error } = listBootcamps;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamp(id));
  }, [id]);
  return (
    <section class="container mt-5">
      {bootcamp === null || loading ? (
        <Loader />
      ) : (
        <div class="row">
          <div class="col-md-8 m-auto">
            <div class="card bg-white py-2 px-4">
              <div class="card-body">
                <h1 class="mb-4">Manage Bootcamp</h1>
                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <img src={image} class="card-img" alt="..." />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">
                          <Link to={`/bootcamp/${bootcamp.name}/${bootcamp._id}`}>
                            {bootcamp.name}
                            <span class="float-right badge badge-success">
                              8.8
                            </span>
                          </Link>
                        </h5>
                        <span class="badge badge-dark mb-2">{bootcamp.location.city}, {bootcamp.location.state}</span>
                        <p class="card-text">
                          {bootcamp.careers.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <form class="mb-4">
                  <div class="form-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        name="photo"
                        class="custom-file-input"
                        id="photo"
                      />
                      <label class="custom-file-label" for="photo">
                        Add Bootcamp Image
                      </label>
                    </div>
                  </div>
                  <input
                    type="submit"
                    class="btn btn-light btn-block"
                    value="Upload Image"
                  />
                </form>
                <Link to={`/update/bootcamp/:${bootcamp._id}`} class="btn btn-primary btn-block">
                  Edit Bootcamp Details
                </Link>
                <Link
                  to={`/manage/courses/${bootcamp._id}`}
                  class="btn btn-secondary btn-block"
                >
                  Manage Courses
                </Link>
                <span style={{ cursor: "pointer" }} onClick={() => alert("delete me")} class="btn btn-danger btn-block">
                  Remove Bootcamp
                </span>
                <p class="text-muted mt-5">
                  * You can only add one bootcamp per account.
                </p>
                <p class="text-muted">
                  * You must be affiliated with the bootcamp in some way in
                  order to add it to DevCamper.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageBootcamp;
